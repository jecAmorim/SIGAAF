import React from 'react';
import SideNav, {Header, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {FiUser,FiHome,FiBook,FiImage,FiFileText,FiHelpCircle,FiLogOut,FiSettings} from "react-icons/fi/";
import { FaUserCircle } from "react-icons/fa";

import logoImg from '../assets/logomenu.svg';

import {Link,useHistory} from 'react-router-dom';

export default function Footer({title,children}) {
    const history=useHistory();

    return (
    <SideNav
        onSelect={(selected) => { }}
        style={{background: '#12524B', padding:'5Px'}}
    >
        <div className="side-nav">
            <div eventKey="icon">
                <img className="navItem-logo" src={logoImg} alt="Logo Menu"/>
            </div>
            <div eventKey="user" className="navItem-perfile">
                <FaUserCircle className="navItem-perfile icon" size={38} color='#fff'/>
                <h2>{"Administrador"}</h2>
                <h3>{"admin@siagaf.com"}</h3>
                <hr size="1" width="95%"></hr>                
            </div>        
            <div className="nav-body">
                <SideNav.Nav>
                    <NavItem eventKey="inicio">
                        <NavIcon className="icon">
                            <FiHome size={40} color='#fff' margin="5px"/>
                            <h2>{"Inicio"}</h2>
                        </NavIcon>
                    </NavItem>
                    <br></br>
                    <NavItem eventKey="album-fotografias">
                        <NavIcon className="icon">
                            <FiBook  size={40} color='#fff' margin="5px"/>
                            <h2>{"Albúm"}<br></br>{"fotografias"}</h2>
                        </NavIcon>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <br></br>
                    <NavItem eventKey="fotografias">
                        <NavIcon className="icon">
                            <FiImage  size={40} color='#fff' margin="5px"/>
                            <h2>{"Fotografias"}</h2>
                        </NavIcon>
                    </NavItem>
                    <br></br>
                    <NavItem eventKey="usuario"
                        onClick={() => {
                            history.push('/users');
                        }}
                    >
                        <NavIcon className="icon">
                            <FiUser size={40} color='#fff' margin="5px"/>
                            <h2>{"Usuarios"}</h2>
                        </NavIcon>
                    </NavItem>
                    <br></br>
                    <NavItem eventKey="Relatorios">
                    <NavIcon className="icon">
                            <FiFileText size={40} color='#fff' margin="5px"/>
                            <h2>{"Relatorios"}</h2>
                        </NavIcon>
                    </NavItem>
                    <br></br>
                    <NavItem eventKey="configuracoes">
                        <NavIcon className="icon">
                            <FiSettings size={40} color='#fff'/>
                            <h2>{"Configurações"}</h2>
                        </NavIcon>
                    </NavItem>
                    <br></br>
                    <NavItem eventKey="sair">
                        <NavIcon  className="icon">
                            <FiLogOut  size={40} color='#fff'/>
                            <h2>{"Sair"}</h2>
                    </NavIcon>
                    </NavItem>
                    <br></br>
                    <NavItem  eventKey="help">
                        <NavIcon> 
                            <div className="icon-footer">
                                <FiHelpCircle size={40} color='#fff'/>
                                <h2>{"Ajuda"}</h2>
                            </div>
                        </NavIcon>
                    </NavItem>
                </SideNav.Nav>
            </div>
        </div>
    </SideNav>

    );
  }