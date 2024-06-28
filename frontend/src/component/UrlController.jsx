import { Component } from "react";
import AccessTasksComponent from './AccessTasksComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddTaskComponent from './AddTaskComponent';
import UpdateTaskComponent from './UpdateTaskComponent'
import LoginComponent from './LoginComponent'
import CreateUserComponent from './CreateUserComponent'

class UrlController extends Component {
    render() {
        return (
            <>
                <Router>
                    {/* <div className="row">
                        <Button variant="secondary" size="sm" onClick={AccessTasksComponent.goBackToLoginScreen}>Logout</Button>
                    </div> <br /> */}
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" exact component={LoginComponent} />
                        <Route path="/createUser" exact component={CreateUserComponent} />
                        <Route path="/tasks" exact component={AccessTasksComponent} />
                        <Route path="/addTask/-1" exact component={AddTaskComponent} />
                        <Route path="/addTaskByUserName/:userName" exact component={AddTaskComponent} />
                        <Route path="/listTaskByUserName/:userName" exact component={AccessTasksComponent} />
                        <Route path="/updateTaskByUserName/:userName/:id" exact component={UpdateTaskComponent} />
                    </Switch>
                </Router>
            </>
        );
    }
}

export default UrlController;