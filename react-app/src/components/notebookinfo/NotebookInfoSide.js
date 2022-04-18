import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { getAllUserNotesThunk } from '../../store/note';
import { getAllUserNotebooksThunk } from '../../store/notebook';


const NotebookInfoSide = () => {
    const dispatch = useDispatch();

    // let notebookId = useParams().notebookId;
    let { notebookId } = useParams();
    console.log(`####################notebookId`, notebookId)

    const notebookObject = useSelector(state => state.notebooks)
    // console.log(`0-0-0-0-0-0-0-0 NotebookObj`, notebookObject)

    const currentNotebook = notebookObject[notebookId]
    // console.log(`*&*&*&*&&**&*&*&&*&*currentNotebook`, currentNotebook)


    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    // console.log(userId) // console log for user id

    // const notebooksArr = useSelector(state => Object.values(state.notebooks))
    // console.log(`***********notebooksArr `, notebooksArr)

    const notesArr = useSelector(state => Object.values(state.notes))
    console.log(`()()()()()()()Notes Arr `,notesArr)

    let filteredNotesArr = []

    for (let i = 0; i < notesArr.length; i++) {
        let element = notesArr[i];
        if (element.notebook_id == notebookId) {
            filteredNotesArr.push(element)
        }
    }
    // console.log(`{{{{{{{ filteredNotesArr }}}}}}}`, filteredNotesArr)

    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId]);

    //change to grab particular notebook from id
    useEffect(() => {
        dispatch(getAllUserNotebooksThunk(userId))
    }, [dispatch, userId]);


    return (
        <div className="index-note">
            <div className="index-note-header-container">
                <div className="index-note-header">
                    <h1>{currentNotebook?.title}</h1>
                </div>
                <div className='index-note-count'>{`${notesArr.length} Notes`}</div>
            </div>
            <div className='index-note-item-container'>
            {filteredNotesArr.map((note, idx) => (
                <ul className="item-container" key={idx}>
                    <a href= {`/notes/${note.id}`} className="item-container-info">
                        <li>
                            <div className="item-container-info-title">{note.title}</div>
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

export default NotebookInfoSide;
