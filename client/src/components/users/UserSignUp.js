import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from "../../Context";


const UserSignUp = () => {

    const { data, actions } = useContext(Context); // to access Context state and actions
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPass ] = useState("");
    //const [ confirmPassword, setConfirmPass ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const history = useHistory();

    const handleValueChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "emailAddress":
                setEmailAddress(value);
                break;
            case "password":
                setPass(value);
                break;
            default:
                return;
          }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { 
          firstName, 
          lastName, 
          emailAddress, 
          password,
        };
    
        data.createUser(user)
          .then((errors) => {
            if (errors.length) {
              setErrors(errors);
            } else {
              console.log(
                `${emailAddress} is signed up and Authenticated`
              );
              console.log(user)
              actions.signIn(emailAddress, password)
                .then(() => history.push("/"));
            }
          })
          .catch((error) => {
              console.log("Error with sign up", error);
              history.push("/error");
          });
      };
    

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    };

    return (
        <main>
            <div className="form--centered">
            <h2>Sign Up</h2>
            {
                errors.length 
                ? <div className='validation--errors'>
                    <h3>Validation Errors</h3>
                    <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                    </ul>
                </div>
                : null
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                First Name
                </label>
                <input
                type="text"
                id="firstName" 
                name="firstName" 
                value={firstName}
                onChange={handleValueChange} 
                />
                <label 
                htmlFor="lastName"
                >
                Last Name
                </label>
                <input
                type="text"
                id="lastName" 
                name="lastName" 
                value={lastName}
                onChange={handleValueChange}
                />
                <label 
                htmlFor="emailAddress"
                >
                Email Address
                </label>
                <input
                type="email"
                id="emailAddress" 
                name="emailAddress" 
                value={emailAddress}
                onChange={handleValueChange}
                />
                <label 
                htmlFor="password"
                >
                Password
                </label>
                <input
                type="password"
                id="password" 
                name="password" 
                value={password}
                autoComplete="one"
                onChange={handleValueChange}
                />
                <button className="button" type="submit">
                Sign Up
                </button>
                <button
                className="button button-secondary"
                onClick={handleCancel}
                >
                Cancel
                </button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
};

export default UserSignUp;