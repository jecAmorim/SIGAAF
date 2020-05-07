import React,{useState} from 'react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {Link,useHistory} from 'react-router-dom';



import api from '../../services/api';
import './stylesDash.css';


import logoImg from '../../assets/logo.svg';


export default function Dashboard(){
    return(
        <div>
          <Menu></Menu>
        <div className="container">
            <div className="header">
                
            </div>
            <div className="title">
                <h2>Bem vindo, {localStorage.getItem('userName')}</h2>
            </div>
            <div className= 'dash'>
            <h1>SIAGAF</h1>
                <div className="content">
                    <img src={logoImg} alt="Logo Menu"/>
                </div>
            </div>
        
            <Footer></Footer>
        </div>
        </div>
    );
}