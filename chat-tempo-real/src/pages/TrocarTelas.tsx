import { useState } from "react"
import TelaChat from "./TelaChat";
import TelaLogin from "./TelaLogin";

export default function TrocarTelas(){

    const [user, setUser] = useState('');

    return(
        <div>
            {
                user !== '' ? <TelaChat/> : <TelaLogin setUser = {setUser} />
            }
        </div>
    )
}