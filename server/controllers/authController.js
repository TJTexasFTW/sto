const bcrypt = require('bcryptjs');

module.exports = {

  // setTimeZone: async (req, res) => {        
  //   const theTimeZone = await req.app.get('db').set_time_zone().catch( error => alert(error));
  //   // console.log("Next month:", getDatesNextMonth);
  //   return res.status(200).send(theTimeZone)
  // }, 

  getDatesCurrentMonth: async (req, res) => {        
    const getDates = await req.app.get('db').dates_zero_months_out().catch( error => alert(error));
    // console.log("We are in getDatesCurrentMonth off the controller");
    // console.log("From controller getDatesCurrentMonth", getDates);
    
    // return res.status(200).send(getDates).catch( error => alert(error));
    
    return res.status(200).send(getDates)
  },   

  getDatesNextMonth: async (req, res) => {        
    const getNextMonthDates = await req.app.get('db').dates_one_month_out().catch( error => alert(error));
    // console.log("Next month:", getDatesNextMonth);
    return res.status(200).send(getNextMonthDates)
  },   
  
  // app.get("/api/twoMonthsOut", authController.getTwoMonthsOut);
  getTwoMonthsOut: async (req, res) => {        
    const getTwoMonthsOutDates = await req.app.get('db').dates_two_months_out().catch( error => alert(error));
    return res.status(200).send(getTwoMonthsOutDates)
  },
  
  // addNewSTO: async (req, res) => {        
  //   const addNewSTOData = await req.app.get('db').insert_new_STO().catch( error => alert(error));
  //   return res.status(200).send(addNewSTOData)
  // }

  loginUser: async (req, res) => {
    let db = req.app.get("db");
  
    console.log("In loginUser function: ", req.body);
    let getUser = await db.employee_login_verify([req.body.name]);
    let user = getUser[0];
    // console.log("User: ", user);
  
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
      };

      console.log("req.session.user: ", req.session.user);
    }
    res.status(200).json(req.session.user);
  },

  logoffUser(req, res) {
    console.log("You have reached the logoffUser function in the authController")
    req.session.destroy();
    this.props.history.push('/')
  },

addSTO: (req, res) => {
  console.log("In authController addSTO function");
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
              console.log("newPassword after add:", newPassword, newPassword.length);
              db.employee_add(name, initials, newPassword, admin).then((returned) => {
                // Commented out - we do NOT want the added employee 
                // to be the session user  
                // req.session.user = {
                  //     name,
                  //     initials,
                  //     id: returned[0].id
                  // }
                  // console.log("After add processed: ", req.session.user);
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