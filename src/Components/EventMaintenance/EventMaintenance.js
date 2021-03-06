import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';

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

    componentDidMount() {
        if(!this.props.admin) {
            this.props.history.push('/');
        }
    }

    handleEventDate = (e) => {
        this.setState({event_date: e.target.value})
    }

    handleComment = (e) => {
        this.setState({comment: e.target.value})
    }

    handleSubmit = () => {
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
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSvn0a_2sBp-FiE8pTRAh0TVqUMjIpWyofXsCYwUxu4kuQcCHkw' alt="Lake Dock" className="dockSmall" />
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("Login component mapState value of state: ", state)
    return {
        username: state.loginUser.user.name,
        initials: state.loginUser.user.initials,
        admin: state.loginUser.user.admin,
        id: state.loginUser.user.id
}}

export default connect(mapStateToProps)(Event_Maintenance);