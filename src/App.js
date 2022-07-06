import Sidebar from './components/SideNav/SideBar'
import EmployeeIndex from './components/EmployeeComponent/EmployeeIndex';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="main">
        <Sidebar />
        <div className="container">
          <Switch>
            <Route exact path="/employee">
              <EmployeeIndex />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
