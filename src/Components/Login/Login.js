import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            id: 0,
            initials: '',
            admin: false,
            inactive: false,
            redirect: false
        }
    }

    handleName = (e) => {
        this.setState({name: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleClick = e => {
        console.log("In Login module - log in button clicked", this.state.name, this.state.password);
        axios.post('/api/login', {
            name: this.state.name,
            password: this.state.password
        }).then(response => {
            this.setState({redirect: true});
        }).catch(err => {
            console.log("handleClick function in Login has issue");
        })
    }

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Login</h2>

            <p className='inputLabel'>Name:  <input onChange={this.handleName} className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Password:  <input onChange={this.handlePassword} className='inputBox' placeholder = "Password" /></p>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    {/* <Link to='/scheduled_time_off_adds'><button className="addButton" onClick={this.handleClick} >LOG IN</button></Link> */}
                    <button className="addButton" onClick={this.handleClick} >LOG IN</button>
                    
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      username: state.name,
      initials: state.initials,
      admin: state.admin,
      id: state.id
    }
  }
  
// export default connect(mapStateToProps, { requestUserData })(Login);
export default connect(mapStateToProps, { })(Login);