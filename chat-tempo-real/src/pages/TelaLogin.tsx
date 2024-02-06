import { useState } from 'react';
import Conectar from './../assets/Conectar.svg';
import styles from './../css/TelaLogin.module.css';
import { Link } from 'react-router-dom';
import EyeFill from './../assets/eye-fill.svg';
import EyeSlash from './../assets/eye-slash.svg';

export default function TelaLogin(){

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    }
    
    return(
        <div className={styles.body}>
            <div className={styles.imgLogin}>
                <img src={Conectar} alt="Criação de Conta" />
            </div>
            <div className={`${styles.login} mt-5 p-2`}>
                <h3>Bem vindo de volta ao WebChat!</h3>
                <p className='pb-3'>Faça o login na sua conta</p>
                <div className='mb-3'>
                    <input 
                        type="text" 
                        className="form-control my-3" 
                        placeholder='Nome de Usuário'
                    />
                    <div className="mb-3">
                        <input 
                            type={mostrarSenha ? 'text' : 'password'} 
                            placeholder='Sua Senha'
                        />
                        <i onClick={toggleMostrarSenha}>
                            {mostrarSenha ? <img src={EyeFill} alt="ocultar senha" /> : <img src={EyeSlash} alt="mostrar senha" />}
                        </i>
                    </div>   
                </div>
                <button className={`${styles.btnLogin} btn mt-3`}>Entrar</button>
                <p className='text-center mt-4'>Ainda não tem uma conta?<Link to={'/criarConta'}> Crie aqui</Link></p>
            </div>
        </div>
    )
}