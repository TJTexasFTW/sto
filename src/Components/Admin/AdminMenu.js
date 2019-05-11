import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Admin_Menu extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
    }

    componentDidMount() {
        console.log("Admin_Menu component did mount. Admin value: ", this.props.admin)
        if(!this.props.admin) {
            // this.setState({redirect: true});
            this.props.history.push('/');
        }
    }

    render() {

        if(this.props.redirect) {
            console.log('AdminMenu what is redirect:', this.props.redirect, this.props.admin)
            // return <Redirect to='/' />
            this.props.history.push('/')
        }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Admin Menu</h2>

            <div className = 'bigButton'>
                <Link to='/employee_maintenance'><button className = "big">Employee Maintenance</button></Link>
                <Link to='/event_maintenance'><button className = "big">Add an Event</button></Link>
                <Link to='/blocked_days'><button className = "big">Add Blocked Date</button></Link>
                <Link to='/scheduled_time_off_admin'><button className = "big">Add STO for Blocked Date</button></Link>
                <Link to='/STO_admin_delete'><button className = "big">Delete STO Entries</button></Link>
                <Link to='/charts'><button className = "big">Charting</button></Link>
            </div>

            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
            </div>

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
export default connect(mapStateToProps)(Admin_Menu);
// export default Admin_Menu