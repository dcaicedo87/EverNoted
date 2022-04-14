import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteNoteThunk, editNoteThunk } from '../../store/note';
import { getAllUserNotesThunk } from '../../store/note';


const NoteInfoEdit = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log(`SESSION USER:`, sessionUser)

    const history = useHistory();

    const { noteId } = useParams();
    console.log(`NOTE ID:`, noteId)

    const [title, setTitle] = useState(sessionUser.notes[noteId]?.title);
    const [content, setContent] = useState(sessionUser.notes[noteId]?.content);

    const userId = sessionUser.id;
    console.log(`USER ID:`, userId) // console for user id

    const deleteNote = noteId => {
        dispatch(deleteNoteThunk(noteId));
        history.push(`/notes`)
    };

    const handleSubmit = e => {
        e.preventDefault();
        let updatedNote = {
          id: parseInt(noteId),
          title,
          content,
        };
        console.log(`UPDATE NOTE:`, updatedNote)

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

        dispatch(editNoteThunk(noteId, updatedNote))
        // dispatch(getAllUserNotesThunk(userId)) // for possible refresh to side panel.
        history.push(`/notes`)
    };

    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId]);

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                {/* <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
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
                </div>
                </form>
                    <button onClick={() => deleteNote(noteId)}>DELETE NOTE</button>
            </div>
        </>
      );
}

export default NoteInfoEdit;
