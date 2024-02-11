import { useEffect, useState } from 'react';
import Person from './../assets/door-closed.svg';
import styles from './../css/Chat.module.css';
import { socket } from './../socket';

interface userProps{
    user:string;
    salvarSala(salaChat: string): void;
    limparChat():void;
    atualizarChats: Salas[];
    filtroSala: string;
    salvarMensagens(messages: Mensagem[]): void;
}

interface Mensagem{
    salaMsg:string;
    username:string;
    mensagem:string;
    data:string;
}

interface User {
    login: string;
    email: string;
    senha: string;
    id: string;
}

interface Salas{
    id: string;
    nome: string;
    descricao: string;
}

export default function Chat({user, salvarSala, limparChat, atualizarChats, filtroSala, salvarMensagens}:userProps){

    const [, setUsers] = useState<User[]>([])
    const [salas, setSalas] = useState<Salas[]>([]);
    const [salaSelecionada, setSalaSelecionada] = useState<string | null>(null);

    useEffect(() => {
        if (atualizarChats.length > 0) {
            const novasSalas = atualizarChats.map((sala) => ({
                id: sala.id,
                nome: sala.nome,
                descricao: sala.descricao
            }));

            setSalas(novasSalas);
        }
    }, [atualizarChats, setSalas]);


    useEffect(() => {
        const fazerLogin = async () => {
            try{
                const response =  await fetch("http://localhost:5000/usuarios")
                const data = await response.json();
                setUsers(data)
            } catch(error){
                console.log('Erro ao buscar dados')
            }
        }

        fazerLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const buscarSalas = async () => {
            try{
                const response =  await fetch("http://localhost:5000/salas")
                const data = await response.json();
                setSalas(data)
            } catch(error){
                console.log('Erro ao buscar dados')
            }
        }
        buscarSalas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const selecionarSala = (login: string | undefined, sala: string) => {
        setSalaSelecionada(sala);
        socket.emit("select_room", {
            login,
            sala,
        }, (messages: Mensagem[]) => {
            salvarMensagens(messages);
        })
    }

    const salasFiltradas = salas.filter(sala => sala.nome.toLowerCase().includes(filtroSala.toLowerCase()));


    const chats = () => {
        return(
            <div className={styles.scroll}>
                {salasFiltradas.map(sala => (
                    <>
                        <div key={sala.id} className={`${styles.container_chat} d-flex my-4 ${salaSelecionada === sala.nome ? styles.selected : ''}`} onClick={() => {selecionarSala(user, sala.nome); salvarSala(sala.nome); limparChat()}}>
                            <img 
                                src={Person} 
                                alt='icone'
                                className={styles.icone} 
                            />
                            <div>
                                <strong className={styles.users_name}>{sala.nome}</strong>
                                <p className={styles.desc_user}>{sala.descricao}</p>
                            </div> 
                        </div>
                    </>
                ))}
            </div>
        )
    }

    return(
        <>
            {chats()}
        </>
    )
}