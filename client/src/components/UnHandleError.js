import React from 'react';
import { Link } from "react-router-dom";

const UnHandleError = () => {
  return(
    <main>
      <div className="form--centered">
        <h2>Error</h2>
        <p>Sorry, We just encountered an unexpected error.</p>
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
export default UnHandleError;