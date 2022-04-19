import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotebookThunk, getAllUserNotebooksThunk } from '../../store/notebook';
import Modal from 'react-modal'; //for modal
import CreateNotebook from './CreateNotebook';
import './NotebookIndex.css';
import { NavLink } from 'react-router-dom';


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

const NotebookIndex = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    // console.log(`Session User Name:`, sessionUser)

    const notebooksArr = useSelector(state => Object.values(state.notebooks))
    // console.log(`NOTEBOOKS ARRAY:`, notebooksArr)

    //modal setup
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false)
    }

    // console.log(`NOTEBOOKS!!!!!`, notebooksArr)

    const deleteNotebook = id => {
        dispatch(deleteNotebookThunk(id));
    };

    useEffect(() => {
        dispatch(getAllUserNotebooksThunk(userId))
    }, [dispatch, userId]);


    return (
        <div className="notebook-index-container">
            <div className="notebook-index-header-container">
                <p>Notebooks</p>
                <div className="notebooks-index-notebooks-info">
                    <h3>{`${notebooksArr.length} notebooks`}</h3>
                    <button onClick={openModal} className="notebooks-index-notebooks-button">
                        New Notebook
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2>Create a Notebook</h2>
                        <CreateNotebook />
                    </Modal>
                </div>
            </div>
            <div className="notebooks-index-list-contanier">
                <div>
                    <ul className="index-list-labels-container">
                        <li className='index-list-labels'>
                            <div className="index-list-labels-title">TITLE</div>
                            <div className="index-list-labels-created">CREATED BY</div>
                            <div className="index-list-labels-updated">UPDATED</div>
                            <div className="index-list-labels-actions">ACTION</div>
                        </li>
                    </ul>
                </div>
                <div>
                    {notebooksArr.map((notebook, idx) => (
                        <ul className="index-list-values-container" key={idx}>
                            <li className="index-list-values">
                                <NavLink to={`/notebooks/${notebook.id}`}>
                                    <div className="index-list-values-title">{notebook.title}</div>
                                </NavLink>
                                <div className="index-list-values-created">{sessionUser.username}</div>
                                <div className="index-list-values-updated">{notebook.updated_at.substring(0, 16)}</div>
                                <div className="index-list-values-btns-container">
                                    {/* <button className="notebooks-edit">Edit Name</button> */}
                                    <button className="notebooks-delete" onClick={() => deleteNotebook(notebook.id)}>Delete</button>
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NotebookIndex;
