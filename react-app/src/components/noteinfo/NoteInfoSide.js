import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'

import { getAllUserNotesThunk } from '../../store/note';


const NoteInfoSide = () => {
    const dispatch = useDispatch();

    // const [notes, setNotes] = useState();

    // const [sum, setSum] = useState(-1)


    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    // console.log(userId) // console log for user id

    const notebooks = sessionUser.notebooks;
    // console.log(`***********NOTEBOOKS :`, notebooks)


    const notesArr = useSelector(state => Object.values(state.notes))

    // console.log(`NOTES ARRAY: `, notesArr)
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
                    <p className="index-note-header-title">All Notes</p>
                </div>
                <div className='index-note-count'>{`${notesArr.length} Notes`}</div>
            </div>
            <div className='index-note-item-container'>
            {notesArr.map((note, idx) => (
                <ul className="item-container" key={idx}>
                    {/* <div>{notebooks[note.notebook_id] ? <NavLink className="item-container-notebooks-link" to= {`/notebooks/${note.notebook_id}/notes/${note.id}`}>{`Notebook: ${notebooks[note.notebook_id].title}`}</NavLink> : null}</div> */}
                    <a href= {`/notes/${note.id}`} className="item-container-info">
                        <li>

                            <div className="item-container-info-title">{note.title}</div>
                            {/* <div className="item-container-info-notebooks">{notebooks[note.notebook_id] ? notebooks[note.notebook_id].title : null}</div> */}
                            <div className="item-container-info-notebooks">{notebooks[note.notebook_id] ? `Notebook: ${notebooks[note.notebook_id].title}` : null}</div>
                            <div className="item-container-info-content">{note.content}</div>
                            <div className="item-container-info-update">{note.updated_at.substring(0, 16)}</div>
                        </li>
                    </a>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default NoteInfoSide;
