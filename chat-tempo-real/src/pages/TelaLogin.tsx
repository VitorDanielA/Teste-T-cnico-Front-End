import { useState } from 'react';
import Conectar from './../assets/Conectar.svg';
import styles from './../css/TelaLogin.module.css';
import { Link } from 'react-router-dom';
import EyeFill from './../assets/eye-fill.svg';
import EyeSlash from './../assets/eye-slash.svg';
import Alert from 'react-bootstrap/Alert';

interface TelaLoginProps {
    setUser?: (usuario: string) => void;
}

export default function TelaLogin({setUser}: TelaLoginProps){

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    }

    function fazerLogin(){
        fetch("http://localhost:5000/usuarios", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            for(let i = 0; i < data.length ; i ++){
                if(data[i].login === login && data[i].senha === senha){
                    setLogin('');
                    setSenha('');
                    if(setUser){
                        setUser(login)
                    }
                    setUsuarioEncontrado(true);
                    return;
                } 
            }

            if(!usuarioEncontrado){
                setMostrarAlerta(true);
            }
        }).catch(err => {console.log(err);})
    }

    const alertaErro = () => {
        if (mostrarAlerta) {
            return (
              <Alert variant="danger" className='my-3' onClose={() => setMostrarAlerta(false)} dismissible>
                <Alert.Heading>Houve um erro ao entrar</Alert.Heading>
                <label>
                  Verifique as informações inseridas, pois não foi encontrado um usuário com esse login e senha.
                </label>
              </Alert>
            );
        }
    }
    
    return(
        <div className={styles.body}>
            <div className={styles.imgLogin}>
                <img src={Conectar} alt="Criação de Conta" />
            </div>
            <div className={`${styles.login} mt-5 p-2`}>
                <h3>Bem vindo de volta ao WebChat!</h3>
                <p className={`${styles.p} pb-3`}>Faça o login na sua conta</p>
                <div className='mb-3'>
                    <input 
                        type="text" 
                        className="form-control my-3" 
                        placeholder='Nome de Usuário'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <div className="mb-3">
                        <input 
                            type={mostrarSenha ? 'text' : 'password'} 
                            placeholder='Sua Senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <i onClick={toggleMostrarSenha}>
                            {mostrarSenha ? <img src={EyeFill} alt="ocultar senha" /> : <img src={EyeSlash} alt="mostrar senha" />}
                        </i>
                    </div>   
                </div>
                <button className={`${styles.btnLogin} btn mt-3`} onClick={fazerLogin}>Entrar</button>
                {alertaErro()}
                <p className='text-center mt-4'>Ainda não tem uma conta?<Link to={'/criarConta'}> Crie aqui</Link></p>
            </div>
        </div>
    )
}