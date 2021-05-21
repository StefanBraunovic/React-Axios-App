import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {registerAccount} from '../../services/account'

const Register = () => {
    const history = useHistory();
    const  [firstName,setName] = useState("");
    const  [lastName,setLastName] = useState("");
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [login,setLogin] = useState('');


    function signUp(){
        let item ={firstName,lastName,password,email,login}
        console.log(item);
        history.push('/login')
        registerAccount(item)
      .then((r)=>{
        console.log(r);
    })
    .catch ((err)=>{
        console.log(err);
    })
    }

    return <div>
        <h1>Register Page</h1>
        <input type="text" value={firstName} onChange={(e)=>setName(e.target.value)} placeholder="First name"/>
        <br />
        <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last name"/>
        <br />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
        <br />
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} placeholder="username"/>
        <br />
        <button onClick={signUp}>Sign up</button>
    </div>
}

export default Register