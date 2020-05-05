import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn,FiLock,FiAlertCircle} from "react-icons/fi/";

//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import api from '../../services/api';
import '../Logon/styles.css';
import logoImg from '../../assets/logo.svg';


export default function Logon(){
   const [name,setName]=useState('');
   const [password,setPassword]=useState('');
   const [open, setOpen] = useState(false);
   const history=useHistory();

   async function handleLogon(e){
       e.preventDefault();
       try{
           const response=await api.post('logon',{name,password});
           localStorage.setItem('userId',response.data.id);
           localStorage.setItem('userName',response.data.name);
           history.push('/dashboard');
  
       }catch(err){
           console.error(err);
           setOpen(true);
       }
   }

   function handleClose(){
       setOpen(false);
   }
    return(
        <div className="logon-container">
            <div className="header">
            </div>
            <div className="content">
                <section className="welcome">
                    <h1>Bem Vindo!</h1>
                    <h2>Para acessar o sistema<br></br>Faça login com sua informação pessoal.</h2>
                </section>
                <section className="form">
                    <img className="logoImg" src={logoImg} alt="Logo"/>
                    <form onSubmit={handleLogon}>
                    <h1>
                        <FiLock size={15} color='#999999'/>
                        Login
                    </h1>
                    <hr size="2px" width="100%" color="#E5E5E5"></hr>
                        <h2>Usuario: </h2>
                        <input 
                            type="text" 
                            placeholder="Entre com seu usuário"
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        <h2>Senha: </h2>
                        <input 
                            type="password" 
                            placeholder="Entre com sua senha"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className="button" type="submit">
                            <FiLogIn size={16} color='#fff'/>
                            Acessar</button>            
                        <Link className='back-link' to='/register'>
                            Esqueceu ou deseja alterar sua senha?
                        </Link>
                    </form>                   
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" className="dialog-title"><p><FiAlertCircle className="alert-icon" size={25} color='#12524B'/>{"Falha no Login"}</p></DialogTitle>
                        <DialogContent className ="dialog">
                        <DialogContentText id="alert-dialog-description" className="dialog-description">
                        Usuario ou senha inválidos!<br></br>
                        Tente novamente.
                        </DialogContentText>    
                        </DialogContent>
                        <DialogActions className ="dialog">
                        <Button onClick={handleClose} autoFocus>
                           <h2>OK</h2>
                        </Button>
                        </DialogActions>
                    </Dialog>
                </section>
            </div>
        </div>
    );
}