import Sidebar from './components/SideNav/SideBar'


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

// LOGOUT
import LoginIndex from './components/LoginComponent/LoginIndex';

import LogoutIndex from './components/LoginComponent/LogoutIndex';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><LoginIndex /></Route>
        <div className="main">
          <Sidebar />
          <div className="container">
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
              
              {/* LOGOUT */}
                <Route exact path="/logout"><LogoutIndex /></Route>
                {/** NEW/EDIT **/}
              {/* LOGOUT */}
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
