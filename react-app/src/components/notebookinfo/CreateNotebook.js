import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNotebookThunk } from '../../store/notebook';


function NotebookAdd() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)

  const [errors, setErrors] = useState([]);
//   const [hasSubmitted, setHasSubmitted] = useState(false);
  const [title, setTitle] = useState("");


  useEffect(() => {

    let errors = [];

    if (title) {
      if (title.length === 0 || title.length > 20) errors.push('Title needs to be between 1 to 20 characters.')
    }
    if (!title) errors.push('Please enter a character for notebook Title.')

    setErrors(errors);

  }, [title])

  const updateTitle = (e) => setTitle(e.target.value);



  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    if (errors.length) return alert('Error during submission.')

    const notebookPayload = {
      title,
      user_id: user_id,
    };

    await dispatch(createNotebookThunk(notebookPayload))
    window.location.reload(false);
    history.push(`/notebooks`)
  };

  return (
    <div className="form-container">
      {errors?.map((error, idx) => (
        <p style={{color: 'red', margin:"0px"}} key={idx}>{error}</p>
      ))}
      <form className="create-notebook-form" onSubmit={handleSubmit}>
        <div className="create-form-title-container">
          <div>
            <input
              className="create-form-title"
              type="text"
              name="title"
              placeholder="Enter notebook title here..."
              value={title}
              onChange={updateTitle}
            />
          </div>
        </div>
        <div>
            <button className="create-new-spread-button" type="submit">Create Notebook</button>
        </div>
      </form>
    </div>
  );
};

export default NotebookAdd;
