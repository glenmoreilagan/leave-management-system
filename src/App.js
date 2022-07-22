import React from 'react';
// import SideBar from './components/SideNav/SideBar'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// EMPLOYEE
import EmployeeIndex from './components/EmployeeComponent/EmployeeIndex';
import AddEditEmployee from './components/EmployeeComponent/AddEditEmployee';

// DEPARTMENT 
import DepartmentIndex from './components/DepartmentComponent/DepartmentIndex';
import AddEditDepartment from './components/DepartmentComponent/AddEditDepartment';

// LEAVETYPE
import LeavetypeIndex from './components/LeavetypeComponent/LeavetypeIndex';
import AddEditLeavetype from './components/LeavetypeComponent/AddEditLeavetype';

// APPLY LEAVE
import ApplyLeaveIndex from './components/ApplyleaveComponent/ApplyLeaveIndex';
import AddEditApplyLeave from './components/ApplyleaveComponent/AddEditApplyLeave';

// LEAVE
import LeaveIndex from './components/LeaveComponent/LeaveIndex';

// LOGIN/LOGOUT
import LoginIndex from './components/LoginComponent/LoginIndex';
import LogoutIndex from './components/LoginComponent/LogoutIndex';

// REDIRECTS
// import NotFound from './components/RedirectsComponent/NotFound';


function App() {
  return (
    <Router>
      <Switch>
        <React.Fragment>
          {/* LOGIN */}
          <Route exact path="/"><LoginIndex /></Route>
          <Route exact path="/login"><LoginIndex /></Route>
          {/* LOGIN */}
          {/* <SideBar /> */}
          {/* EMPLOYEE */}
            <Route exact path="/employees"><EmployeeIndex /></Route>
            {/** NEW/EDIT **/}
            <Route exact path="/employees/:id"><AddEditEmployee /></Route>
          {/* EMPLOYEE */}

          {/* DEPARTMENT */}
            <Route exact path="/departments"><DepartmentIndex /></Route>
            {/** NEW/EDIT **/}
            <Route exact path="/departments/:id"><AddEditDepartment /></Route>
          {/* DEPARTMENT */}
          
          {/* LEAVETYPE */}
            <Route exact path="/leavetypes"><LeavetypeIndex /></Route>
            {/** NEW/EDIT **/}
            <Route exact path="/leavetypes/:id"><AddEditLeavetype /></Route>
          {/* LEAVETYPE */}
          
          {/* APPLYLEAVE */}
            <Route exact path="/applyleaves"><ApplyLeaveIndex /></Route>
            {/** NEW/EDIT **/}
            <Route exact path="/applyleaves/:id"><AddEditApplyLeave /></Route>
          {/* APPLYLEAVE */}
          
          {/* LEAVE */}
            <Route exact path="/leaves"><LeaveIndex /></Route>
            {/** NEW/EDIT **/}
            {/* <Route exact path="/leaves/:id"><LeaveIndex /></Route> */}
          {/* LEAVE */}
          
          {/* LOGOUT */}
            <Route exact path="/logout"><LogoutIndex /></Route>
          {/* LOGOUT */}
          
          
          {/* <Route exact path="*"><NotFound /></Route> */}
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
