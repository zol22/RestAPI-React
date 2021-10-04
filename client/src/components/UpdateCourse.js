import React, { 
    useContext,
    useState, 
    useEffect 
  } from "react";
  import { useHistory, useParams } from "react-router-dom";
  import { Context } from "../Context";

const UpdateCourse = () => {
    const { data, authenticatedUser } = useContext(Context); // from signin/signup
    const [ validationErrors, setErrors ] = useState([]);

    //const [ course, setCourse ] = useState({});
    const [ author, setAuthor ] = useState({}); // User owner of the courses. It's is set it when it fetch (Get the course we are going to edit)
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ estimatedTime, setEstimatedTime ] = useState("");
    const [ materialsNeeded, setMaterialsNeeded ] = useState("");
    const [userId] = useState(authenticatedUser.id)


    const [ isLoading, setIsLoading ] = useState(true);
    const { id } = useParams(); // id of the course
    const history = useHistory();

    /* Get the course we are going to edit*/
    useEffect(() => {
        data.getCourse(id)
          .then((response) => {
            if (response) {
                /* Check if the authenticated user's id (from signin/signup) matches the user id who owns the course. */
              if (response.userId === authenticatedUser.id) {
                setIsLoading(false);
                //setCourse(response);
                setTitle(response.title);
                setDescription(response.description);
                setEstimatedTime(response.estimatedTime);
                setMaterialsNeeded(response.materialsNeeded);
                setAuthor(response.User);
              } else {
                  /*Redirect to the forbidden path which means they dont have access to update the course */
                history.push("/forbidden");
              }
            } else {
              history.push("/notfound");
            }
          })
          .catch(() => history.push("/error"));
      }, [data, id, history, authenticatedUser.id]);

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
        };
    
        data.updateCourse(
          authenticatedUser.emailAddress,
          authenticatedUser.password,
          course,
          id
        )
          .then((errors) => {
            if (errors.length) {
              setErrors(errors);
              console.log(errors);
            } else if (!errors.length) {
              history.push(`/courses/${id}`);
              console.log(`Course "${course.title}" has been updated`);
            }
          })
          .catch((error) => {
            history.push("/error");
            console.log("There was an error updating the course", error);
          });
      };
    
      const handleCancel = () => {
        history.push(`/courses/${id}`);
      };

    return(
        <main>
            <div className="wrap">
            {
            isLoading ? 
            <div> <h2>Loading...</h2></div>
            : <React.Fragment>
                <div>
                    <h2 style={{ display: "inline-block" }}>
                    Update Course
                    </h2>
                    <p style={{float: "right"}}>
                    {`By ${author.firstName} ${author.lastName}`}
                    </p>
                    {
                    validationErrors.length
                    ? <div className="validation--errors">
                        <h3>Validation Errors</h3>
                            <ul>
                                {validationErrors.map((error) => (
                                <li>{ error }</li>
                                ))}
                            </ul>
                        </div>
                    : null
                    }
                </div>
                <p></p>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">
                            Course Title
                            </label>
                            <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleValueChange} 
                            />
                            <label
                            htmlFor="description"
                            >
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
                            value={estimatedTime ? estimatedTime: 'N/A'}
                            onChange={handleValueChange} 
                            />
                            <label htmlFor="materialsNeeded">
                            Materials Needed
                            </label>
                            <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={materialsNeeded ? materialsNeeded : 'N/A'}
                            onChange={handleValueChange}
                            />
                        </div>
                    </div>
                    <button 
                    className="button" 
                    type="submit"
                    >
                    Update Course
                    </button>
                    <button
                    className="button button-secondary"
                    onClick={handleCancel}
                    >
                    Cancel
                    </button>
                </form>
                </React.Fragment>
            }
            </div>
        </main>
        
    )
}

export default UpdateCourse;