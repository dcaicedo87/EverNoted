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


    const notesArr = useSelector(state => Object.values(state.notes))
    console.log(notesArr) // console for notes array

    let sum = 0;

    for (let i = 0; i < notesArr.length; i++) {
        sum += 1
    }

    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId]);



    return (
        <div className="index-note">
            <div>
                <h1>NOTES</h1>
            </div>
            <div>{`${sum} Notes`}</div>
            <div>
            {notesArr.map((note) => (
                <ul className="item-container" key={note.id}>
                    <a href= {`/notes/${note.id}`}>
                        <li>
                            <div>{note.title}</div>
                            <div>{note.content}</div>
                            <div>{note.updated_at}</div>
                        </li>
                    </a>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default NoteInfoSide;
