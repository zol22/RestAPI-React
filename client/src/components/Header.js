import React, {useContext}  from 'react';
import { Link } from "react-router-dom";
import { Context } from "../Context";


const Header = () => {

    const { authenticatedUser } = useContext(Context); // to access Context authenticatedUser state (it's the data returned from the user, example:
                                                        /*{     "firstName": "Joe",
                                                                "lastName": "Smith",
                                                                "emailAddress": "joe@smith.com"
                                                        }*/
//console.log(authenticatedUser)

    return(
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                    <nav>
                    {
                        authenticatedUser
                        ? <ul className="header--signedout">
                            <li>
                            Welcome, {authenticatedUser.firstName}!
                            </li>
                            <li>
                            <Link to="/signout">
                                Sign Out
                            </Link>
                            </li>
                        </ul>
                        : <ul className="header--signedout">
                            <li>
                            <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                            <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    }
                    </nav>
                </div>
            </header>

    )
};

export default Header;