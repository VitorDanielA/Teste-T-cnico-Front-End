import { useRef } from "react"

export default function TelaChat(){

    const mensagemRef = useRef();

    const handleSubmit = () => {
        const mensagem = mensagemRef.current.value;
        if(!mensagem.trim()){
            return
        }
    }

    return(
        <div>
            tela de chat
        </div>
    )
}