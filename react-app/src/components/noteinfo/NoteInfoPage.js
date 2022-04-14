import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const NoteInfoPage = () => {

    let note_id = useParams().noteId;
    // console.log("NOTE ID", note_id)

    const notesObj = useSelector(state => state.notes)
    // console.log(`NOTES OBJ`, notesObj)

    const currentNote = notesObj[note_id]
    // console.log(`Current Note:`, currentNote)

    // const notesArr = Object.values(notesObj)
    // console.log(`notes ARR:`, notesArr)

    return (
        <div>
            <label>Title</label>
            <p>{currentNote?.title}</p>
            <label>Updated at</label>
            <p>{currentNote?.updated_at}</p>
            <label>Content</label>
            <p>{currentNote?.content}</p>
        </div>
    )
}

export default NoteInfoPage;
