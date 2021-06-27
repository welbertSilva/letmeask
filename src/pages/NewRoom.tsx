import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";

import illustration from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";

import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";

export function NewRoom(){
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        if (newRoom.trim() === '') {
            alert('Digite um nome para a sala.');
            return;
        }
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`) //id criado dentro da base do firebase
    }

    return(
        <div id="page-auth">
            <aside>
               <img src={illustration} alt="Ilustração simbolizando pergunta e respostas" /> 
               <strong>Crie salas e Q&amp;A ao-vivo</strong>
               <p>Tire as dúvidas da sua audiÊncia em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value = {newRoom}
                        />
                        <Button type="submit">
                        Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}