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
            comment: ''
        }

    this.handleSubmit = this.handleSubmit.bind( this );    
    this.handleLogoffClick = this.handleLogoffClick.bind(this);

    }

    componentDidMount() {
        // console.log("STO Add this.props.username: ", this.props.username);
        // console.log("processed compDidMount:", this.state.thisMonth); 

    //     axios.get('/api/nextMonth')
    //     .then(results => {this.setState({ nextMonth: results.data });
    //   }).catch( error => alert(error));
    //     // console.log("processed compDidMount nextMonth:", this.state.nextMonth);

    //     axios.get('/api/twoMonthsOut')
    //     .then(results => {this.setState({ twoMonthsOut: results.data });
    //   }).catch( error => alert(error));
        // console.log("processed compDidMount twoMonthsOut:", this.state.twoMonthsOut);
    }


    handleSubmit() {
       let today = new Date();
       console.log("Submit STO button clicked: ", this.state.startDate, this.state.endDate, this.state.comment, this.props.id, today);
        axios.post('/api/addSTO', {
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            comment: this.state.comment,
            employee_id: this.props.id,
            added: today
        }).then(user => {
            //update redux state with the new user
            //import the action creator
            //mapStateToProps
            //connect
            //Provider
            // this.props.updateUser(user.data);
            // this.setState({redirect: true})
            //new employee added - display msg in addStatus and clear the fields
            document.getElementById('start_date').innerHTML = `${this.state.name} was added`;
            document.getElementById("end_date").value = '';
            document.getElementById("comment").value = '';
       }).catch(function(error) {
            document.getElementById('addStatus').innerHTML = 'STO was NOT added - there is a restriction for the requested timeframe. Will require senior mgmt approval and an admin to input the STO request'});
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

    handleLogoffClick() {
        //user has requested logoff
        //clear session and loginUser.user object
        axios.get('/api/logoff')
            .then(results => {this.setState({ username: '' });
        }).catch( error => alert(error))
        this.props.history.push('/')
    }

    render() {

        console.log("in render of STOAdds - this.props.name: ", this.props.name);

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add / Update STO</h2>

            <p className='inputLabel'>For:  <input id='for' onChange={this.handleEmployee} className='inputBox' placeholder = {this.props.username}/></p>
            {/* <p className='inputLabel' id="for_name">For: <input placeholder = {this.props.username}/></p> */}
            <p className='inputLabel'>Start Date:  <input id='start_date' onChange={this.handleStartDate} className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>End Date:  <input id='end_date' onChange={this.handleEndDate} className='inputBox' placeholder = "End Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input id='comment' onChange={this.handleComment} className='inputBox' placeholder = "Note"/></p>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <button className = "adminButton" onClick={this.handleLogoffClick}>LOG OFF</button>
                    <Link to='/'><button className = "adminButton">DELETE</button></Link>                    
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>
                <p>Props: {this.props.id}</p>
                {/* //this.props.admin === true */}
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return 
//         username: state.loginUser.user.name,
//         initials: state.loginUser.user.initials,
//         admin: state.loginUser.user.admin,
//         id: state.loginUser.user.id
// }
function mapStateToProps(state) {
    return {
        username: state.loginUser.user.name,
        initials: state.loginUser.user.initials,
        admin: state.loginUser.user.admin,
        id: state.loginUser.user.id
    }
}

// export default connect(mapStateToProps, { loginUser })(Login);
export default connect(mapStateToProps)(STO_Adds);