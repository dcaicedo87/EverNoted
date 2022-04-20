import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteNoteThunk, editNoteThunk } from '../../store/note';
import { getAllUserNotesThunk } from '../../store/note';


const NoteInfoEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // console.log(`SESSION USER:`, sessionUser)

    // const sessionNotes = useSelector((state) => state.notes)

    const { noteId } = useParams();
    // console.log(`NOTE ID:`, noteId)

    const [title, setTitle] = useState(sessionUser.notes[noteId]?.title);
    const [content, setContent] = useState(sessionUser.notes[noteId]?.content);
    const [errors, setErrors] = useState([]);

    const userId = sessionUser.id;
    // console.log(`USER ID:`, userId) // console for user id

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
        setErrors([])

        const newErrors = [];

        if (updatedNote.title.length < 1) {
          newErrors.push("Title must be 1 character or more.");
        }

        if (newErrors.length > 0) {
          setErrors(newErrors);
          return;
        }

        dispatch(editNoteThunk(noteId, updatedNote))
        history.push(`/notes/${noteId}`)
    };

    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId]);

    return (
        <>
            <div className='edit-form-container'>
                <form onSubmit={handleSubmit}>
                <div className='edit-form-errors'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                    className='edit-form-title'
                    name='title'
                    type='text'
                    placeholder='*Title'
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

export default NoteInfoEdit;
