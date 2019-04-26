import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import routes from './routes';
import Login from './Components/Login/Login';
import Admin_Menu from './Components/Admin/Admin_Menu';

function App() {
  return (
    
  <HashRouter> 
    <div className="App">
      {routes}
      <Admin_Menu />
      <Login />
    </div>
  </HashRouter> 

  );
}

export default App;
