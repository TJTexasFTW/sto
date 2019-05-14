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
            status: ''
        }

        this.handleSubmit = this.handleSubmit.bind( this ); 
        
    }

    componentDidMount() {
        console.log("Admin_Menu component did mount. Admin value: ", this.props.admin)
        if(!this.props.admin) {
            // this.setState({redirect: true});
            this.props.history.push('/');
        }
    }

    handleBlockedDate = (e) => {
        this.setState({blocked_date: e.target.value})
    }

    handleComment = (e) => {
        this.setState({comment: e.target.value})
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
            this.setState({status: true})
            document.getElementById("blocked_date").value = '';
            document.getElementById("blocked_comment").value = '';
        }).catch(function(error) {
            this.setState({status: false})
        });
    }
    
    render() {

        //Status msg to display to user. 
        //If status is true - blocked date add was successful.
        let addBlockedStatus;

        if (this.state.status) {
            addBlockedStatus = <p id='addBlockedStatusMsg'>{this.state.blocked_date} was added</p>;
        } else if (this.state.status === false) {
            addBlockedStatus = <p id='addBlockedStatusMsg'>There was a problem adding the blocked date. Please check with the system dba.</p>;
        } else {
            addBlockedStatus = <p id='addBlockedStatusMsg'></p>;
        }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add Blocked Date</h2>

            <p className='inputLabel'>Date:  <input onChange={this.handleBlockedDate} id='blocked_date' className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input onChange={this.handleComment} id='blocked_comment' className='inputBox' placeholder = "Note"/></p>
            {addBlockedStatus}
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

const mapStateToProps = state => {
    return {
        username: state.loginUser.user.name,
        initials: state.loginUser.user.initials,
        admin: state.loginUser.user.admin,
        id: state.loginUser.user.id
    }
}

export default connect(mapStateToProps)(Blocked_Days);