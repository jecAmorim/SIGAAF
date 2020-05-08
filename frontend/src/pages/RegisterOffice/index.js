import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';


import api from '../../services/api';
import './styles.css';


export default function RegisterOffice(){
    const [name,setName]=useState([]);
    const [email,setEmail]=useState([]);
    const [funcao,setFuncao]=useState([]);
    const [senha,setSenha]=useState([]);
    const [offices,setOffices]=useState([])
    const [officeSelected,setOfficeSelected]=useState(0);

    async function pegarCargos(){
        await api.get('offices')
        .then(response=>{
            setOffices(response.data);
            console.log(response.data);
            setOfficeSelected(response.data[0].id);
        });
    }

    useEffect(()=>{
        pegarCargos();
    },[]);
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data={
            user_name: name,
            user_email: email,
            office_id: officeSelected,
            user_password: senha,
        }
        try{    
            const response=await api.post('register',data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/users');
        }catch(err){
            alert('Falha no cadastro, tente novamente'+err);
        }
    }

    function handleofficeSelected(id){
        setOfficeSelected(id)
        console.log(id);
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
                                <label for="funcao">Cargo: <span>*</span></label>
                                <select  value={officeSelected} onChange={e =>handleofficeSelected(e.target.value)}>
                                {offices.map(cargo=>(<option key={cargo.id} value={cargo.id}>{cargo.office_name}</option>))}
                                </select>                            
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