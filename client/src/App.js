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
import HandleError from "./components/HandleError";

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
          <Route path="/error" component={HandleError}/>
          <Route component={NotFound} />


      </Switch>
      </Router>
    </div>
  );
}

export default App;
