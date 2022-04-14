import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editNoteThunk } from '../../store/note';


const NoteInfoEdit = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log(`SESSION USER:`, sessionUser)
    const { noteId } = useParams();
    console.log(noteId)

    const [title, setTitle] = useState(sessionUser.notes[noteId].title);
    const [content, setContent] = useState(sessionUser.notes[noteId].content);

    const userId = sessionUser.id;
    console.log(`USER ID:`, userId) // console for user id




    const handleSubmit = e => {
        e.preventDefault();
        let updatedNote = {
          id: noteId,
          title,
          content,
          user_id: userId,
        };

        //error validation
        // setErrors([])

        // const newErrors = [];

        // if (updatedReview.content.length < 4) {
        //   newErrors.push("Content must be 4 characters or more.");
        // }

        // if (newErrors.length > 0) {
        //   setErrors(newErrors);
        //   return;
        // }

        // dispatch(editNoteThunk(userId, currentNote.id, updatedNote))
        // dispatch(editReviewThunk(updatedReview));
        // window.location.reload(false);
      };


    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                {/* <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div> */}
                {/* <div>
                    <input
                    name='user_id'
                    type='hidden'
                    value={userId}
                    />
                </div> */}
                <div>
                    <input
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                    className="edit-form-content"
                    name='content'
                    placeholder='Content'
                    value={content}
                      onChange={e => setContent(e.target.value)}
                    />
                </div>
                <div className="edit-form-button-container">
                    <button type='submit'>Save</button>
                    <button>DELETE NOTE</button>
                </div>
                </form>
            </div>
        </>
      );
}

export default NoteInfoEdit;
