import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import {FiSearch} from "react-icons/fi/";

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

  

export default function Libraries(){
    const [libraries,setLibraries]=useState([]);
    const [librariesList,setLibrariesList]=useState([]);
    const [idLibrarySelected,setIdLibrarySelected]=useState(0);
    const [nameLibraryEdit,setNameLibraryEdit]=useState('');
    const [nameLibrarySave,setNameLibrarySave]=useState('');
    const [nameField,setNameField]=useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSave, setOpenSave] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        api.get('libraries')
        .then(response=>{
            setLibraries(response.data);
            setLibrariesList(response.data);
        });
    },[]);

    function abrirConfirmacaoDelete(id){
        setIdLibrarySelected(id);
        setOpen(true);
    }
    function deleteLibrary(){
        api.delete(('library/'+idLibrarySelected))
        .then(response=>{
            setLibraries(libraries.filter((library) => (library.id!=idLibrarySelected?true:false)));
            setLibrariesList(librariesList.filter((library) => (library.id!=idLibrarySelected?true:false)));
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
        setIdLibrarySelected(id);
        setNameLibraryEdit(librariesList.find(x => x.id === id).library_name);
        setOpenEdit(true);
    }
    function abrirModalSave(){
        setOpenSave(true);
    }
    async function editLibrary(){
        console.log(nameLibraryEdit);
       const libraryEdit={
            id: idLibrarySelected,
            library_name: nameLibraryEdit,
       };
        try{    
            const response=await api.patch(('library/'+idLibrarySelected),libraryEdit);
            const libraryIndex= libraries.findIndex(x => x.id === idLibrarySelected);
            libraries[libraryIndex]=libraryEdit;
            const libraryListIndex= librariesList.findIndex(x => x.id === idLibrarySelected);
            librariesList[libraryListIndex]=libraryEdit;
        }catch(err){
            alert('Falha na edição, tente novamente'+err);
        }
        handleCloseEdit();
    }
    async function saveLibrary(){
       const libraryEdit={
            library_name: nameLibrarySave,
       };
        try{    
            const response=await api.post('registerlibrary/',libraryEdit);
           setLibraries([...librariesList,response.data]);
           setLibrariesList([...librariesList,response.data]);
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

    function filtrarLibraries(){
        setLibrariesList(libraries.filter((library)=> library.library_name.startsWith(nameField)));
    }
    function limparCampo(){
        setLibrariesList([...libraries]);
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
                <button className='button' onClick={filtrarLibraries} >Pesquisar</button>
                <button className='button-cancel' onClick={limparCampo}>Limpar</button>

                <table className='table'>
                    <thead>
                        <tr className='column-heading'> 
                            <th className='collum-id'>ID</th>
                            <th className='collumn-name'>Nome da biblioteca</th>       
                            <th className='collumn-actions'>Opções</th>                                         
                        </tr>
                    </thead>
                    <tbody className='collumn-body'>
                        {librariesList.map(library => (
                            <tr key={library.id}>
                                <td>{library.id}</td>
                                <td>{library.library_name}</td>
                                <td>
                                <IconButton aria-label="edit"  onClick={() =>abrirModalEdit(library.id)}>
                                        <Icon style={{ color: "black" }}>
                                            <Edit />
                                        </Icon>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => abrirConfirmacaoDelete(library.id)}>
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
                        Tem certeza que deseja deletar a biblioteca?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary" autoFocus>
                            Não
                        </Button>
                        <Button onClick={deleteLibrary} color="default" autoFocus>
                            Sim
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openSave} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Cadastrar Biblioteca</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                         
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome da biblioteca"
                            type="text"
                            fullWidth
                            value={nameLibrarySave} 
                            onChange={e => setNameLibrarySave(e.target.value)}
                        />
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseSave} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={saveLibrary} color="primary">
                            Cadastrar
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Editar Biblioteca</DialogTitle>
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
                            value={nameLibraryEdit} 
                            onChange={e => setNameLibraryEdit(e.target.value)}
                        />
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={editLibrary} color="primary">
                            Editar
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
            <Footer></Footer>
        </div>
    );
}