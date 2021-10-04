import React, { 
    useContext, 
    useEffect, 
    useState 
  } from "react";
  import { 
    Link, 
    useParams, 
    useHistory 
  } from "react-router-dom";
  import { Context } from "../Context";
  import ReactMarkdown from "react-markdown";

const CourseDetail = () => {
    const { data,  authenticatedUser } = useContext(Context);
    const [ course, setCourse ] = useState({});
    const [ user, setUser ] = useState({});
    const { id } = useParams();
    const history = useHistory();

   //console.log("from course detail...")
    //console.log(course)

    //gets course detail
    useEffect(() => {
        data.getCourse(id)
        .then((response) => {
            if (response) {
            setCourse(response);
            setUser(response.User);
            } else  {
            // redirect to notfound page if the requested course isn't returned from the REST API
            history.push("/notfound");
            console.log("Im sorry, but the course you're looking for doesn't exist.");
            }
        })
        .catch(() => history.push("/error"));
    }, [ data, 
        id, 
        history, 
        course.id]);

    const handleDeleteCourse = (e) => {
        e.preventDefault();
        data.deleteCourse(
            authenticatedUser.emailAddress, 
            authenticatedUser.password,
            id
        )
          .then(() => {
            history.push("/");
            console.log(`Course: ${course.title} was deleted successfully`);
          })
          .catch((error) => {
            history.push("/error");
            console.log(error);
          });
      };
    


    return(
        <main>
            <div className="actions--bar">
                <div className="wrap">

                {/* 
                    Add rendering logic so that the "Update Course" and "Delete Course" buttons only 
                    display if:
                    There's an authenticated user.
                    And the authenticated user's ID matches that of the user who owns the course.
                */}
                  
                    {
                    (authenticatedUser && authenticatedUser.id  === course.userId)
                    ? <>
                        <Link 
                            className="button" 
                            to={`/courses/${id}/update`}
                        >
                            Update Course
                        </Link>
                        <Link
                            className="button"
                            onClick={handleDeleteCourse}
                            to="/"
                        >
                            Delete Course
                        </Link>
                        </>
                    : null
                    }
                    <Link 
                    className="button button-secondary" 
                    to="/"
                    >
                    Return to List
                    </Link>
                </div>
            </div>
    
            <div className="wrap">
            <h2>Course Detail</h2>
        
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {user.firstName} {user.lastName}</p>
            
                            <ReactMarkdown>
                            {course.description}
                            </ReactMarkdown>
                        </div>
                        <div>
                            {
                            course.estimatedTime 
                            ? <>
                                <h3 className="course--detail--title">
                                    Estimated Time
                                </h3>
                                <p>
                                    {course.estimatedTime}
                                </p>{" "}
                                </>
                            : null
                            }
            
                            {
                            course.materialsNeeded 
                            ? <>
                                <h3 className="course--detail--title">
                                    Materials Needed
                                </h3>
                                <ReactMarkdown className="course--detail--list">
                                    {course.materialsNeeded}
                                </ReactMarkdown>
                            </>
                            : null
                            }
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default CourseDetail;