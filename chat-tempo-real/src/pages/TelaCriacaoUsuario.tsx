import styles from './../css/TelaCriacaoUsuario.module.css';
import CriarConta from './../assets/CriarConta.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EyeFill from './../assets/eye-fill.svg';
import EyeSlash from './../assets/eye-slash.svg';

export default function TelaCriacaoUsuario(){

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    }

    return(
        <div className={`${styles.body}`}>
            <div className={styles.imgContainer}>
                <img src={CriarConta} alt="Criação de Conta" />
            </div>
            <div className={`${styles.form} mt-5 p-2`}>
                <h3>Bem vindo ao WebChat</h3>
                <p className='pb-3'>Crie sua conta para se juntar a nós</p>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder='Seu Nome de Usuário'
                />
                <input 
                    type="email" 
                    className="form-control my-4" 
                    placeholder='Seu Email'
                />

                <div className='mb-3'>
                    <input 
                        type={mostrarSenha ? 'text' : 'password'} 
                        placeholder='Sua Senha'
                    />
                    
                    <i onClick={toggleMostrarSenha}>
                        {mostrarSenha ? <img src={EyeFill} alt="ocultar senha" /> : <img src={EyeSlash} alt="mostrar senha" />}
                    </i>
                        
                </div>
                
                <div className='mt-4'>
                    <input 
                        type={mostrarSenha ? 'text' : 'password'} 
                        placeholder='Confirmar Senha'
                    />
                    
                    <i onClick={toggleMostrarSenha}>
                        {mostrarSenha ? <img src={EyeFill} alt="ocultar senha" /> : <img src={EyeSlash} alt="mostrar senha" />}
                    </i>
                </div>
                <button className={`${styles.btnInscrever} btn mt-3`}>Inscrever</button>
                <p className='text-center mt-4'>Você já têm uma conta?<Link to={'/login'}> Entrar</Link></p>
            </div>
        </div>
    )
}