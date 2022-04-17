import React from 'react';
import { useSelector } from 'react-redux';
import './NotebookIndex.css'



const NotebookIndex = () => {
    const sessionUser = useSelector(state => state.session.user);

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
                    <ul className="index-list-values-container">
                        <li className="index-list-values">
                            <div className="index-list-values-title">First Notebook</div>
                            <div className="index-list-values-created">Demo</div>
                            <div className="index-list-values-updated">Updated</div>
                            <div className="index-list-values-btns-container">
                                <button className="notebooks-edit">Edit Name</button>
                                <button className="notebooks-delete">Delete</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NotebookIndex;
