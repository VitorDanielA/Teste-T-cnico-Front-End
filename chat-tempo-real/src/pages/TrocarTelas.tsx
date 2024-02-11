import { useEffect, useState } from "react"
import TelaChat from "./TelaChat";
import TelaLogin from "./TelaLogin";

// eslint-disable-next-line react-refresh/only-export-components
export const setItem = (key:string, value:string) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// eslint-disable-next-line react-refresh/only-export-components
export const getItem = (key:string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export default function TrocarTelas(){

    const [user, setUser] = useState('');

    useEffect(() => {
        const storedUser = getItem('usuario');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return(
        <div>
            {
                user === 'semUsuario' || user === '' ? <TelaLogin setUser = {setUser}/> : <TelaChat user = {user}/>
            }
        </div>
    )
}