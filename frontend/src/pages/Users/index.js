import React,{useState,useEffect} from 'react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import {FiEdit,FiTrash,FiSearch,FiX} from "react-icons/fi/";

import api from '../../services/api';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

  
  const columns = [
    {
      key: "user_name",
      name: "Nome do Usuario",
      width: 100
    },
    {
      key: "user_function",
      name: "Função",
      width: 100
    },
    {
        key: "user_email",
        name: "E-mail"
      }
  ];

export default function Users(){
    const [users,setUsers]=useState([]);
    const [usersList,setUsersList]=useState([]);
    const [nameField,setNameField]=useState('');

    useEffect(()=>{
        api.get('users')
        .then(response=>{
            setUsers(response.data);
            setUsersList(response.data)
        });
    },[]);

    function deleteUser(id){
        alert(id);
    }

    function filtrarUsuarios(){
        console.log(nameField);
        console.log(users.filter((user)=> user.user_name.includes(nameField, 0)));
        setUsersList(users.filter((user)=> user.user_name.startsWith(nameField)));
        console.log(usersList);
    }
    function limparCampo(){
        setUsersList(users);
        setNameField('');
    }

    return(
        <div className="menu">
        <Menu></Menu>
        <div class= 'dash'>
        <br></br>
        <br></br>
        

        <FiSearch size={16} />
        <input 
            type='text' 
            className="search-text"
            value={nameField} 
            onChange={e => setNameField(e.target.value)}
        />
        <button onClick={filtrarUsuarios} >Pesquisar</button>
        <button onClick={limparCampo}>Limpar</button>
    
        <table className='table'>
            <thead>
                <tr className='column-heading'>
                    <th className='collumn-user'>Nome do Usuario</th>
                    <th className='collum-email'>Email</th>
                    <th className='collumn-function'>Função</th>
                    <th className='collumn-status'>Status</th>
                    <th className='collumn-actions'>Opções</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map(user => (
                    <tr key={user.id}>
                        <td>{user.user_name}</td>
                        <td>{user.user_email}</td>
                        <td>{user.user_function}</td>
                        <td>{user.user_status}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id)}><FiEdit size={16} color='blue'/></button>
                            <button><FiTrash size={16} color='red'/></button>
                        </td>
                    </tr>
                ))}
                <tr>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>
        </div>
    
        <Footer></Footer>
        </div>
    );
}