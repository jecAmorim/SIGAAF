import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import {FiEdit,FiTrash,FiSearch,FiX} from "react-icons/fi/";

//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    const [usersList,setUsersList]=useState([]);
    const [idUserSelected,setIdUserSelected]=useState(0);
    const [nameUserEdit,setNameUserEdit]=useState('');
    const [emailUserEdit,setEmailUserEdit]=useState('');
    const [functionUserEdit,setFunctionUserEdit]=useState('');
    const [nameField,setNameField]=useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        api.get('users')
        .then(response=>{
            setUsers(response.data);
            setUsersList(response.data)
        });
    },[]);

    function abrirConfirmacaoDelete(id){
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
       
        handleCloseDelete();
    }

    function handleCloseDelete(){
        setOpen(false);
    }

    function abrirModalEdit(id){
        setIdUserSelected(id);
        setNameUserEdit(usersList.find(x => x.id === id).user_name);
        setEmailUserEdit(usersList.find(x => x.id === id).user_email);
        setFunctionUserEdit(usersList.find(x => x.id === id).user_function);
        setOpenEdit(true);
    }
    async function editUser(){
       const userEdit={
           user_name: nameUserEdit,
           user_email: emailUserEdit,
           user_function: functionUserEdit,
       };
        try{    
            const response=await api.put(('user/'+idUserSelected),userEdit);
            const userIndex= users.findIndex(x => x.id === idUserSelected);
            users[userIndex]=userEdit;
            const userListIndex= usersList.findIndex(x => x.id === idUserSelected);
            usersList[userListIndex]=userEdit;
        }catch(err){
            alert('Falha na edição, tente novamente');
        }
        handleCloseEdit();
    }

    function handleCloseEdit(){
        setOpenEdit(false);
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
                                <IconButton aria-label="edit"  onClick={() =>abrirModalEdit(user.id)}>
                                        <Icon style={{ color: "black" }}>
                                            <Edit />
                                        </Icon>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => abrirConfirmacaoDelete(user.id)}>
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
                        onClose={handleCloseDelete}
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
                        <Button onClick={handleCloseDelete} color="primary" autoFocus>
                            Não
                        </Button>
                        <Button onClick={deleteUser} color="default" autoFocus>
                            Sim
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Editar Usuario</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome"
                            type="text"
                            fullWidth
                            value={nameUserEdit} 
                            onChange={e => setNameUserEdit(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Nome"
                            type="email"
                            fullWidth
                            value={emailUserEdit} 
                            onChange={e => setEmailUserEdit(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="function"
                            label="Função"
                            type="text"
                            fullWidth
                            value={functionUserEdit} 
                            onChange={e => setFunctionUserEdit(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={editUser} color="primary">
                            Editar
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
            


            <Footer></Footer>
        </div>
    );
}