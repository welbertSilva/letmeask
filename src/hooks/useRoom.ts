import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  //Listar todas perguntas da sala (roomId).
  //O useEffect é um listener javascript ou seja, ele fica observando a alteração dentro do array , caso o array esteja vazio ele executa uma única vez quando a página é carregada.
  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);
    //Aqui é uma API do firebase, se houve dúvida, ler a documentação do firebase.
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    //Esta função faz o unsubscribe (listener) no firebase - rowns: 68,69,70 e 71
    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { questions, title };
}
