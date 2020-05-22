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

  

export default function Status(){
    const [status,setStatus]=useState([]);
    const [statusList,setStatusList]=useState([]);
    const [idStatusSelected,setIdStatusSelected]=useState(0);
    const [nameStatusEdit,setNameStatusEdit]=useState('');
    const [nameStatusSave,setNameStatusSave]=useState('');
    const [nameField,setNameField]=useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSave, setOpenSave] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        api.get('status')
        .then(response=>{
            setStatus(response.data);
            setStatusList(response.data)
        });
    },[]);

    function abrirConfirmacaoDelete(id){
        setIdStatusSelected(id);
        setOpen(true);
    }
    function deleteStatus(){
        api.delete(('status/'+idStatusSelected))
        .then(response=>{
            setStatus(status.filter((status) => (status.id!=idStatusSelected?true:false)));
            setStatusList(statusList.filter((status) => (status.id!=idStatusSelected?true:false)));
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
        setIdStatusSelected(id);
        setNameStatusEdit(statusList.find(x => x.id === id).status_name);
        setOpenEdit(true);
    }
    function abrirModalSave(){
        setOpenSave(true);
    }
    async function editStatus(){
        console.log(nameStatusEdit);
       const statusEdit={
            id: idStatusSelected,
            status_name: nameStatusEdit,
       };
        try{    
            const response=await api.patch(('status/'+idStatusSelected),statusEdit);
            const statusIndex= status.findIndex(x => x.id === idStatusSelected);
            status[statusIndex]=statusEdit;
            const statusListIndex= statusList.findIndex(x => x.id === idStatusSelected);
            statusList[statusListIndex]=statusEdit;
        }catch(err){
            alert('Falha na edição, tente novamente'+err);
        }
        handleCloseEdit();
    }
    async function saveStatus(){
       const statusEdit={
            status_name: nameStatusSave,
       };
        try{    
            const response=await api.post('registerstatus/',statusEdit);
           setStatus([...statusList,response.data]);
           setStatusList([...statusList,response.data]);
        }catch(err){
            alert('Falha no cadastro, tente novamente'+err);
        }
        handleCloseSave();
    }

    function handleCloseSave(){
        setOpenSave(false);
    }
    function handleCloseEdit(){
        setOpenEdit(false);
    }

    function filtrarStatus(){
        console.log(nameField);
        console.log(status.filter((status)=> status.status_name.includes(nameField, 0)));
        setStatusList(status.filter((status)=> status.status_name.startsWith(nameField)));
        console.log(statusList);
    }
    function limparCampo(){
        setStatusList([...status]);
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
                <button className='button' onClick={filtrarStatus} >Pesquisar</button>
                <button className='button-cancel' onClick={limparCampo}>Limpar</button>

                <table className='table'>
                    <thead>
                        <tr className='column-heading'> 
                            <th className='collum-id'>ID</th>
                            <th className='collumn-name'>Nome do Status</th>       
                            <th className='collumn-actions'>Opções</th>                                         
                        </tr>
                    </thead>
                    <tbody className='collumn-body'>
                        {statusList.map(status => (
                            <tr key={status.id}>
                                <td>{status.id}</td>
                                <td>{status.status_name}</td>
                                <td>
                                <IconButton aria-label="edit"  onClick={() =>abrirModalEdit(status.id)}>
                                        <Icon style={{ color: "black" }}>
                                            <Edit />
                                        </Icon>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => abrirConfirmacaoDelete(status.id)}>
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
                <button className='button save' onClick={abrirModalSave}>Cadastrar</button>
                <Dialog
                        open={open}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja deletar o status?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary" autoFocus>
                            Não
                        </Button>
                        <Button onClick={deleteStatus} color="default" autoFocus>
                            Sim
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openSave} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Cadastrar Status</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                         
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome do Status"
                            type="text"
                            fullWidth
                            value={nameStatusSave} 
                            onChange={e => setNameStatusSave(e.target.value)}
                        />
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseSave} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={saveStatus} color="primary">
                            Cadastrar
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Editar Status</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                         
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome"
                            type="text"
                            fullWidth
                            value={nameStatusEdit} 
                            onChange={e => setNameStatusEdit(e.target.value)}
                        />
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={editStatus} color="primary">
                            Editar
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
            <Footer></Footer>
        </div>
    );
}