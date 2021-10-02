import React from 'react';
import { Link } from "react-router-dom";


const Forbidden = () => {
    return(
        <main>
        <div className="form--centered">
          <h2>Forbidden</h2>
          <p>
            Sorry, you don't have permission to make changes to this course.
          </p>
          <Link 
            className="button button-secondary" 
            to="/signin"
          >
            Switch Accounts
          </Link>
          <Link 
            className="button button-secondary" 
            to="/"
          >
            Return to Course List
          </Link>
        </div>
      </main>
    )
}
export default Forbidden;