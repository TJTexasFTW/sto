const bcrypt = require('bcryptjs');
module.exports = {

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
  loginUser: (req, res) => {
    //get username and password off of req.body
    const {username, password} = req.body;
    //get the database
    const db = req.app.get('db');
    //find the user with that username
    db.verifyUser(username).then(user => {
        if(user.length > 0) {
            bcrypt.compare(password, user[0].password).then(doesMatch => {
                if(doesMatch) {
                    req.session.user = {
                        username: user[0].username,
                        email: user[0].email,
                        balance: user[0].balance
                    }
                    res.status(200).json(req.session.user);
                } else {
                    res.status(403).json({
                        error: 'USERNAME_OR_PASSWORD_INCORRECT'
                    })
                }
            })
        } else {
            res.status(404).json({
                error: 'USER_DOES_NOT_EXIST'
            })
        }
    })

},

addNewEmployee: (req, res) => {
  //get the employee info from the body
  const {name, initials, password, admin} = req.body;
  console.log("addNewEmployee req.body", req.body);
  //check to make sure the username isnt taken
  const db = req.app.get('db');
  db.verify_employee(name, initials).then(employeeList => {
      console.log("Username or initials already exist: ", employeeList)
      if(employeeList.length > 0) {
          res.status(403).json({
              error: 'USERNAME_OR_INITIALS_ALREADY_TAKEN'
          })
          windows.alert("Username or Initials Already Exist . . .");
      } else {            
        console.log("bcrypt: ", password);
          bcrypt.hash(password, 12).then(newPassword => {

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