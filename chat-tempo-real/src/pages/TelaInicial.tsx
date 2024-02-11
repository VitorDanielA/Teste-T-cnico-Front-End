import styles from './../css/TelaInicial.module.css';
import ChatBot from './../assets/ChatBot.svg';
import { Link } from 'react-router-dom';

export default function TelaInicial(){
    return(
        <div className={`${styles.body} d-flex align-items-center justify-content-center`}>
            <div className={styles.apresentacao}>
                <h2 className='mb-5'>Web Chat</h2>
                <p className={styles.textBemVindo}>Bem vindo ao</p>
                <strong>WebChat</strong>
                <p className='mt-5'>Bem-vindo ao Web Chat! Conecte-se instantaneamente com pessoas de todo o mundo e inicie conversas em tempo real. Nossa plataforma intuitiva e amigável oferece uma experiência de chat online sem complicações.</p>
                <div className='d-flex justify-content-between'>
                    <Link to={'/trocarTelas'} className={`${styles.btnEntrar} btn`}>Entrar</Link>
                    <Link to={'/criarConta'} className={`${styles.btnInscrever} btn`}>Inscrever</Link>
                </div>
            </div>
            <div>
                <img src={ChatBot} alt="Chat Bot" className={styles.imgChat}/>
            </div>
        </div>
    )
}