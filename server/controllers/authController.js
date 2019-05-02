const bcrypt = require('bcryptjs');

module.exports = {

  getDatesCurrentMonth: async (req, res) => {        
    const getDates = await req.app.get('db').dates_zero_months_out().catch( error => alert(error));
    // return res.status(200).send(getDates).catch( error => alert(error));
    
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
  
    // console.log("In loginUser function: ", req.body);
    let getUser = await db.employee_login_verify([req.body.name]);
    let user = getUser[0];
    // console.log("User: ", user);
  
    let isAuthenticated = bcrypt.compareSync(req.body.password, user.password);
  
    // console.log("Auth: ", isAuthenticated);
    // console.log("ReqBody: ", req.body);
    // console.log("User password: ", user.password);

    if (isAuthenticated) {
      req.session.user = {
        name: user.name,
        initials: user.initials,
        id: user.id,
        admin: user.admin
      };

      // console.log("req.session.user: ", req.session.user);
    }
    res.status(200).json(req.session.user);
  },

  logoffUser(req, res) {
    // console.log("You have reached the logoffUser function in the authController")
    // console.log("This is what is on req.session: ", req.session)
    req.session.destroy();
  },

addSTO: (req, res) => {
  console.log("In authController addSTO function");
  let {start_date, end_date, comment, employee_id, added} = req.body;
  console.log("new STO to add req.body", req.body)

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
          // windows.alert("Username or Initials Already Exist . . .");
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
  //hash the password
  //put in database
  //add user to session
  //send the user
} 

}