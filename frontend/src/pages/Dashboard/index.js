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
            <h1>SIAGAF</h1>
            <h2>Bem vindo, {localStorage.getItem('userName')}</h2>
            <img heigth='400' width='400' src={logoImg} alt="Logo Menu"/>
        </div>
        <div className="footer">
                <section className="footer">
                    <h1>Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte - IFRN | Mossoró - (84) 3422-2652 / 2667 | E-mail: cocsev.mo@ifrn.edu.br</h1>
                    <h1>Copyright :copyright: 2020 - IFRN - srv-siagaf-prd.ifrn.edu.br - v1.0.01</h1>
                </section>
            </div>
        </div>
    );
}