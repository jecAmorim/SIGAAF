import React,{useState,useEffect} from 'react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import {TableDemo} from '../../components/TableDemo';
import ObjectList from 'react-object-list'

import api from '../../services/api';
//import './styles.css';



export default function Users(){
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        api.get('users')
        .then(response=>{
            setUsers(response.data);
        });
    },[]);
    return(
        <div className="menu">
        <Menu></Menu>
        <div class= 'dash'>
        <br></br>
        <br></br>
        <ObjectList
            columns={[
            [
                {dataKey: 'user_name', header: 'Nome '},
                {dataKey: 'id', header: 'ID'},
            ],
            {dataKey: 'user_email', header: 'Email'},
            {dataKey: 'user_function', header: 'Função'},
            ]}
            data={users}
            meta={{
            totalCount: users.length,
            }}
            favouritesEnabled={false}
        />
        </div>
    
        <Footer></Footer>
        </div>
    );
}