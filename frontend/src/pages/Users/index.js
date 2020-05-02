import React,{useState,useEffect} from 'react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import {FiEdit,FiTrash,FiSearch,FiX} from "react-icons/fi/";

//Material UI
import AlertDialog from '../../components/AlertDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IconButton,Icon,} from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete'; 
import Edit from '@material-ui/icons/Edit'; 


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
    const [idUserSelected,setIdUserSelected]=useState(0);
    const [usersList,setUsersList]=useState([]);
    const [nameField,setNameField]=useState('');
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        api.get('users')
        .then(response=>{
            setUsers(response.data);
            setUsersList(response.data)
        });
    },[]);

    function abrirConfirmacao(id){
        setIdUserSelected(id);
        setOpen(true);
    }
    function deleteUser(){
        api.delete(('user/'+idUserSelected))
        .then(response=>{
            setUsers(users.filter((user) => (user.id!=idUserSelected?true:false)));
            setUsersList(usersList.filter((user) => (user.id!=idUserSelected?true:false)));
        })
        .catch((err) => {
            console.log(err);
            alert('Erro na deleção');
        });
       
        handleClose();
    }

    function handleClose(){
        setOpen(false);
    }

    function filtrarUsuarios(){
        console.log(nameField);
        console.log(users.filter((user)=> user.user_name.includes(nameField, 0)));
        setUsersList(users.filter((user)=> user.user_name.startsWith(nameField)));
        console.log(usersList);
    }
    function limparCampo(){
        setUsersList([...users]);
        setNameField('');
    }

    return(
        <div className="container">
            <div className="menulateral">
                <Menu></Menu>
            </div>
            <div className= 'dash'>
                <br></br>
                <br></br>
                

                <FiSearch size={16} />
                <input 
                    type='text' 
                    className="search-text"
                    value={nameField} 
                    onChange={e => setNameField(e.target.value)}
                />
                <button className='button' onClick={filtrarUsuarios} >Pesquisar</button>
                <button className='button-cancel' onClick={limparCampo}>Limpar</button>
            
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
                                <IconButton aria-label="edit">
                                        <Icon style={{ color: "black" }}>
                                            <Edit />
                                        </Icon>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => abrirConfirmacao(user.id)}>
                                        <Icon  style={{ color: "gray" }}>
                                            <Delete />
                                        </Icon>
                                    </IconButton>
                                   
                                </td>
                            </tr>
                        ))}
                        <tr>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>

                <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja deletar o usuario?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Não
                        </Button>
                        <Button onClick={deleteUser} color="default" autoFocus>
                            Sim
                        </Button>
                        </DialogActions>
                    </Dialog>

            </div>
            


            <Footer></Footer>
        </div>
    );
}