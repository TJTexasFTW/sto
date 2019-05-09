import React from 'react';
import './App.css';
import './reset.css';
import { HashRouter } from 'react-router-dom'
import routes from './routes';
import './App_SASS.scss';

function App() {
  return (
  
 
  <HashRouter>    
    <div className="App">
      {routes}
    </div>
  </HashRouter> 
  
  );
}

export default App;
