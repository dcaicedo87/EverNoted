import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Modal from 'react-modal'; //for modal
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { getAllUserNotesThunk } from '../../store/note';
import { getAllUserNotebooksThunk } from '../../store/notebook';

import NotebookEdit from './EditNotebook';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')

const NotebookInfoSide = () => {
    const dispatch = useDispatch();

    let notebookId = useParams().notebookId;
    let notebookIdNum = parseInt(notebookId)
    // console.log(`NOTEBOOK ID Num: `, notebookId)

    const notebookObject = useSelector(state => state.notebooks)
    // console.log(`0-0-0-0-0-0-0-0 NotebookObj`, notebookObject)

    const currentNotebook = notebookObject[notebookId]
    // console.log(`*&*&*&*&&**&*&*&&*&*currentNotebook`, currentNotebook)

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    // console.log(userId) // console log for user id

    const notesArr = useSelector(state => Object.values(state.notes))
    // console.log(`()()()()()()()Notes Arr `,notesArr)

    let filteredNotesArr = []

    for (let i = 0; i < notesArr.length; i++) {
        let element = notesArr[i];
        // if (element.notebook_id === null) continue;
        if (element.notebook_id === notebookIdNum) {
            filteredNotesArr.push(element)
        }
    }

    //auth

    let actualUserBool;
    if (currentNotebook?.user_id === sessionUser.id) {
        actualUserBool = true;
    } else {
        actualUserBool = false;
    }

    // console.log(`ACTUAL USER BOOLEAN: `, actualUserBool)

    //modal setup
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false)
    }




    useEffect(() => {
        dispatch(getAllUserNotesThunk(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(getAllUserNotebooksThunk(userId))
    }, [dispatch, userId]);


    return (
        <>
            { actualUserBool ?
                <div className="index-note">
                    <div className="index-note-header-container">
                        <div className="index-note-header">
                            <p>{currentNotebook?.title}</p>
                        </div>
                        <button className='edit-notebook-title' onClick={openModal}>Edit Notebook Name</button>
                        <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h2>Edit Notebook Title</h2>
                                <NotebookEdit />
                        </Modal>
                        <div className='index-note-count'>{`${filteredNotesArr.length} Notes`}</div>
                    </div>
                    <div className='index-note-item-container'>
                    {filteredNotesArr.map((note, idx) => (
                        <div className='item-container-clickable' key={idx}>
                            <ul className="item-container">
                                <a href= {`/notebooks/${notebookIdNum}/notes/${note.id}`} className="item-container-info">
                                    <li>
                                        <div className="item-container-info-title">{note.title}</div>
                                        <div className="item-container-info-content">{note.content}</div>
                                        <div className="item-container-info-update">{note.updated_at.substring(0, 16)}</div>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    ))}
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default NotebookInfoSide;
