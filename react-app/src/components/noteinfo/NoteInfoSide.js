import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { getAllUserNotesThunk } from '../../store/note';


const NoteInfoSide = () => {
    const dispatch = useDispatch();

    // const [notes, setNotes] = useState();

    // const [sum, setSum] = useState(-1)


    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    // console.log(userId) // console log for user id


    const notesArr = useSelector(state => Object.values(state.notes))

    // write helper function to order by correct.

    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId]);

    //function to sort updated_at
    // const sortedNotesArr = notesArr.sort();
    // console.log(sortedNotesArr);

    return (
        <div className="index-note">
            <div className="index-note-header-container">
                <div className="index-note-header">
                    <h1>NOTES</h1>
                </div>
                <div className='index-note-count'>{`${notesArr.length} Notes`}</div>
            </div>
            <div className='index-note-item-container'>
            {notesArr.map((note, idx) => (
                <ul className="item-container" key={idx}>
                    <a href= {`/notes/${note.id}`} className="item-container-info">
                        <li>
                            <div className="item-container-info-title">{note.title}</div>
                            <div className="item-container-info-content">{note.content}</div>
                            <div className="item-container-info-update">{note.updated_at}</div>
                        </li>
                    </a>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default NoteInfoSide;
