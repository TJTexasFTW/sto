// const bcrypt = require('bcryptjs');
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
  }   


}
