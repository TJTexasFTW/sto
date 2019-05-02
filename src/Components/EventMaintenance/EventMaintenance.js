import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

class Event_Maintenance extends Component {
    constructor() {
        super();
        this.state = {
            event_date: new Date(),
            comment: '',
            id: 0
        }
    }

    handleEventDate = (e) => {
        this.setState({event_date: e.target.value})
    }

    handleComment = (e) => {
        this.setState({comment: e.target.value})
    }

    handleSubmit = () => {
        console.log("Submit button in Event Add clicked: ", this.state.event_date, this.state.comment, this.props.id)
        axios.post('/api/event', {
            event_date: this.state.event_date,
            comment: this.state.comment,
            employee_id: this.props.id
        }).then(user => {
            //new event added - display msg in addStatus and clear the fields
            document.getElementById('addEventStatus').innerHTML = `${this.state.event_date} was added`;
            document.getElementById("event_date").value = '';
            document.getElementById("event_comment").value = '';
        }).catch(function(error) {
            document.getElementById('addEventStatus').innerHTML = 'Houston we have problem - add denied.'});
    }

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Event Maintenance</h2>

            <p className='inputLabel'>Date:  <input onChange={this.handleEventDate} id="event_date" className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input onChange={this.handleComment} id="event_comment" className='inputBox' placeholder = "Note"/></p>
            <center><p id='addEventStatus'></p></center>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/'><button className = "adminButton">LOG OFF</button></Link>
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                    {/* <button className = "adminButton">DELETE</button> */}
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}
export default Event_Maintenance