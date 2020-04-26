import React,{useState} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {Link,useHistory} from 'react-router-dom';
import {FiUser,FiHome,FiBook,FiImage,FiFileText,FiHelpCircle,FiLogOut,FiSettings} from "react-icons/fi/";
import { FaUserCircle } from "react-icons/fa";

import api from '../../services/api';
import './stylesDash.css';


import logoImg from '../../assets/logomenu.svg';


export default function Dashboard(){
    return(
        <div className="menu">
                    <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
            style={{background: '#12524B'}}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="icon">
                    <img src={logoImg} alt="Logo Menu"/>
                </NavItem>
                <NavItem eventKey="user">
                    <FaUserCircle size={48} color='#fff'/>
                </NavItem>
                <NavItem eventKey="home">
                    <NavIcon>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="inicio">
                    <NavIcon>
                        <FiHome size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Inicio
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="album-fotografias">
                    <NavIcon>
                        <FiBook size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Albúm fotografias
                    </NavText>
                </NavItem>
                <NavItem eventKey="fotografias">
                    <NavIcon>
                        <FiImage size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Fotografias
                    </NavText>
                </NavItem>
                <NavItem eventKey="usuario">
                    <NavIcon>
                        <FiUser size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Usúario
                    </NavText>
                </NavItem>
                <NavItem eventKey="Relatorios">
                    <NavIcon>
                        <FiFileText size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                       Relatorios
                    </NavText>
                </NavItem>
                <NavItem eventKey="configuracoes">
                    <NavIcon>
                        <FiSettings size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Configurações
                    </NavText>
                </NavItem>
                <NavItem eventKey="sair">
                    <NavIcon>
                        <FiLogOut size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Sair
                    </NavText>
                </NavItem>
                <NavItem eventKey="help">
                    <NavIcon>
                        <FiHelpCircle size={48} color='#fff'/>
                    </NavIcon>
                    <NavText>
                        Ajuda
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        <div class= 'dash'>
            <h1>SIGAAF</h1>
            <h2>Bem vindo, {localStorage.getItem('userName')}</h2>
            <img heigth='400' width='400' src={logoImg} alt="Logo Menu"/>
        </div>
        </div>
    );
}