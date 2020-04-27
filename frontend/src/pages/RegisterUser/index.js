import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';


import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logomenu.svg';

export default function Users(){
    const [name,setName]=useState([]);
    const [email,setEmail]=useState([]);
    const [funcao,setFuncao]=useState([]);
    const [senha,setSenha]=useState([]);

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data={
            user_name: name,
            user_email: email,
            user_function: funcao,
            user_password: senha,
        }
        try{    
            const response=await api.post('register',data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/users');
        }catch(err){
            alert('Falha no cadastro, tente novamente');
        }
    }

    return(
        <div className="container">
        <Menu></Menu>
        <div className= 'dash'>
            <h1>Dados Pessoais</h1>
            <div className='register'>
            <form onSubmit={handleRegister}>
                        <input 
                        placeholder='Nome do Usuario'
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        />
                        <input 
                        email='email' 
                        placeholder='E-mail'
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                        placeholder='Funcao'
                        value={funcao} 
                        onChange={e => setFuncao(e.target.value)}
                        />
                        <input 
                            placeholder='Senha' 
                            value={senha} 
                            onChange={e => setSenha(e.target.value)}
                        />
                        
                        <button className='button' type='submit'>Cadastrar</button>
                    </form>
            </div>
        </div>
        <Footer></Footer>
        </div>
    );
}