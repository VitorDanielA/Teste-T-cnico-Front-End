import { useEffect, useState } from "react";
import {socket} from './../socket';
import Sidebar from "../components/SideBar";
import styles from './../css/TelaChat.module.css';
import Chat from "../components/Chat";

export default function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState<string[]>([]);

  function sendMessage() {
    socket.emit("send_message", { message: message });
    setMessageReceived(prevMessage => [...prevMessage, message]);
    setMessage('');
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.authorId !== socket.id) { 
        console.log(data);
        setMessageReceived(prevMessage => [...prevMessage, data.message]);
      }
    });

    return () => {socket.off("receive_message");}
}, []);

  return (
    <div className="d-flex">
      <Sidebar/>
      <div className={styles.chat_group}>
        <input type="text" placeholder='Procure/começe nova conversa' className={`${styles.inputSearch} form-control mb-2`}/>
        <Chat/>
      </div>
      <div className={styles.div_chat}>
        <div className={styles.sem_conversa}>
          
          <p>{messageReceived.map((mensagem, index) => {
            return(
              <p key={index}>{mensagem}</p>
            )
          })}</p>
        </div>
        <div className={styles.input_mensagem}>
          <div className={`${styles.input_group} input-group`}>
            <input type="text" className="form-control" placeholder="Digite uma mensagem" aria-label="Recipient's username" aria-describedby="button-addon2" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}