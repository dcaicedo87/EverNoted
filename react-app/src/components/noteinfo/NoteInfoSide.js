import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { getAllUserNotesThunk } from '../../store/note';


const NoteInfoSide = () => {
    const dispatch = useDispatch();

    // const [notes, setNotes] = useState();


    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    console.log(userId) // console log for user id

    // const notesObj = useSelector(state => state.notes);
    // console.log(notesObj)

    const notesArr = useSelector(state => Object.values(state.notes))
    console.log(notesArr)



    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch]);



    return (
        <div className="index-note">
            <div>
                <h1>NOTES</h1>
            </div>
            <div>
            {notesArr.map((note) => (
                <div className="note-container" key={note.id}>
                    <div>{note.title}</div>
                    <div>{note.content}</div>
                    <div>{note.updated_at}</div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default NoteInfoSide;
