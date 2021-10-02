
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Context";

const CreateCourse = () => {
    const {  data, authenticatedUser } = useContext(Context);
    const history = useHistory();
    const [ validationErrors, setValidationErrors ] = useState([]);
    
    const [userId] = useState(authenticatedUser.id)
    const [password] = useState(authenticatedUser.password)
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ estimatedTime, setEstimatedTime ] = useState("");
    const [ materialsNeeded, setMaterialsNeeded ] = useState("");


    const handleValueChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "estimatedTime":
                setEstimatedTime(value);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(value);
                break;
            default:
                return;
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const course = {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId
        }
        console.log(course)
        console.log(password)
        
        data.createCourse(
            authenticatedUser.emailAddress,
            password,
            course
        )
          .then((errors) => {
            if (errors.length) {
                setValidationErrors(errors);
                console.log(errors)
            } else {
                console.log(`${title} is successfully added!`);
                history.push('/')
            };
          })
          .catch((error) => {
            console.log(error);
            history.push("/error");
          });
      }

      const handleCancel = () => {
        history.push("/");
      }
    return(
        <main>
            <div className="wrap">
            <div>
                <h2 style={{display: "inline-block"}}>
                Create Course
                </h2>
                <p style={{ float: "right"}}>
                {`By ${authenticatedUser.firstName} ${authenticatedUser.lastName}`}{" "}
                </p>
                {
                validationErrors.length
                ? <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {validationErrors.map((error,i) => (
                        <li key={i}>{ error }</li>
                        ))}
                    </ul>
                    </div>
                : null
                }
            </div>
            <p></p>
            <form onSubmit={handleSubmit} >  
                <div className="main--flex">
                    <div>
                        <label  htmlFor="title">
                        Course Title
                        </label>
                        <input
                        type="text"
                        id="title" 
                        name="title" 
                        value={title}
                        onChange={handleValueChange} 
                        />
                        <label htmlFor="description">
                        Course Description
                        </label>
                        <textarea 
                        id="description" 
                        name="description"
                        value={description}
                        onChange={handleValueChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">
                        Estimated Time
                        </label>
                        <input
                        type="text"
                        id="estimatedTime" 
                        name="estimatedTime"
                        value={estimatedTime}
                        onChange={handleValueChange} 
                        />
                        <label htmlFor="materialsNeeded">
                        Materials Needed
                        </label>
                        <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded"
                        value={materialsNeeded}
                        onChange={handleValueChange}
                        />
                    </div>
                </div>
                <button className="button" type="submit">
                Create Course
                </button>
                <button
                className="button button-secondary" 
                onClick={handleCancel}
                >
                Cancel
                </button>
            </form>
        </div>
        </main>
    )
}

export default CreateCourse;