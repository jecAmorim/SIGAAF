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
            <form>
                        
                        
                       
                       
                        
                        
                    </form>
                    <div>
                        <form onSubmit={handleRegister}>
                            <ul className="flex-outer">
                                <li>
                                <label for="name">Nome Completo: <span>*</span></label>
                                <input 
                                placeholder='Informe o nome completo'
                                value={name} 
                                onChange={e => setName(e.target.value)}
                                />
                                </li>
                                <li>
                                <label for="email">E-mail: <span>*</span></label>
                                <input 
                                email='email' 
                                placeholder='Informe o e-mail'
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                />
                                </li>
                                <li>
                                <label for="funcao">Função: <span>*</span></label>
                                <input 
                                placeholder='Informe a função'
                                value={funcao} 
                                onChange={e => setFuncao(e.target.value)}
                                />
                                </li>
                                <li>
                                <label for="phone">Senha: <span>*</span></label>
                                <input 
                                    placeholder='Informe a senha' 
                                    value={senha} 
                                    onChange={e => setSenha(e.target.value)}
                                />
                                </li>                               
                                <li>
                                    <p>Permissões</p>
                                    <ul class="flex-inner">
                                        <li>
                                            
                                        </li>
                                        <li>
                                            
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                 <button className='button' type='submit'>Salvar</button>
                                 <button className='button cancel' type='button'>Cancelar</button>
                                </li>
                            </ul>
                        </form>
                    </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
    );
}