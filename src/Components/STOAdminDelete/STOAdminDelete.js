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
            endDate: new Date(),
            status: ''
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
        this.setState({status: ''})
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

    deleteSTO() {
        console.log("deleteSTO:", this.state.name, this.state.startDate, this.state.endDate)
        let data = {name: this.state.name, startDate: this.state.startDate, endDate: this.state.endDate}
        
        axios.delete('/api/STO/:id', {data: {data}}).then(user => {
            document.getElementById("emp_name_STO").value = '';
            document.getElementById("start_date_delete").value = '';
            document.getElementById("end_date_delete").value = '';
            // document.getElementById('deleteSTOStatus').innerHTML = `${this.state.name} STO record was deleted`;
            this.setState({status: true})
        }).catch(error => {
            // document.getElementById('deleteSTOStatus').innerHTML = 'STO delete denied-no match or multiple matches found. See DB admin.'
            this.setState({status: false})
        });
    }

    render() {

        let deleteSTOStatus;

        if (this.state.status === true) {
            deleteSTOStatus = <p id='deleteSTOStatusMsg'>STO was deleted.</p> ;
        } else if (this.state.status === '') {
            deleteSTOStatus = <p id='deleteSTOStatusMsg'></p>;
        } else if (this.state.status === false) {
            deleteSTOStatus = <p id='deleteSTOStatusMsg'>STO delete denied-no match or multiple matches found. See DB admin.</p> ;
        }


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
            {/* <center><p id='deleteSTOStatus'>Enter Employee FName, Start and End Dates. Then click the DELETE button.</p></center>  */}
            {deleteSTOStatus}
       

            
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