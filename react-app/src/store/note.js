const GET_ALL_NOTES = "notes/all"
const CREATE_NOTE = "note/create"


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


//thunks

export const getAllUserNotesThunk = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}/all`)

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
    default:
      return state;
  }
};

export default noteReducer;
