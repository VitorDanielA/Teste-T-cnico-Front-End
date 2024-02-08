import { useEffect, useState } from 'react';
import Person from './../assets/person.svg';
import styles from './../css/Chat.module.css';

export default function Chat(){

    interface User {
        login: string;
        email: string;
        senha: string;
    }

    const [users, setUsers] = useState<User[]>([])

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

    const logins = users.map(user => user.login);

    const chats = () => {
        return(
            <div className={styles.scroll}>
                {logins.map(login => (
                    <>
                        <div className={`${styles.container_chat} d-flex my-4`}>
                            <img 
                                src={Person} 
                                alt='icone'
                                className={styles.icone} 
                            />
                            <div>
                                <strong className={styles.users_name}>{login}</strong>
                                <p className={styles.desc_user}>Olá, eu sou {login}</p>
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