import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import "../styles/room.scss";

import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}
export function AdminRoom(){
    const history = useHistory();
    // const {user} = useAuth();
    const params = useParams<RoomParams>(); //Este hoock é usado para recuperar os valores da url atraves do react-router-dom
    const roomId = params.id; //Esté é id da sala salvo na base do firebase
  
    const { title, questions } = useRoom(params.id) ;
    
    //Encerrando sala
    async function handleEndRoom() {
        if (window.confirm('Are sure you want end room?')) {
            await database.ref(`/rooms/${roomId}`).update({
                endedRoomAt: new Date(),
            });
        }
        history.push('/');
    } 
    //Removendo pergunta
    async function handleRemoveQuestion(questionId: string) {
        if (window.confirm('Are sure you want delete this question??')) {
            await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
        }
    } 

    async function handleCheckQuestionAnswered(questionId: string) {
        await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true          
        });
    }
    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                        <div>
                            <div>
                                <RoomCode code={roomId} />
                                <Button 
                                onClick={() => {handleEndRoom()}}
                                isOutlined>Encerrar sala</Button>
                            </div>
                        </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                
                <div className="question-list">
                    { questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered = {question.isAnswered}
                                isHighlighted = {question.isHighlighted}
                            >
                            { !question.isAnswered  &&
                                (
                                    <>
                                        <button
                                            onClick={() => {handleCheckQuestionAnswered(question.id)}}
                                        >
                                            <img src={checkImg} alt="Mark the question with responsed."  />
                                        </button>
                                        
                                        <button
                                            onClick={() => {handleHighLightQuestion(question.id)}}
                                        >
                                            <img src={answerImg} alt=" Apply high light in a question."  />
                                        </button>
                                    </>
                                )
                            }
                                <button
                                    onClick={() => {handleRemoveQuestion(question.id)}}
                                >
                                    <img src={deleteImg} alt="Remove question"  />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}