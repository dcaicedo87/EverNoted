import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteNoteThunk, editNoteThunk } from '../../store/note';
import { getAllUserNotesThunk } from '../../store/note';


const NotebookNoteInfoEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    console.log(`SESSION USER ID:`, userId)

    // const sessionNotes = useSelector((state) => state.notes)
    const notebook_id = useSelector(state => state.notebooks)


    //CONVERT INTO INTEGERS AND SEE IF THAT FIXES THE ISSUE!
    const { notebookId } = useParams();
    // console.log(`NOTEBOOK ID STRING: `, notebookId)
    const notebookIdNum = parseInt(notebookId)
    // console.log(`NOTEBOOK ID NUM: `, notebookIdNum)
    const { noteId } = useParams();
    // console.log(`NOTE ID STRING:`, notebookId)
    const noteIdNum = parseInt(noteId)
    // console.log(`NOTE ID NUM: `, noteIdNum)

    const [title, setTitle] = useState(sessionUser.notes[noteId]?.title);
    const [content, setContent] = useState(sessionUser.notes[noteId]?.content);

    // console.log(`USER ID:`, userId) // console for user id

    const deleteNote = noteId => {
        dispatch(deleteNoteThunk(noteId));
        history.push(`/notebooks/${notebookId}`)
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
        history.push(`/notebooks/${notebookIdNum}/notes/${noteIdNum}`)
    };

    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId, notebookId, noteId]);

    return (
        <>
            <div className='edit-form-container'>
                <form onSubmit={handleSubmit}>
                {/* <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div> */}
                <div>
                    <input
                    className='edit-form-title'
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
                    <button className="edit-form-button-save" type='submit'>Save</button>
                </div>
                </form>
                <div className='edit-delete-button-container'>
                    <button className="edit-delete-button" onClick={() => deleteNote(noteId)}>DELETE NOTE</button>
                </div>
            </div>
        </>
      );
}

export default NotebookNoteInfoEdit;
