import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import { defaultCipherList } from 'constants';
import axios from 'axios';
// import './STOAdminDelete.css';

class STOAdminDelete extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            startDate: new Date(),
            endDate: new Date()
        }
        this.deleteSTO = this.deleteSTO.bind( this );
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(dateToProcess) {
        var d = dateToProcess,
            month = '' + (d.getMonth()),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    handleEmployee = (e) => {
        this.setState({name: e.target.value})
    }

    handleStartDate = (e) => {
        // let formattedStartDate = this.formatDate(e.target.value); 
        this.setState({startDate: e.target.value})
    }

    handleEndDate = (e) => {
        // let formattedEndDate = this.formatDate(e.target.value); 
        this.setState({endDate: e.target.value})
    }

    // handleGetID = (e) => {
    //     this.setState({id: e.target.value})
    // }

    deleteSTO() {
        // /api/STO/:id
        console.log("deleteSTO:", this.state.name, this.state.startDate, this.state.endDate)
        // let id_to_send = this.state.name + "|" + this.state.startDate + '|' + this.state.endDate
        let data = {name: this.state.name, startDate: this.state.startDate, endDate: this.state.endDate}
        //axios.delete('/api/users/:id', id).
        // axios.put(`/api/employee_update/${this.state.id}`, {
        // axios.delete(url, {data:{username:"user", password:"pass"}, headers:{Authorization: "token"}})
        // axios.delete('/api/STO/:id', {data: {data}}).then(user => {
        // axios.delete('/api/STO/:id', {name: this.state.name, startDate: this.state.startDate, endDate: this.state.endDate}).then(user => {
            //employee updated - display msg in addStatus and clear the fields
        axios.delete('/api/STO/:id', {data: {data}}).then(user => {
            document.getElementById("emp_name_STO").value = '';
            document.getElementById("start_date_delete").value = '';
            document.getElementById("end_date_delete").value = '';
            document.getElementById('deleteSTOStatus').innerHTML = `${this.state.name} STO record was deleted`;
        }).catch(function(error) {
            document.getElementById('deleteSTOStatus').innerHTML = 'Houston we have problem - STO delete denied.'});
    }


    render() {

        return(
            <div>
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Delete STO Entries</h2>

                <p className='inputLabel'>FName:  
                <input id='emp_name_STO' onChange={this.handleEmployee} className='inputBox' placeholder = "FName" autoComplete="off"/></p>
                <p className='inputLabel'>Start Date:  <input id='start_date_delete' onChange={this.handleStartDate} className='inputBox' placeholder = "Start Date" type="date" autoComplete="off"/></p>
            <p className='inputLabel'>End Date:  <input id='end_date_delete' onChange={this.handleEndDate} className='inputBox' placeholder = "End Date" type="date" autoComplete="off"/></p>

            </div>
            <center><p id='deleteSTOStatus'>Enter Employee FName, Start and End Dates. Then click the DELETE button.</p></center> 
       

            
            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
                <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>

                {/* <button onClick={this.handleGETID} className="adminButton" id='empListButton'>EMP ID LIST</button> */}
                <button id='btnDeleteSTO' onClick={this.deleteSTO} className = "adminButton">DELETE</button>
                    
                </div>

            </div>
        )
    }
}
export default STOAdminDelete