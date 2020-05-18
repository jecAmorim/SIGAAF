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
                        <NavIcon>
                            <FiHome className="icon" size={40} color='#fff' margin="5px"/>
                            <h2>{"Inicio"}</h2>
                        </NavIcon>
                    </NavItem>

                    <NavItem 
                    eventKey="album-fotografias"
                    onClick={() => {
                        history.push('/albums');
                    }}
                    >
                        <NavIcon>
                            <FiBook  className="icon album"  size={40} color='#fff' margin="8px"/>
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
                    <NavItem eventKey="fotografias">
                        <NavIcon>
                            <FiImage className="icon foto" size={40} color='#fff' margin="5px"/>
                            <h2>{"Fotografias"}</h2>
                        </NavIcon>
                    </NavItem>
                    <NavItem eventKey="usuario"
                        onClick={() => {
                            history.push('/users');
                        }}
                    >
                        <NavIcon>
                            <FiUser  className="icon" size={40} color='#fff' margin="5px"/>
                            <h2>{"Usuarios"}</h2>
                        </NavIcon>
                    </NavItem>
                    <NavItem eventKey="Relatorios">
                    <NavIcon >
                            <FiFileText className="icon" size={40} color='#fff' margin="5px"/>
                            <h2>{"Relatorios"}</h2>
                        </NavIcon>
                    </NavItem>
                    <NavItem eventKey="configuracoes">
                        <NavIcon>
                            <FiSettings className="icon" size={40} color='#fff'/>
                            <h2>{"Configurações"}</h2>
                        </NavIcon>
                    </NavItem>
                    <NavItem eventKey="sair">
                        <NavIcon>
                            <FiLogOut  className="icon" size={40} color='#fff'/>
                            <h2>{"Sair"}</h2>
                    </NavIcon>
                    </NavItem>
                    <NavItem  eventKey="help">
                        <NavIcon> 
                            <div>
                                <FiHelpCircle  className="icon" size={40} color='#fff'/>
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