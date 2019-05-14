import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../Redux/reducer';

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
            redirect: false,
            loginNotValid: false,
            username: ''
        }

    }

    handleName = (e) => {
        this.setState({name: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleClick = async e => {
        // console.log("In Login module - log in button clicked", this.state.name, this.state.password);
        await this.props.loginUser(this.state.name, this.state.password).catch(err => {
            console.log("Catch statement of handleClick in Login component");
            // console.log("in catch statement of handleClick of Login component");
            this.setState({loginNotValid: true});
            return console.log("invalid credentials - handleClick catch of login component")

        })
        // console.log("login after axios req.session.user: ", req.session.user)
            if (this.props.username === undefined) {
                this.setState({loginNotValid: true})

                //send to admin menu
            } else if (this.props.admin) {
                this.props.history.push('/admin_menu')
            } else {
                this.props.history.push('/scheduled_time_off_adds')
            }
    }

    render() {
        let loginUserStatus;
        // console.log("login render: ", this.props.admin)

        if (this.state.loginNotValid) {
          loginUserStatus = <p id='loginStatusMsg'>There is a problem with the user's credentials</p>;
        } else {
          loginUserStatus = <p></p>;
        }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Login</h2>

            <p className='inputLabel'>Name:  <input onChange={this.handleName} className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Password:  <input onChange={this.handlePassword} className='inputBox' type='password' placeholder = "Password" /></p>
            {loginUserStatus}
            
            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <button className="addButton" onClick={this.handleClick} >LOG IN</button>
                    
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

// export default connect(mapStateToProps, { requestUserData })(Login);
export default connect(mapStateToProps, { loginUser })(Login);