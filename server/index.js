require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const authController = require('./controllers/authController');

const app = express();
app.use((req, res, next) => {
    // console.log('request');
    next();
})
app.use(express.json());

massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('Database Connected');
}).catch(err => {
    console.log("Catch statement of massive in index.js: ", err);
})

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

//chart_last_365_days_STO_by_emp
app.post('/api/addSTO', authController.addSTO);
app.post('/api/blocked', authController.addBlocked);
app.get('/api/charts/STO_365_byEmp', authController.getSTO_365_byEmp);
app.get("/api/currentMonth", authController.getDatesCurrentMonth);
app.post('/api/employee', authController.addNewEmployee);
app.get('/api/employeelists', authController.getEmployeeLists);
app.put('/api/employee_password_change/:id', authController.updateEmployeePassword);
app.put('/api/employee_update/:id', authController.updateEmployee);
app.post('/api/employee_update/:id', authController.getEmployeeData);
app.post('/api/event', authController.addEvent);
app.post('/api/login', authController.loginUser);
app.get('/api/logoff', authController.logoffUser);
app.get("/api/nextMonth", authController.getDatesNextMonth);
app.delete('/api/STO/:id', authController.deleteSTO);
app.get("/api/twoMonthsOut", authController.getTwoMonthsOut);

app.listen(3060, () => console.log('Listening on Port 3060'))