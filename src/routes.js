import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login';
// import Register from './components/Register';
// import Profile from './components/Profile';
import Admin_Menu from './Components/Admin/Admin_Menu';
import Blocked_Days from './Components/Blocked_Days_Maintenance/Blocked_Days';
import Home from './Components/Main/Home';

export default (
    <Switch>
        <Route path='/admin_menu' component={Admin_Menu} />
        <Route path='/blocked_days' component={Blocked_Days} />
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Home} />
    </Switch>
)
