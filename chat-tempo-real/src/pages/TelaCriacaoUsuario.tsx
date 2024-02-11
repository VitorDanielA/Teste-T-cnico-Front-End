import styles from './../css/TelaCriacaoUsuario.module.css';
import CriarConta from './../assets/CriarConta.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EyeFill from './../assets/eye-fill.svg';
import EyeSlash from './../assets/eye-slash.svg';
import Alert from 'react-bootstrap/Alert';

class Usuario{
    login:string = '';
    senha:string = '';
    email:string = '';
}

export default function TelaCriacaoUsuario(){

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenhaVerificar, setMostrarSenhaVerificar] = useState(false);
    const [usuario, setUsuario] = useState(new Usuario());
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mostrarAlertaSucesso, setMostrarAlertaSucesso] = useState(false);
    const [verificarSenha, setVerificarSenha] = useState('');

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    }

    const toggleMostrarSenhaVerificar = () => {
        setMostrarSenhaVerificar(!mostrarSenhaVerificar);
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            email: value
        }));
    }

    const handleChangeSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            senha: value
        }));
    }
    
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            login: value
        }));
    }

    const isLoginValido = (login:string) =>{
        return login.length > 4;
    }

    const isEmailValido = (email:string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isSenhaValida = (senha:string) => {
        const letterRegex = /[a-zA-Z]/;
        const numberRegex = /[0-9]/;
        return letterRegex.test(senha) && numberRegex.test(senha);
    }

    function criarUsuario(){

        if(usuario.email === '' || usuario.login === '' || usuario.senha === '' || usuario.senha != verificarSenha){
            setMostrarAlerta(true);
            setMostrarAlertaSucesso(false);
            return;
        }

        if(!isEmailValido(usuario.email) || !isSenhaValida(usuario.senha) || !isLoginValido(usuario.login)){
            setMostrarAlerta(true);
            setMostrarAlertaSucesso(false);
            return
        }

        fetch("http://localhost:5000/usuarios", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(usuario),
        })
            .then((resp) => resp.json())
            .then(() => {
                setUsuario(new Usuario());
                setVerificarSenha('');
                setMostrarAlertaSucesso(true);
                setMostrarAlerta(false);
                setTimeout(() => {
                    window.location.href = '/trocarTelas'
                }, 1500)
            })
            .catch(err => console.log(err))
            setMostrarAlertaSucesso(true);
            setMostrarAlerta(false);
    }

    const alertaErro = () => {
        if (mostrarAlerta) {
            return (
              <Alert variant="danger" className='my-3' onClose={() => setMostrarAlerta(false)} dismissible>
                <Alert.Heading>Houve um erro no cadastro</Alert.Heading>
                <label>
                  Tente inserir as informações corretamente! (Login com mais de 4 caracteres e até 10, senha com números e letras além de iguais nos 2 campos, e email com formato válido).
                </label>
              </Alert>
            );
        }
    }

    const alertaSucesso = () => {
        if (mostrarAlertaSucesso) {
            return (
              <Alert variant="success" className='my-3' onClose={() => setMostrarAlertaSucesso(false)} dismissible>
                <Alert.Heading>Conta criada com sucesso!</Alert.Heading>
                <label>
                  Cadastro na nossa plataforma feita com sucesso! Entre na tela de Login para acessar o WebChat.
                </label>
              </Alert>
            );
        }
    }


    return(
        <div className={`${styles.body}`}>
            <div className={styles.imgContainer}>
                <img src={CriarConta} alt="Criação de Conta" />
            </div>
            <div className={`${styles.form} mt-5 p-2`}>
                <h3>Bem vindo ao WebChat</h3>
                <p className={`${styles.p} pb-3`}>Crie sua conta para se juntar a nós</p>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder='Seu Nome de Usuário'
                    maxLength={10}
                    value={usuario.login}
                    onChange={handleChangeLogin}
                />
                <input 
                    type="email" 
                    className="form-control my-4" 
                    placeholder='Seu Email'
                    value={usuario.email}
                    maxLength={35}
                    onChange={handleChangeEmail}
                />

                <div className='mb-3'>
                    <input 
                        type={mostrarSenha ? 'text' : 'password'} 
                        placeholder='Sua Senha'
                        value={usuario.senha}
                        onChange={handleChangeSenha}
                    />
                    
                    <i onClick={toggleMostrarSenha}>
                        {mostrarSenha ? <img src={EyeFill} alt="ocultar senha" /> : <img src={EyeSlash} alt="mostrar senha" />}
                    </i>
                </div>
                
                <div className='mt-4'>
                    <input 
                        type={mostrarSenhaVerificar ? 'text' : 'password'} 
                        placeholder='Confirmar Senha'
                        onChange={(e) => setVerificarSenha(e.target.value)}
                        value={verificarSenha}
                    />
                    
                    <i onClick={toggleMostrarSenhaVerificar}>
                        {mostrarSenhaVerificar ? <img src={EyeFill} alt="ocultar senha" /> : <img src={EyeSlash} alt="mostrar senha" />}
                    </i>
                </div>
                <button className={`${styles.btnInscrever} btn mt-3`} onClick={() => { criarUsuario(); setUsuario(new Usuario()); }}>Inscrever</button>
                {alertaErro()}
                {alertaSucesso()}
                <p className='text-center mt-4'>Você já têm uma conta?<Link to={'/trocarTelas'}> Entrar</Link></p>
            </div>
        </div>
    )
}
