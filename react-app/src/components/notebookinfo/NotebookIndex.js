import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserNotebooksThunk } from '../../store/notebook';
import './NotebookIndex.css'



const NotebookIndex = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    console.log(`Session User Name:`, sessionUser)

    const notebooksArr = useSelector(state => Object.values(state.notebooks))
    console.log(`NOTEBOOKS ARRAY:`, notebooksArr)


    useEffect(() => {
        dispatch(getAllUserNotebooksThunk(userId))
    }, [dispatch, userId]);


    return (
        <div className="notebook-index-container">
            <div className="notebook-index-header-container">
                <p>Notebooks</p>
                <div className="notebooks-index-notebooks-info">
                    <h2># notebooks</h2>
                    <button className="notebooks-index-notebooks-button">
                        New Notebook
                    </button>
                </div>
            </div>
            <div className="notebooks-index-list-contanier">
                <div>
                    <ul className="index-list-labels-container">
                        <li className='index-list-labels'>
                            <div className="index-list-labels-title"> TITLE</div>
                            <div className="index-list-labels-created">CREATED BY</div>
                            <div className="index-list-labels-updated">UPDATED</div>
                            <div className="index-list-labels-actions">ACTIONS</div>
                        </li>
                    </ul>
                </div>
                <div>
                    {notebooksArr.map((notebook, idx) => (
                        <ul className="index-list-values-container" key={idx}>
                            <li className="index-list-values">
                                <div className="index-list-values-title">{notebook.title}</div>
                                <div className="index-list-values-created">{sessionUser.username}</div>
                                <div className="index-list-values-updated">{notebook.updated_at}</div>
                                <div className="index-list-values-btns-container">
                                    <button className="notebooks-edit">Edit Name</button>
                                    <button className="notebooks-delete">Delete</button>
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
