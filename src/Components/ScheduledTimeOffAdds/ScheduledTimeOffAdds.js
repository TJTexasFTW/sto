import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class STO_Adds extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            comment: '',
            status: ''
        }

    this.handleSubmit = this.handleSubmit.bind( this );    
    this.formatDate = this.formatDate.bind(this);

    }

    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    handleSubmit() {
       let today = this.formatDate();
       console.log("Submit STO button clicked: ", this.props.username, this.state.startDate, this.state.endDate, this.state.comment, this.props.id, today);
        axios.post('/api/addSTO', {
            name: this.props.username,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            comment: this.state.comment,
            employee_id: this.props.id,
            added: today
        }).then(user => {
            //new sto added - display msg in addStatus and clear the fields
            this.setState({status: true})
            document.getElementById("start_date").value = '';
            document.getElementById("end_date").value = '';
            document.getElementById("comment").value = '';
        }).catch(error => {
            this.setState({status: false})
        });
    }

    handleEmployee = (e) => {
        this.setState({name: e.target.value})
    }

    handleStartDate = (e) => {
        this.setState({startDate: e.target.value})
    }

    handleEndDate = (e) => {
        this.setState({endDate: e.target.value})
    }

    handleComment = (e) => {
        this.setState({comment: e.target.value})
    }

    render() {

        let addSTOStatus;

        if (this.state.status === true) {
            addSTOStatus = <p id='addSTOStatusMsg'>STO was added.</p> ;
        } else if (this.state.status === '') {
            addSTOStatus = <p id='addSTOStatusMsg'></p>;
        } else if (this.state.status === false) {
            addSTOStatus = <p id='addSTOStatusMsg'>STO was NOT added - there is a restriction for the requested timeframe. This will require senior mgmt approval. Once approved a system admin will need to input the approved STO.</p> ;
        }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add / Update STO</h2>

            <p className='inputLabel'>For:  <input id='for' onChange={this.handleEmployee} className='inputBox' placeholder = {this.props.username} readOnly/></p>
            <p className='inputLabel'>Start Date:  <input id='start_date' onChange={this.handleStartDate} className='inputBox' placeholder = "Start Date" type="date" autoComplete="off"/></p>
            <p className='inputLabel'>End Date:  <input id='end_date' onChange={this.handleEndDate} className='inputBox' placeholder = "End Date" type="date" autoComplete="off"/></p>
            <p className='inputLabel'>Note:  <input id='comment' onChange={this.handleComment} className='inputBox' placeholder = "Note" autoComplete="off"/></p>
            <center><p id='addSTOStatus'></p></center>
            {addSTOStatus}

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>
                <p>Props: {this.props.id}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.loginUser.user.name,
        initials: state.loginUser.user.initials,
        admin: state.loginUser.user.admin,
        id: state.loginUser.user.id
    }
}

export default connect(mapStateToProps)(STO_Adds);