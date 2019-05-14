const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {

  getDatesCurrentMonth: async (req, res) => {        
    const getDates = await req.app.get('db').dates_zero_months_out().catch( error => alert(error));
    return res.status(200).send(getDates)
  },   

  getDatesNextMonth: async (req, res) => {        
    const getNextMonthDates = await req.app.get('db').dates_one_month_out().catch( error => alert(error));
    return res.status(200).send(getNextMonthDates)
  },   
  
  // app.get("/api/twoMonthsOut", authController.getTwoMonthsOut);
  getTwoMonthsOut: async (req, res) => {        
    const getTwoMonthsOutDates = await req.app.get('db').dates_two_months_out().catch( error => alert(error));
    return res.status(200).send(getTwoMonthsOutDates)
  },
  
  loginUser: async (req, res) => {
    let db = req.app.get("db");
  
    console.log("In loginUser function: ", req.body);
    let getUser = await db.employee_login_verify([req.body.name]).catch(err => console.log(err));
    console.log("getUser: ", getUser)
    console.log(Array.isArray(getUser) && getUser.length === 0);
    if (getUser.length === 0) {
      console.log('no user found');
      return res.sendStatus(500)
    } else {
      let user = getUser[0];
      console.log("After running Login Query value of User: ", user);
    
      let isAuthenticated = bcrypt.compareSync(req.body.password, user.password);
    
      console.log("Auth: ", isAuthenticated);
      // console.log("ReqBody: ", req.body);
      // console.log("User password: ", user.password);
  
      if (isAuthenticated) {
        req.session.user = {
          name: user.name,
          initials: user.initials,
          id: user.id,
          admin: user.admin
        }} else {
          console.log("auth else")
          res.sendStatus(400)
            // req.session.destroy;
        };
  
      console.log("req.session.user AFTER IF STATEMENT", req.session.user);
      res.status(200).json(req.session.user);
    }
  },

  logoffUser(req, res) {
    // console.log("You have reached the logoffUser function in the authController")
    // console.log("This is what is on req.session: ", req.session)
    req.session.destroy();
  },

addSTO: (req, res) => {
  console.log("In authController addSTO function");
  let {name, start_date, end_date, comment, employee_id, added} = req.body;
  console.log("new STO to add req.body", req.body)

  //setting up email capabilities
  let transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.googlemail.com',
    port: 465,
    // secure: false,   would not send emails with secure line
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  mailOptions = {
    from: "STO Activity",
    to: "nottodayjose@yahoo.com",
    subject: `STO Added for ${name}`,
    // text: "A new STO has been added",
   html: `<h3 style="color: blue;"><u>NEW STO ENTRY</u></h3>
          <p><b>Employee</b>: ${name}</p>
          <p><b>Start:</b> ${start_date}<p>
          <p><b>End:</b> ${end_date}<p>`

    // html: '<h1><b>STO Added</b></h1><p>Testing HTML formatting</p>'
  }

  transporter.sendMail(mailOptions, function(err, res){
    if (err) {
      console.log("Error", err);
    } else {
      null;
    }
  });


  //check if there are dates blocked for the timeframe of the STO
  let db = req.app.get('db');
  db.sto_add_check_against_blocked(start_date, end_date).then(blocked_date => {
    if (blocked_date.length > 0) {
      res.status(403).json({
          error: 'There is a RESTRICTED DATE in the STO request timeframe.'
      })
} else {
  db.sto_add(start_date, end_date, comment, employee_id, added).then((returned) => {
    res.status(200).json(req.session.user);
}).catch(err => console.log(err))
}
  })},

  addBlocked: (req, res) => {
    // console.log("In authController addBlocked function");
    let {blocked_date, comment, employee_id} = req.body;
    // console.log("new blocked event to add req.body", req.body)
    let db = req.app.get('db');
    db.blocked_add(blocked_date, comment, employee_id).then(() => {
      res.status(200).json(blocked_date);
  }).catch(err => console.log(err))
  },

  addEvent: (req, res) => {
    console.log("In authController addEvent function");
    let {event_date, comment, employee_id} = req.body;
    console.log("new event date to add req.body", req.body)
    let db = req.app.get('db');
    db.event_add(event_date, comment, employee_id).then(() => {
      res.status(200).json(event_date);
  }).catch(err => console.log(err))
  },

addNewEmployee: (req, res) => {
  //get the employee info from the body
  let {name, initials, password, admin} = req.body;
  console.log("addNewEmployee req.body", req.body);
  //check to make sure the username isnt taken
  let db = req.app.get('db');
  db.employee_add_precheck(name, initials).then(employeeList => {
      // console.log("Username or initials already exist: ", employeeList)
      if(employeeList.length > 0) {
          res.status(403).json({
              error: 'USERNAME_OR_INITIALS_ALREADY_TAKEN'
          })
      } else {            
        console.log("bcrypt: ", password);
          bcrypt.hash(password, 12).then(newPassword => {
              // console.log("newPassword after add:", newPassword, newPassword.length);
              db.employee_add(name, initials, newPassword, admin).then(() => {
                  res.status(200).json(req.session.user);
              }).catch(err => console.log(err))
          }).catch(err => console.log(err))
      }
  }).catch(err => console.log(err));
},

updateEmployeePassword: (req, res) => {
  console.log("In authController updateEmployeePassword function");
  let {name, password} = req.body;
  console.log("update password req.body", req.body)
  let db = req.app.get('db');

db.employee_password_precheck(name).then(employeeList => {
  // should be only ONE match
  if(employeeList.length !== 1) {
      res.status(403).json({
          error: 'EMPLOYEE NAME DOES NOT EXIST'
      })
  } else {            
      bcrypt.hash(password, 12).then(newPassword => {
          // console.log("newPassword after add:", newPassword, newPassword.length);
          db.employee_update_password(newPassword, name).then(() => {
              res.status(200).json(name);
          }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  }
}).catch(err => console.log(err));
}, 

deleteSTO: (req, res) => {
  console.log("authController deleteSTO hit. req.body: ", req.body);
  console.log('--------------------------');
  let start_date = req.body.data.startDate;
  let end_date = req.body.data.endDate;
  let name = req.body.data.name;

  console.log('destructured: ', start_date, end_date, name);
  console.log('--------------------------');

  let db = req.app.get('db');

  db.sto_delete_verify(name, start_date, end_date).then(deleteSTO => {
    // should be only ONE match
    if(deleteSTO.length === 0) {
        res.status(403).json({
            error: 'No matching record found'
        })
      } else if (deleteSTO.length > 1) {
          res.status(409).json({
              error: 'Multiple records found - delete not authorized'
          })
      } else {
        db.sto_delete_record(name, start_date, end_date).then(() => {
          res.status(200).json(name);
        }).catch(err => console.log(err))
      }
    }).catch(err => console.log(err))
  },

getEmployeeData: (req, res) => {

  console.log("req.body: ", req.body)
  let name = req.body.currentName;
  let db = req.app.get('db');
  console.log("name: ", name)

  db.employee_update_verify(name).then(employeeList => {
    // should be only ONE match
    if(employeeList.length !== 1) {
        res.status(403).json({
            error: 'NO MATCH TO EMPLOYEE NAME FOUND'
        })
    } else {            
      res.status(200).json({employeeList})
    }
  }).catch(err => console.log(err));
},

getEmployeeLists: async (req, res) => {
  const empListActive = await req.app.get('db').employee_list_active().catch( error => alert(error))
  console.log('getEmployeeLists: ', empListActive);
  return res.status(200).send(empListActive)
},

////chart_last_365_days_STO_by_emp
getSTO_365_byEmp: async (req, res) => {
  console.log('getSTO_365_byEmp: ');
  const chartSTO365DaybyEmp = await req.app.get('db').chart_last_365_days_STO_by_emp().catch( error => alert(error))
  return res.status(200).send(chartSTO365DaybyEmp)
},

updateEmployee: (req, res) => {
  console.log("In authController updateEmployee function");
  let {name, initials, admin, inactive, id} = req.body;
  console.log("update employee req.body", req.body)
  let db = req.app.get('db');

db.employee_update_verify_by_id(id).then(employeeList => {
// db.employee_update(name, initials, admin, inactive, +id).then(employeeList => {
  // should be only ONE match
  console.log('database request made', employeeList[0])

  if(employeeList.length !== 1) {
      res.status(403).json({
          error: 'There was a problem - employee data did NOT update.'
      })
  } else {            
        db.employee_update(name, initials, admin, inactive, id).then(() => {
              res.status(200).json(name);
          }).catch(err => console.log(err))
  }
}).catch(err => console.log(err));

}

}