import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import {FiSearch,FiX} from "react-icons/fi/";

//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import {IconButton,Icon,} from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete'; 
import Edit from '@material-ui/icons/Edit'; 


import api from '../../services/api';
import './styles.css';

export default function Users(){
    const [users,setUsers]=useState([]);
    const [usersList,setUsersList]=useState([]);
    const [offices,setOffices]=useState([]);
    const [officesList,setOfficesList]=useState([]);
    const [statuses,setStatuses]=useState([]);
    const [statusesList,setStatusesList]=useState([]);
    
    const [idUserSelected,setIdUserSelected]=useState(0);
    const [idOfficeSelected,setIdOfficeSelected]=useState(0); 
    const [idStatusSelected,setIdStatusSelected]=useState(0); 

    const [nameUserEdit,setNameUserEdit]=useState('');
    const [emailUserEdit,setEmailUserEdit]=useState('');
    const [cargoUserEdit,setCargoUserEdit]=useState(0);
    const [cargoNameUserEdit,setCargoNameUserEdit]=useState('');
    
    const [statusUserEdit,setStatusUserEdit]=useState(0);
    const [statusNameUserEdit,setStatusNameUserEdit]=useState('');


    const [nameField,setNameField]=useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    



    useEffect(()=>{
        api.get('users')
        .then(response=>{
            setUsers(response.data);
            setUsersList(response.data);      
        });

        api.get('offices')
        .then(response=>{
            setOffices(response.data);
            setOfficesList(response.data)
        });

        api.get('statuses')
        .then(response=>{
            setStatuses(response.data);
            setStatusesList(response.data)
        });
    },[]);
    
    const history = useHistory();

    async function pegarCargos(){
        await api.get('offices')
        .then(response=>{
            setOffices(response.data);
        });
    }
    async function pegarStatus(){
        await api.get('statuses')
        .then(response=>{
            setStatuses(response.data);
        });
    }

    function abrirConfirmacaoDelete(id){
        setIdUserSelected(id);
        setOpen(true);
    }
    function deleteUser(){
        api.delete(('user/'+idUserSelected))
        .then(response=>{
            setUsers(users.filter((user) => (user.id!==idUserSelected?true:false)));
            setUsersList(usersList.filter((user) => (user.id!==idUserSelected?true:false)));
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

    function handleofficeSelected(id){
        setIdOfficeSelected(id)
        console.log(idOfficeSelected);
        setCargoUserEdit(officesList.find(x => x.id === id).id);
        setCargoNameUserEdit(officesList.find(x=>x.id === id).office_name);
        console.log(cargoNameUserEdit);
    }
    function handlestatusSelected(id){
        setStatusUserEdit(id);
    }
    function abrirModalEdit(id){
        setIdUserSelected(id);
        setNameUserEdit(usersList.find(x => x.id === id).user_name);
        setEmailUserEdit(usersList.find(x => x.id === id).user_email);
        setCargoUserEdit(usersList.find(x => x.id === id).Office.id);
        setCargoNameUserEdit(usersList.find(x => x.id === id).Office.office_name);
        setStatusUserEdit(usersList.find(x => x.id === id).Status.id);
        setStatusNameUserEdit(usersList.find(x => x.id === id).Status.status_name);

        setOpenEdit(true);
    }
    async function editUser(){
        
        const userEdit={
            id: idUserSelected,
            user_name: nameUserEdit,
            user_email: emailUserEdit,
            OfficeId: cargoUserEdit,
            StatusId: statusUserEdit,
        };
         try{    
             const response=await api.put(('user/'+ idUserSelected),userEdit);
             const userIndex= users.findIndex(x => x.id === idUserSelected);
             users[userIndex].user_name=nameUserEdit;
             users[userIndex].user_email=nameUserEdit;
             users[userIndex].Office=offices.find(office => office.id===cargoUserEdit);
             users[userIndex].Status=statuses.find(status => status.id===statusUserEdit);
             const userListIndex= usersList.findIndex(x => x.id === idUserSelected);
             usersList[userListIndex].user_name=nameUserEdit;
             usersList[userListIndex].user_email=nameUserEdit;
             usersList[userListIndex].Office=offices.find(office => office.id===cargoUserEdit);
             usersList[userListIndex].Status=statuses.find(status => status.id===statusUserEdit);
         }catch(err){
             alert('Falha na edição, tente novamente');
         }
         handleCloseEdit();
     }

    function handleCloseEdit(){
        setOpenEdit(false);
    }

    function handleOfficeSelected(id){
        setCargoUserEdit(id)
    }

    function filtrarUsuarios(){
        setUsersList(users.filter((user)=> user.user_name.startsWith(nameField)));
    }
    function limparCampo(){
        setUsersList([...users]);
        setNameField('');
    }
    return(
        <div>
        <div className="container">
            <div className="menulateral">
                <Menu></Menu>
            </div>
            <div className="header">             
            </div>
            <div className="title">
                <h2>Listar Usuario</h2>
            </div>
            <div className="search">
                <input 
                    type='text' 
                    className="search-text"
                    id="input-search"
                    value={nameField} 
                    placeholder="Informe o nome do usuário"
                    onChange={e => setNameField(e.target.value)}
                />
                <button className='button' onClick={filtrarUsuarios}>
                    <FiSearch size="14"></FiSearch>
                    Pesquisar
                </button>
                <button className='button-cancel' onClick={limparCampo}>
                    <FiX size="14"></FiX>
                    Limpar
                </button>
            </div>
            <div>
            <div className="dash-content">
                <table className='dash'>
                    <thead>
                        <tr className='column-heading'>
                            <th className='collumn-user'>Nome do Usuario</th>
                            <th className='collum-email'>Email</th>
                            <th className='collumn-function'>Cargo</th>
                            <th className='collumn-status'>Status</th>
                            <th className='collumn-actions'>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map(user => (
                            <tr key={user.id}>
                                <td>{user.user_name}</td>
                                <td>{user.user_email}</td>
                                <td>{user.Office.office_name}</td>
                                <td>{user.Status.status_name}</td>
                                <td className="action">
                                    <IconButton aria-label="edit"  onClick={() =>abrirModalEdit(user.id)}>
                                        <Icon style={{ color: "#292929" }}>
                                            <Edit />
                                        </Icon>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => abrirConfirmacaoDelete(user.id)}>
                                        <Icon  style={{ color: "#E02041" }}>
                                            <Delete />
                                        </Icon>
                                    </IconButton> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
                        <InputLabel id="demo-simple-select-label">Cargos</InputLabel>
                        <Select
                            label={"Cargos"}
                            id="demo-simple-select"
                            margin="dense"
                            fullWidth
                            value={cargoUserEdit}
                            onChange={e =>handleOfficeSelected(e.target.value)}
                            >
                            {offices.map(office=>(<option key={office.id} value={office.id}>{office.office_name}</option>))}
                        </Select>
                        <TextField
                            margin="dense"
                            id="function2"
                            label="Status"
                            fullWidth
                            select={statuses.map(status=>(status.id ===[statusUserEdit]))}
                            value={statusUserEdit}    
                            onChange={e =>handlestatusSelected(e.target.value)}
                        >
                        {statuses.map(status=>(<option key={status.id} value={status.id}>{status.status_name}</option>))}
                        </TextField>
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
        </div>
        <Footer></Footer>
     </div>
    );
}