import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';

class Blocked_Days extends Component {
    constructor() {
        super();
        this.state = {
            blocked_date: new Date(),
            comment: '',
            id: 0,
            status: false
        }

        this.handleLogoffClick = this.handleLogoffClick.bind( this ); 
        this.handleSubmit = this.handleSubmit.bind( this ); 
        
    }

    handleBlockedDate = (e) => {
        this.setState({blocked_date: e.target.value})
    }

    handleComment = (e) => {
        this.setState({comment: e.target.value})
    }

    handleLogoffClick() {
        //user has requested logoff
        //clear session and loginUser.user object
        axios.get('/api/logoff')
            .then(results => {this.setState({ username: '' });
        }).catch( error => alert("This is the handleLogoffClick error: ", error))

        // store.dispatch( logoff({ }) )

        //need to clear user info on state
        this.props.history.push('/')
        // console.log("STO add handleLogoffClick redirect command executed")

        document.location.reload()
        // console.log("STO add handleLogoffClick reload command executed")
    }

    handleSubmit = () => {
        // this.setState({admin: document.getElementById("adminChk").checked});
        console.log("Submit button in Blocked clicked: ", this.state.blocked_date, this.state.comment, this.props.id)
        axios.post('/api/blocked', {
            blocked_date: this.state.blocked_date,
            comment: this.state.comment,
            employee_id: this.props.id
        }).then(user => {
            //new event added - display msg in addStatus and clear the fields
            // document.getElementById('addBlockedStatus').innerHTML = `${this.state.blocked_date} was added`;
            this.setState({status: true})
            document.getElementById("blocked_date").value = '';
            document.getElementById("blocked_comment").value = '';
        }).catch(function(error) {
            // document.getElementById('addBlockedStatus').innerHTML = 'Houston we have problem - add denied.'
            this.setState({status: false})
        });
    }
    
    render() {

        //Status msg to display to user. 
        //If status is true - blocked date add was successful.
        let addBlockedStatus;

        if (this.state.status) {
            addBlockedStatus = <p id='addBlockedStatusMsg'>{this.state.blocked_date} was added</p>;
        } else {
            addBlockedStatus = <p id='addBlockedStatusMsg'>There was a problem adding the blocked date. Please check with the system dba.</p>;
        //   addBlockedStatus = <LoginButton onClick={this.handleLoginClick} />;
        }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add Blocked Date</h2>

            <p className='inputLabel'>Date:  <input onChange={this.handleBlockedDate} id='blocked_date' className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input onChange={this.handleComment} id='blocked_comment' className='inputBox' placeholder = "Note"/></p>
            {/* <center><p id='addBlockedStatus'></p></center> */}
            {addBlockedStatus}
            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    {/* <button onClick={this.handleLogoffClick} className = "adminButton">LOG OFF</button> */}
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                    {/* <button className = "adminButton">DELETE</button> */}
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
            </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.loginUser.user.name,
        initials: state.loginUser.user.initials,
        admin: state.loginUser.user.admin,
        id: state.loginUser.user.id
    }
}

export default connect(mapStateToProps)(Blocked_Days);