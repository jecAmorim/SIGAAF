import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Libraries from './pages/Libraries';
import Offices from './pages/Offices';
import Status from './pages/Status';
import Albums from './pages/Albums';
import RegisterUser from './pages/RegisterUser';
import RegisterAlbum from './pages/RegisterAlbum';


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Logon}></Route>
            <Route path='/dashboard' exact component={Dashboard}></Route>
            <Route path='/users' exact component={Users}></Route>
            <Route path='/offices' exact component={Offices}></Route>
            <Route path='/status' exact component={Status}></Route>
            <Route path='/libraries' exact component={Libraries}></Route>
            <Route path='/albums' exact component={Albums}></Route>
            <Route path='/registeruser' exact component={RegisterUser}></Route>
            <Route path='/registeralbum' exact component={RegisterAlbum}></Route>
        </Switch>
        </BrowserRouter>
    )
}