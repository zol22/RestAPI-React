import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router,} from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/users/UserSignIn";
import UserSignUp from "./components/users/UserSignUp";
import UserSignOut from "./components/users/UserSignOut";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnHandleError from "./components/UnHandleError";

import PrivateRoute from './PrivateRoute';


const App = () => {

  return (
    <div className="App">
    <Router>
      <Header/>
      <Switch>
          <Route exact path='/' component={ () => <Redirect to="/courses" />}/>
          <Route exact path="/courses" component={Courses} />
          
          {/* keeps the state:{ from : props.location} */}
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />

          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />

          {/* Errors routes*/}
          <Route path="/error" component={UnHandleError}/>
          <Route path="/notfound" component={NotFound}/>
          <Route path="/forbidden" component={Forbidden}/>
          <Route component={NotFound} />


      </Switch>
      </Router>
    </div>
  );
}

export default App;
