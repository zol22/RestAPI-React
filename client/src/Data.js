import config from './config'; // http://localhost:5000/api

export default class Data {
    
    /*  
        A function that allows any component to make a request to the API
        based on the given arguments.
        @returns fetch(url,options), Note: needs to parses JSON response into native Javascript objects!
        json() is async and returns a promise object that resolves to a Javascript object.
        JSON.parse() is sync and it takes JSON string and  parse it into  a Javascript object.
        getJSON loads JSON encoded data from the server using GET HTTP request.
        JSON.stringfy() takes a Javascript object and transform it into a JSON string.
    */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
      
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
    
        if (body !== null) {
          options.body = JSON.stringify(body); // body data type must match "Content-Type" header
        }
    
        /*
            Check if authorization is required (true).
            If so, credentials will be passed as an object containing emailAddress and password properties.
            The btoa() method creates a base-64 encoded ASCII string from a "string" of data.  
            Add authorization property to headers object and set it to 'encodedCredentials'
        */
        if (requiresAuth) {    
          const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
          //console.log(credentials)
          options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
      }


    /******************************** User Routes ******************************************/
    /*
      This function call api function : GET request to '/users' endpoint, it requires 
      authentication (requiresAuth = true) so it passes credentials an object ({emailAddress,pasword})
      it calls api(/users, method = 'GET', body = null, requiresAuth = true, credentials = { emailAddress, password}) 
      If a response is successful, parse it into JSON ; if response is 401, return null, else, throw an error.
    */
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        //console.log(response) 
        if (response.status === 200) {
        return response.json().then(data => data);
        }
        else if (response.status === 401) { 
        return null; 
        }
        else {
        throw new Error();
        }
  }

    /*
      This function call api function : POST request to '/users' endpoint,
      it calls api(/users, method = 'POST', body = user, requiresAuth = false, credentials = null) 
      If a response is successful, return empty array ; if response is 400, parse into json and return the errors
      , else, throw an error.
    */
    
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          console.log("The response was successfully.... ");
        return [];
        }
        else if (response.status === 400) {
        return response.json().then(data => {
            return data.errors;
        });
        }
        else {
        throw new Error();
        }
  }

   /******************************** Courses Routes ******************************************/
  

    /*
      This function call api function : GET request to '/courses' endpoint,
      it calls api(/courses, method = 'GET', body = null, requiresAuth = false, credentials = null) 
      If a response is successful, parses it into json and return it
      , else, throw an error.
    */
    async getCourses(){
        const response = await this.api('/courses', 'GET');
        //console.log(response)
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else {
            let err = new Error();
            err.status = response.status;
            throw err;
        }
   }

    /*
      This function call api function : GET request to '/courses/:id' endpoint,
      it calls api(/courses/:id, method = 'GET', body = null, requiresAuth = false, credentials = null) 
      If a response is successful, parses it into json and return it
      ,else, throw an error.
    */
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) {
        return response.json().then(data => data);
        } else {
        let err = new Error();
        err.status = response.status;
        throw err;
        }
    }

   /*
      This function call api function : POST request to '/courses' endpoint,
      it calls api(/courses, method = 'POST', body = course, requiresAuth = true, credentials = {emailAddress, passwor}) 
      If a response is successful, return empty array ; if response is 400, parse into json and return the errors
      , else, throw an error.
    */
    async createCourse(emailAddress, password, course) {
        const response = await this.api(`/courses`, 'POST', course, true, { emailAddress, password });
        console.log("createcourse response...")
        console.log(response)
        if (response.status === 201) {
          return [];
        } else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          let err = new Error();
          err.status = response.status;
          throw err;
        }
      }


    /*
      This function call api function : PUT request to '/courses/:id' endpoint,
      it calls api(/courses/:id, method = 'PUT', body = course, requiresAuth = true, credentials = {emailAddress, passwor}) 
      If a response is successful, return empty array ; if response is 400, parse into json and return the errors
      , else, throw an error.
    */
    async updateCourse(emailAddress, password, course, id) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
        if (response.status === 204) {
        return [];
        } else if (response.status === 400) {
        return response.json().then(data => {
            return data.errors;
        });
        } else {
        let err = new Error();
        err.status = response.status;
        throw err;
        }
    }

    /*
      This function call api function : DELETE request to '/courses/:id' endpoint,
      it calls api(/courses/:id, method = 'DELETE', body = null, requiresAuth = true, credentials = {emailAddress, passwor}) 
      If a response is successful, return empty array ; if response is 400, parse into json and return the errors
      , else, throw an error.
    */
    async deleteCourse(emailAddress, password, id) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
        if (response.status === 204) {
          return [];
        }
        else {
          let err = new Error();
          err.status = response.status;
          throw err;
        }
      }
    

}