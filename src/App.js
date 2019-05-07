import React from 'react';
import './App.css';
import './reset.css';
import { HashRouter } from 'react-router-dom'
import routes from './routes';
import './App_SASS.scss';
// import Login from './Components/Login/Login';
// import AdminMenu from './Components/Admin/AdminMenu';
// import Home from './Components/Main/Home';

function App() {
  return (
  
 
  <HashRouter>    
    <div className="App">
      {routes}
      {/* <Home /> */}
      {/* <AdminMenu /> */}
      {/* <Login /> */}
    </div>
  </HashRouter> 
  
  );
}

export default App;
