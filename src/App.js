import Sidebar from './components/SideNav/SideBar'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EmployeeIndex from './components/EmployeeComponent/EmployeeIndex';
import AddEditEmployee from './components/EmployeeComponent/AddEditEmployee';

import DepartmentIndex from './components/DepartmentComponent/DepartmentIndex';
import AddEditDepartment from './components/DepartmentComponent/AddEditDepartment';

function App() {
  return (
    <Router>
      <div className="main">
        <Sidebar />
        <div className="container">
          <Switch>
            {/* EMPLOYEE */}
              <Route exact path="/employee">
                <EmployeeIndex />
              </Route>
              <Route exact path="/employee/:id"> {/** NEW/EDIT **/}
                <AddEditEmployee />
              </Route>
            {/* EMPLOYEE */}

            {/* DEPARTMENT */}
              <Route exact path="/department">
                <DepartmentIndex />
              </Route>
              <Route exact path="/department/:id"> {/** NEW/EDIT **/}
                <AddEditDepartment />
              </Route>
            {/* DEPARTMENT */}

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
