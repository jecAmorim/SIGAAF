import React,{useState} from 'react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {Link,useHistory} from 'react-router-dom';



import api from '../../services/api';
import './stylesDash.css';


import logoImg from '../../assets/logomenu.svg';


export default function Dashboard(){
    return(
        <div className="menu">
        <Menu></Menu>
        <div class= 'dash'>
            <h1>SIGAAF</h1>
            <h2>Bem vindo, {localStorage.getItem('userName')}</h2>
            <img heigth='400' width='400' src={logoImg} alt="Logo Menu"/>
        </div>
        <Footer></Footer>
        </div>
    );
}