import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

class Event_Maintenance extends Component {
    constructor() {
        super();
        this.state = {
            event_date: '',
            comment: '',
            id: 0,
            status: ''
        }
    }

    handleEventDate = (e) => {
        this.setState({event_date: e.target.value})
    }

    handleComment = (e) => {
        this.setState({comment: e.target.value})
    }

    handleSubmit = () => {
        // console.log("Submit button in Event Add clicked: ", this.state.event_date, this.state.comment, this.props.id)
        if (this.state.event_date === new Date() || this.state.event_date === '') {
            this.setState({status: false});
            return ""
        }

        axios.post('/api/event', {
            event_date: this.state.event_date,
            comment: this.state.comment,
            employee_id: this.props.id
        }).then(user => {
            //new event added - display msg in addStatus and clear the fields
            this.setState({status: true})
            // this.setState({event_date: ''})
            document.getElementById("event_date").value = '';
            document.getElementById("event_comment").value = '';
        }).catch(error => {
            this.setState({status: false})
        });
    }

    render() {

        let addEventStatus;

        if (this.state.status === true) {
            addEventStatus = <p id='addEventStatusMsg'>{this.state.event_date} was added.</p>;
        } else if (this.state.status === false) {
            addEventStatus = <p id='addEventStatusMsg'>Event NOT added - verify date format and try again.</p>;
            }
        else {
            addEventStatus = <p id='addEventStatusMsg'></p>;
            }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add an Event</h2>

            <p className='inputLabel'>Date:  <input onChange={this.handleEventDate} id="event_date" className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input onChange={this.handleComment} id="event_comment" className='inputBox' placeholder = "Note" autocomplete="off"/></p>
            {addEventStatus}

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                    {/* <button className = "adminButton">DELETE</button> */}
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}
export default Event_Maintenance