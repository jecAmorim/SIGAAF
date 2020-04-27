import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import RegisterUser from './pages/RegisterUser';


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Logon}></Route>
            <Route path='/dashboard' exact component={Dashboard}></Route>
            <Route path='/users' exact component={Users}></Route>
            <Route path='/registeruser' exact component={RegisterUser}></Route>
        </Switch>
        </BrowserRouter>
    )
}