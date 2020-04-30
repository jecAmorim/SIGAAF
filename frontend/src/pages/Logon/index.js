import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn,FiLock} from "react-icons/fi/";

import api from '../../services/api';
import '../Logon/styles.css';
import logoImg from '../../assets/logo.svg';


export default function Logon(){
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const history=useHistory();

    async function handleLogon(e){
        e.preventDefault();

        try{
            const response=await api.post('logon',{name,password});
            localStorage.setItem('userId',response.data.id);
            localStorage.setItem('userName',response.data.name);
            history.push('/dashboard');
        }catch(err){
            console.error(err);
            alert('Falha no login ');
        }
    }

    return(
        <div className="logon-container">
            <div className="header">
                <hr size="8" color="#12524B" width="100%"/>
                <hr size="8" color="#00A859" width="100%"/>
            </div>
            <div className="content">
                <section className="welcome">
                    <h1>Bem Vindo!</h1>
                    <h2>Para acessar o sistema<br></br>Faça login com sua informação pessoal.</h2>
                </section>
                <section className="form">
                    <img class="logoImg"src={logoImg} alt="Logo"/>
                    <form onSubmit={handleLogon}>
                    <h1>
                        <FiLock size={15} color='#999999'/>
                        Login
                    </h1>
                    <hr size="2px" width="100%" color="#E5E5E5"></hr>
                        <h2>Usuario: </h2>
                        <input 
                            type="text" 
                            placeholder="Entre com seu usuário"
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        <h2>Senha: </h2>
                        <input 
                            type="password" 
                            placeholder="Entre com sua senha"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className="button" type="submit">
                            <FiLogIn size={16} color='#fff'/>
                            Acessar</button>
                        <Link className='back-link' to='/register'>
                            Esqueceu ou deseja alterar sua senha?
                        </Link>
                    </form>
                </section>
            </div>
            <div className="footer">
                <section className="footer">
                    <h1>Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte - IFRN | Mossoró - (84) 3422-2652 / 2667 | E-mail: cocsev.mo@ifrn.edu.br</h1>
                    <h1>Copyright :copyright: 2020 - IFRN - srv-siagaf-prd.ifrn.edu.br - v1.0.01</h1>
                </section>
            </div>
        </div>
    );
}