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
            redirect: false
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
        await this.props.loginUser(this.state.name, this.state.password)
        // console.log("Login button pushed and reducer function ran");
              //redirect the user based on if admin or not
        // console.log("This.props: ", this.props)
              if (this.props.admin === true) {
                // console.log("is an admin")
                //send to admin menu
                this.props.history.push('/admin_menu')
            } else {
                this.props.history.push('/scheduled_time_off_adds')
            }
    

    // console.log("state.admin: ", this.state.admin);
    // console.log("trying props", this.props.loginUser.user.admin)


        // axios.post('/api/login', {
        //     name: this.state.name,
        //     password: this.state.password
        // }).then(response => {
        //     this.setState({redirect: true});
        // }).catch(err => {
        //     console.log("handleClick function in Login has issue");
        // })
    }

    render() {

        // console.log("login render: ", this.props.admin)



        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Login</h2>

            <p className='inputLabel'>Name:  <input onChange={this.handleName} className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Password:  <input onChange={this.handlePassword} className='inputBox' type='password' placeholder = "Password" /></p>

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
    console.log(state)
    return {
      username: state.loginUser.user.name,
      initials: state.loginUser.user.initials,
      admin: state.loginUser.user.admin,
      id: state.loginUser.user.id
    }
  }
  
// export default connect(mapStateToProps, { requestUserData })(Login);
export default connect(mapStateToProps, { loginUser })(Login);