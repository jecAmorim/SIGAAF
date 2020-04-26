import React,{useState} from 'react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';


import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logomenu.svg';

export default function Users(){
    return(
        <div className="menu">
        <Menu></Menu>
        <div class= 'dash'>
            
        </div>
        <Footer></Footer>
        </div>
    );
}