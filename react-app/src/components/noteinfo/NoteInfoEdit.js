import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const NoteInfoEdit = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    console.log(`USER ID:`, userId) // console for user id

    const [title, setTitle] = useState();
    const [content, setContent] = useState();


    let note_id = useParams().noteId;
    // console.log("NOTE ID", note_id)


    const notesObj = useSelector(state => state.notes)
    console.log(`NOTES OBJ****`, notesObj)

    const currentNote = notesObj[note_id]
    console.log(`Current Note:`, currentNote)


    return (
        <>
            <div>
                <form >
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
                    value={currentNote?.title}
                    //   onChange={}
                    />
                </div>
                <div>
                    <textarea
                    className="edit-form-content"
                    name='content'
                    placeholder='Content'
                    value={currentNote?.content}
                    //   onChange={updatePassword}
                    />
                </div>
                <div>
                    <input
                    name='user_id'
                    type='hidden'
                    value={userId}
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
