const GET_ALL_NOTES = "notes/all"
const CREATE_NOTE = "note/create"
const EDIT_NOTE = "note/edit"
const DELETE_NOTE = "note/delete"
// const GET_NOTEBOOK_NOTES = "notebookNotes/all"


const getAllNotes = notes => {
    return {
        type: GET_ALL_NOTES,
        notes,
    };
};

const createNote = note => {
    return {
        type: CREATE_NOTE,
        note,
    }
}

const editNote = note => {
    return {
        type: EDIT_NOTE,
        note
    }
}

const deleteNote = noteId => {
    return {
        type: DELETE_NOTE,
        noteId,
    }
}

// const getNotebookNotes = notes => {
//     return {
//         type: GET_NOTEBOOK_NOTES,
//         notes
//     }
// }


//thunks

export const getAllUserNotesThunk = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}/all`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllNotes(data))
        return data;
    }
}

// export const getNotebookNotesThunk = notebookId => async dispatch => {
//     const res = await fetch(`/api/notebooks/${notebookId}/all`)

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(getNotebookNotes(data))
//         return data;
//     }
// }

export const getSingleUserNoteThunk = (userId, noteId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/notes/${noteId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllNotes(data))
        return data;
    }
}

export const createNoteThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const note = await res.json();
        dispatch(createNote(note));
        return note;
    }
}

export const editNoteThunk = (noteId, note) => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const updatedNote = await res.json();
    dispatch(editNote(updatedNote));
    return updatedNote;
};

export const deleteNoteThunk = noteId => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      const deletedNoteId = await res.json();
      dispatch(deleteNote(deletedNoteId));
      return deletedNoteId;
    }
};

//reducer
const initialState = {};

const noteReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_NOTES:
      newState = {};
      action.notes.notes.forEach(
        note => (newState[note.id] = note)
      );
      return newState;
    // case GET_NOTEBOOK_NOTES:
    //   newState = {};
    //   action.notes.notes.forEach(
    //     note => (newState[note.id] = note)
    //   );
    //   return newState;
    case CREATE_NOTE:
        newState[action.note.id] = action.note;
        return newState;
    case EDIT_NOTE:
        newState[action.note.id] = action.note;
        return newState;
    case DELETE_NOTE:
        delete newState[action.noteId];
        return newState;
    default:
      return state;
  }
};

export default noteReducer;
