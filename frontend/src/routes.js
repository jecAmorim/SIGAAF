import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Dashboard from './pages/Dashboard';


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Logon}></Route>
            <Route path='/dashboard' exact component={Dashboard}></Route>
        </Switch>
        </BrowserRouter>
    )
}