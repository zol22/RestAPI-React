import React, { useState,useEffect } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';


/* 
    All states and event handlers (functions) are gonna live here in the provider.
    The useContext Hook provides the functionality of the Context API in a single 
    function. Once you've created your app's Context, call useContext() inside a 
    function component to access any Context state and actions. You dont need
    to create a consumer for every child component.

    Manage your global state using the React Context API. Using this approach, 
    the authenticated user and the user sign in and sign out actions are defined 
    using a Context API <Provider> component and made available throughout your 
    application using Context API <Consumer> components.
*/

export const Context = React.createContext();

export const Provider = ({children}) => {
    const data = new Data(); // I have access to any functions stated in the class Data

   /* const [ authenticatedUser, setAuthenticatedUser ] = useState(
        Cookies.get("authenticatedUser") || null
    );*/
    const [authenticatedUser,setAuthenticatedUser ] = 
    useState(() => {
      const cookie = Cookies.get('authenticatedUser');
      return (cookie ? JSON.parse(cookie) : null);
  });
    console.log("authenticateduser from state...");
    console.log(authenticatedUser)



    const signIn = async (emailAddress, password)  => {
        const user = await data.getUser(emailAddress, password)
        if (user !== null) {
          setAuthenticatedUser({...user,...password}) // / it's not adding the password to authenticatedUser???
        }
        console.log("authenticated user from signIn()..."); 
        console.log(authenticatedUser) // not output
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1})
        
        return user
      }

    const signOut = () => {
        setAuthenticatedUser(null);
        Cookies.remove('authenticatedUser');
      }

        //passing state and functions for use through context
    const value = {
        authenticatedUser,
        data,
        actions: {
            signIn: signIn,
            signOut: signOut,
        },
    };

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
 }


export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
 export function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {(context) => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    };
  }
  
  export default { withContext, Context };
