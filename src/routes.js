import React from 'react';
import {Switch, Route} from 'react-router-dom'
import AdminMenu from './Components/Admin/AdminMenu';
import BlockedDays from './Components/BlockedDaysMaintenance/BlockedDays';
import EmployeeAdd from './Components/EmployeeAdd/EmployeeAdd';
import EmployeeMaintenance from './Components/EmployeeMaintenance/EmployeeMaintenanceMenu';
import EmployeeUpdate from './Components/EmployeeUpdate/EmployeeUpdate';
import EventMaintenance from './Components/EventMaintenance/EventMaintenance';
import Login from './Components/Login/Login';
import Home from './Components/Main/Home';
import ScheduledTimeOffAdds from './Components/ScheduledTimeOffAdds/ScheduledTimeOffAdds';
import ScheduledTimeOffAdmin from './Components/ScheduledTimeOffAdmin/ScheduledTimeOffAdmin';

export default (
    <Switch>
        <Route path='/admin_menu' component={AdminMenu} />
        <Route path='/blocked_days' component={BlockedDays} />
        <Route path='/employee_add' component={EmployeeAdd} />
        <Route path='/employee_maintenance' component={EmployeeMaintenance} />
        <Route path='/employee_update' component={EmployeeUpdate} />
        <Route path='/event_maintenance' component={EventMaintenance} />
        <Route path='/login' component={Login} />
        <Route path='/scheduled_time_off_adds' component={ScheduledTimeOffAdds} />
        <Route path='/scheduled_time_off_admin' component={ScheduledTimeOffAdmin} />
        <Route exact path='/' component={Home} />
    </Switch>
)
