import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


/* 
  Operation 1: Find the component property defined on app.js <PrivateRoute .../> (Note: lowercase component) 
  and assign it to a new variable we call Component (Note: capital Component).

  Operation 2: Then, take all remaining properties defined on the <PrivateRoute .../> and 
  collect them inside an argument called rest.

  Ex: In app.js -> <PrivateRoute path="/courses/create" component={CreateCourse} />
  Component = 'CreateCourse' 
  ...rest = ' path="/courses/create" '

  After a user successfully signs in, redirect them back to the previous screen (whatever that happens to be).
  For example, if a user attempts to view the "Create Course" screen before they've signed in, 
  they'll be redirected to the "Sign In" screen. After the user has successfully signed in, 
  redirect them to the "Create Course" screen.
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route {...rest} render={props => 
          context.authenticatedUser ? 
          ( <Component {...props} /> ) : 
          ( <Redirect to={{ pathname: '/signin', state: { from: props.location }}} /> )
          }
        />
      )}
    </Consumer>
  );
};
export default PrivateRoute;