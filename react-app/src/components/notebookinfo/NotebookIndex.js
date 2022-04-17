import React from 'react';
import { useSelector } from 'react-redux';
import './NotebookIndex.css'



const NotebookIndex = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="notebook-index-container">
            <div className="notebook-index-header">
                <h1>Notebooks</h1>
                <div className="notebooks-index-notebooks-info">
                    <h2># notebooks</h2>
                    <button className="notebooks-index-notebooks-button">
                        New Notebook
                    </button>
                </div>
            </div>
            <div className="notebooks-index-list">
                <ul>
                    <li>
                        <div className="index-list-title"> TITLE</div>
                        <div className="index-list-created">CREATED BY</div>
                        <div className="index-list-updated">UPDATED</div>
                        <div className="index-list-actions">ACTIONS</div>
                    </li>
                    <li>test2</li>
                    <li>test3</li>
                    <li>test4</li>
                    <li>test5</li>
                    <li>test6</li>
                </ul>
            </div>
        </div>
    )
}

export default NotebookIndex;
