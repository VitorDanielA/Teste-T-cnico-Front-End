import {useEffect, useState } from "react";
import {socket} from './../socket';
import Sidebar from "../components/SideBar";
import styles from './../css/TelaChat.module.css';
import Chat from "../components/Chat";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

interface TelaLoginProps {
  user: string;
}

interface Mensagem {
  salaMsg: string;
  username: string;
  mensagem: string;
  data: string;
}

class SalaChat{
  nome:string = '';
  descricao:string = '';
}

export default function TelaChat({user}: TelaLoginProps) {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState<Mensagem[]>([]);
  const [sala, setSala] = useState<string>();
  const [show, setShow] = useState(false);
  const [salaChat, setSalaChat] = useState(new SalaChat());
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [atualizarSalas, setAtualizarSalas] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatarData(data:string) {

    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    const hora = dataObj.getHours().toString().padStart(2, '0');
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');
    const segundos = dataObj.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;

  }

  function clearChat(){
    setMessageReceived([]);
  }

  function mandarMensagem(){
    socket.emit("message", message, sala, user);

  }

  function salvarSala(salaChat:string){
    setSala(salaChat);
  }

  const handleChangeNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
      setSalaChat(prevState => ({
        ...prevState,
        nome: value
    }));
  }

  const handleChangeDescricao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
      setSalaChat(prevState => ({
        ...prevState,
        descricao: value
    }));
  }

  function criarChat(){
    fetch("http://localhost:5000/salas", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(salaChat),
    }).then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setMostrarAlerta(true);
      buscarSalas();
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {

    socket.on("message", (messages) => {
      setMessageReceived(prevMessage => [...prevMessage, messages]);
      setMessage('');
    });

    return () => {
      socket.off("message");
    }; 
}, [message]); 

  const conversa = () => {
    return(
      <div>
        {messageReceived.map(messagem => (
          <div>
            <label className="form-label">
              <strong>{messagem.username}</strong> <span>{messagem.mensagem} - {formatarData(messagem.data)} </span>
            </label>
          </div>
      ))}
      </div>
    )
  }

  const alertaSalaSalva = () => {
    if (mostrarAlerta) {
      return (
        <Alert variant="primary" className='mx-3' onClose={() => setMostrarAlerta(false)} dismissible>
          <Alert.Heading>Parabéns!</Alert.Heading>
          <label>
            Sala criada com sucesso!
          </label>
        </Alert>
      );
    }
  }

  const buscarSalas = async () => {
    try{
      const response = await fetch("http://localhost:5000/salas")
      const data = await response.json();
      console.log(data);
      setAtualizarSalas(data);
    } catch(error){
      console.log('Erro ao buscar dados')
    }
  }
  

  const modal = () => {
    return(
      <div>
        <Button variant="primary" onClick={handleShow} className={`${styles.btnCriarChat} w-100`}>
          Criar novo chat
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>Digite o nome do chat e sua descrição</Modal.Body>
          <div className="p-3">
            <div className="col pb-3">
              <strong className="">Nome</strong>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite nome do chat"
                onChange={handleChangeNome}
                maxLength={10}
              />
            </div>
            <div className="col pb-1">
              <strong className="">Descrição</strong>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite nome do chat"
                onChange={handleChangeDescricao}
                maxLength={21}
              />
            </div>
          </div>
          {mostrarAlerta ? alertaSalaSalva() : ''}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button onClick={criarChat} className={styles.btnCriarChat}>
              Criar Chat
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  return (
    <div className="d-flex">
      <Sidebar/>
      <div className={`${styles.chat_group} pt-4`}>
        <input type="text" placeholder='Procure/começe nova sala' className={`${styles.inputSearch} form-control mb-3`}/>
        {modal()}
        <Chat user = {user} salvarSala = {salvarSala} limparChat = {clearChat} atualizarChats = {atualizarSalas}/>
      </div>
      <div className={styles.div_chat}>
        <div className={styles.sem_conversa}>
          {conversa()}
        </div>
        <div className={styles.input_mensagem}>
          <div className={`${styles.input_group} input-group`}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Digite uma mensagem" 
              aria-label="Recipient's username" 
              aria-describedby="button-addon2" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button" 
              id="button-addon2" 
              onClick={mandarMensagem}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}