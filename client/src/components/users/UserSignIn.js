import { 
    Link, 
    useHistory,
    useLocation 
  } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../../Context";

const UserSignIn = () => {

    const { actions } = useContext(Context); // to access Context actions
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const history = useHistory();
    let location = useLocation();
    //console.log(location)

    /* 
        location.state was saved in PrivateRoute.js for CreateCourse and Updatecourse routes;
        In other routes, set the location.state to { from: { pathname: "/" } }
    */
    const { from } = location.state || { from: { pathname: "/" } };
    //console.log(location)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailAddress && !password) {
          setErrors("Please enter your crendentials");
        } else if (!emailAddress) {
          setErrors("Please enter your email address");
        } else if (!password) {
          setErrors("Please enter your password");
        } else {
          actions
            .signIn(emailAddress,password)
            .then((user) => {
              if (!user) {
                setErrors("Sign In was unsuccessful");
              } else {
                if (!location.state) {
                  history.goBack();
                } else {
                  history.push(from);
                  return null;
                }
              }
            })
            .catch((error) => {
              history.push("/error");
              console.log(error);
            });
        }
      };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
      }

    return(
        <main>
            <div className='form--centered'>
                <h2>Sign In</h2>
                {
                    errors.length 
                    ? <div className='validation--errors'>
                        <h3>Validation Errors</h3>
                        <ul>
                        <li>{ errors }</li>
                        </ul>
                    </div>
                    : null
                }
                <form onSubmit={handleSubmit}>

                    <label htmlFor="emailAddress"> Email Address</label>
                    <input 
                    type="email"
                    id="emailAddress" 
                    name="emailAddress"
                    value={emailAddress}
                    onChange={(e) => { setEmailAddress(e.target.value); }}
                    />

                    <label htmlFor="password"> Password</label>
                    <input
                    type="password"
                    id="password" 
                    name="password" 
                    autoComplete="on"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value); }}
                    />

                    <button 
                    className="button" 
                    type="submit"
                    onClick={handleSubmit}
                    >
                    Sign In
                    </button>

                    <button
                    className="button button-secondary"
                    onClick={handleCancel}
                    >
                    Cancel
                    </button>
                </form>
                <p>
                    Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
                </p>
            </div>
      </main>
    )
}

export default UserSignIn;