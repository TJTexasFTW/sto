import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

// import axios from 'axios';

class STO_Adds extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false
        }

    this.handleSubmit = this.handleSubmit.bind( this );    

    }

    handleSubmit() {
        alert("Your STO entry has been processed");
    }   


    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add / Update STO</h2>
                {/* <h3 className = 'userMsg'>Your STO entry has been added/updated</h3> */}

            <p className='inputLabel'>For:  <input className='inputBox' placeholder = "User Name"/></p>
            <p className='inputLabel'>Start Date:  <input className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>End Date:  <input className='inputBox' placeholder = "End Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input className='inputBox' placeholder = "Note"/></p>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/'><button className = "adminButton">LOG OFF</button></Link>
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}
export default STO_Adds