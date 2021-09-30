import React from 'react';
import { Context } from "../../Context";

const Authenticated = () => {
    const {authenticatedUser} = useContext(Context); // to access Context state authenticatedUser

    return(
        <div className="bounds">
        <div className="grid-100">
          <h1>{authenticatedUser} is authenticated!</h1>
          <h1>Your username is {authenticatedUser}</h1>
        </div>
      </div>

    )
}