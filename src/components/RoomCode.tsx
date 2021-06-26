import copyImg from '../assets/images/copy.svg';
import  '../styles/roomCode.scss'

type RoomCodeProps = {
    code: string;
}
export function RoomCode(props:RoomCodeProps){
    function copyRoomCode() {
        navigator.clipboard.writeText(props.code); //Esta API e responsável por fazer o copy para área de transferência.
    }
    return(
        <button className="room-code" onClick={copyRoomCode}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}