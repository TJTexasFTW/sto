import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

class STO_Adds extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            startDate: new Date(),
            endDate: new Date(),
            comment: ''
        }

    this.handleSubmit = this.handleSubmit.bind( this );    
    this.handleLogoffClick = this.handleLogoffClick.bind(this);

    }

    componentDidMount() {
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
    
        // axios.post('/api/STO')
        //     .then(results => {this.setState({ thisMonth: results.data });
        // }).catch( error => alert(error));
        console.log(this.state.username, this.state.startDate, this.state.endDate, this.state.comment); 
        // alert("Your STO entry has been processed");
    }   

    handleEmployee = (e) => {
        this.setState({username: e.target.value})
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

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add / Update STO</h2>

            <p className='inputLabel'>For:  <input onChange={this.handleEmployee} className='inputBox' placeholder = "User Name"/></p>
            <p className='inputLabel'>Start Date:  <input onChange={this.handleStartDate} className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>End Date:  <input onChange={this.handleEndDate} className='inputBox' placeholder = "End Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input onChange={this.handleComment} className='inputBox' placeholder = "Note"/></p>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <button className = "adminButton" onClick={this.handleLogoffClick}>LOG OFF</button>
                    <Link to='/'><button className = "adminButton">DELETE</button></Link>                    
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>
                <p>Props: {this.props.loginUser.user.id}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(STO_Adds);