import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Nurse_login from './components/Login/Login';
import Nurse_pass from './components/Login/Forgot';
import Nurse_passreset from "./components/Login/ResetPassword"
import MiniDrawer from './components/Drawer page/Drawerpage';
export const apiurl = 'http://52.200.251.222:8158/api/v1/';



function App() {
  return (
    <div>
      <Router basename="nursemodule/?/">
          <Route exact path="/" component={Nurse_login} />
          <Route path={"/forgetpassword"} component={Nurse_pass} exact />
          <Route path="/passreset" component={Nurse_passreset}/>
         <Route path="/Home" component={MiniDrawer} />
        </Router>
    </div>
  );
}

export default App;
