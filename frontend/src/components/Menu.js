import React from 'react';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {FiUser,FiHome,FiBook,FiImage,FiFileText,FiHelpCircle,FiLogOut,FiSettings} from "react-icons/fi/";
import { FaUserCircle } from "react-icons/fa";

import logoImg from '../assets/logomenu.svg';

import {useHistory} from 'react-router-dom';

export default function Footer({title,children}) {
    const history=useHistory();

    return (
    <SideNav
        onSelect={(selected) => { }}
        style={{background: '#12524B', padding:'5Px'}}
    >
        <div className="side-nav">
            <div className="navItem-logo"   eventKey="icon">
                <img  src={logoImg} alt="Logo Menu"/>
            </div>
            <div eventKey="user" className="navItem-perfile">
                <FaUserCircle className="navItem-perfile icon" size={38} color='#fff'/>
                <h2>{localStorage.getItem('userOfficeName')}</h2>
                <h3>{localStorage.getItem('userMail')}</h3>
                <hr size="1" width="95%"></hr>                
            </div>        
            <div className="nav-body">
                <SideNav.Nav>
                    <NavItem eventKey="inicio" onClick={()=>{history.push('/dashboard')}}>
                        <NavIcon>
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiHome className="icon" size={40} color='#fff'/>
                            <br></br>{"Inicio"}<br></br>
                            </i>
                        </NavIcon>
                    </NavItem>
                    <NavItem 
                    className="teste"
                    eventKey="album-fotografias"
                    onClick={() => {
                        history.push('/albums');
                    }}
                    >
                        <NavIcon>
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiBook  className="icon"  size={40} color='#fff'/>
                            <br></br>{"Albúm"}<br></br>{"fotografias"}<br></br>
                            </i>
                        </NavIcon>
                        <NavItem eventKey="album/cadastraralbum" onClick={() => {history.push('/registeralbum');}}>
                            <NavText>
                                Cadastrar Album
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="album/buscaralbum"onClick={() => {history.push('/albums');}} >
                            <NavText>
                                Pesquisar Album
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="fotografias">
                        <NavIcon>
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiImage className="icon" size={40} color='#fff'/>
                            <br></br>{"Fotografias"}<br></br>
                            </i>
                        </NavIcon>
                    </NavItem>
                    <NavItem eventKey="usuario"
                        onClick={() => {
                            history.push('/users');
                        }}
                    >
                        <NavIcon>
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiUser  className="icon" size={40} color='#fff'/>
                            <br></br>{"Usuarios"}<br></br>
                            </i>
                        </NavIcon>
                        <NavItem eventKey="charts/linechart" onClick={() => {history.push('/registeruser');}}>
                            <NavText>
                                Cadastrar Usuarios
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/linechart"onClick={() => {history.push('/users');}} >
                            <NavText >
                                Pesquisar Usuarios
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="Relatorios">
                    <NavIcon >
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiFileText className="icon" size={40} color='#fff'/>
                            <br></br>{"Relatorios"}<br></br>
                            </i>
                    </NavIcon>
                        <NavItem eventKey="charts/linechart" onClick={() => {history.push('/Offices');}}>
                            <NavText>
                                Gerenciar Cargo
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="configuracoes">
                        <NavIcon>
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiSettings className="icon" size={40} color='#fff'/>
                            <br></br>{"Configurações"}<br></br>
                            </i>
                        </NavIcon>
                        <NavItem eventKey="charts/linechart" onClick={() => {history.push('/Offices');}}>
                            <NavText>
                                Gerenciar Cargo
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/linechart"onClick={() => {history.push('/status');}} >
                            <NavText >
                                Gerenciar Status
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="sair">
                    <NavIcon>
                        <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                        <FiLogOut  className="icon" size={40} color='#fff'/>
                        <br></br>{"Sair"}<br></br>
                        </i>
                    </NavIcon>
                    </NavItem>
                    <NavItem eventKey="help">
                        <NavIcon> 
                            <i  className="fa fa-fw" style={{ fontSize: "1em" }}>
                            <FiHelpCircle  className="icon" size={40} color='#fff'/>
                            <br></br>{"Ajuda"}<br></br>
                            </i>
                        </NavIcon>
                    </NavItem>
                </SideNav.Nav>
            </div>
        </div>
    </SideNav>

    );
  }