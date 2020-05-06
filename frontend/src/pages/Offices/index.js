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

export default function Offices(){
    const [offices,setOffices]=useState([]);
    const [officesList,setOfficesList]=useState([]);
    const [idOfficeSelected,setIdOfficeSelected]=useState(0);
    const [nameOfficeEdit,setNameOfficeEdit]=useState('');
    const [nameField,setNameField]=useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        api.get('offices')
        .then(response=>{
            setOffices(response.data);
            setOfficesList(response.data)
        });
    },[]);

    function abrirConfirmacaoDelete(id){
        setIdOfficeSelected(id);
        setOpen(true);
    }
    function deleteOffice(){
        api.delete(('office/'+idOfficeSelected))
        .then(response=>{
            setOffices(offices.filter((office) => (office.id!=idOfficeSelected?true:false)));
            setOfficesList(officesList.filter((office) => (office.id!=idOfficeSelected?true:false)));
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
        setIdOfficeSelected(id);
        setNameOfficeEdit(officesList.find(x => x.id === id).office_name);
        setOpenEdit(true);
    }
    async function editOffice(){
        console.log(nameOfficeEdit);
       const officeEdit={
            id: idOfficeSelected,
            office_name: nameOfficeEdit,
       };
        try{    
            const response=await api.patch(('office/'+idOfficeSelected),officeEdit);
            const officeIndex= offices.findIndex(x => x.id === idOfficeSelected);
            offices[officeIndex]=officeEdit;
            const officeListIndex= officesList.findIndex(x => x.id === idOfficeSelected);
            officesList[officeListIndex]=officeEdit;
        }catch(err){
            alert('Falha na edição, tente novamente'+err);
        }
        handleCloseEdit();
    }

    function handleCloseEdit(){
        setOpenEdit(false);
    }

    function filtrarOffices(){
        console.log(nameField);
        console.log(offices.filter((office)=> office.office_name.includes(nameField, 0)));
        setOfficesList(offices.filter((office)=> office.office_name.startsWith(nameField)));
        console.log(officesList);
    }
    function limparCampo(){
        setOfficesList([...offices]);
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
                <button className='button' onClick={filtrarOffices} >Pesquisar</button>
                <button className='button-cancel' onClick={limparCampo}>Limpar</button>
            
                <table className='table'>
                    <thead>
                        <tr className='column-heading'> 
                            <th className='collum-id'>ID</th>
                            <th className='collumn-name'>Nome do Cargo</th>       
                            <th className='collumn-actions'>Opções</th>                                         
                        </tr>
                    </thead>
                    <tbody className='collumn-body'>
                        {officesList.map(office => (
                            <tr key={office.id}>
                                <td>{office.id}</td>
                                <td>{office.office_name}</td>
                                <td>
                                <IconButton aria-label="edit"  onClick={() =>abrirModalEdit(office.id)}>
                                        <Icon style={{ color: "black" }}>
                                            <Edit />
                                        </Icon>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => abrirConfirmacaoDelete(office.id)}>
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
                        Tem certeza que deseja deletar o cargo?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary" autoFocus>
                            Não
                        </Button>
                        <Button onClick={deleteOffice} color="default" autoFocus>
                            Sim
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Editar Cargo</DialogTitle>
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
                            value={nameOfficeEdit} 
                            onChange={e => setNameOfficeEdit(e.target.value)}
                        />
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={editOffice} color="primary">
                            Editar
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
            <Footer></Footer>
        </div>
    );
}