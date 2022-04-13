const GET_ALL_NOTES = "notes/all"


const getAllNotes = notes => {
    return {
        type: GET_ALL_NOTES,
        notes,
    };
};


//thunks

export const getAllUserNotesThunk = id => async dispatch => {
    const res = await fetch(`/api/notes/${id}/all`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllNotes(data))
        return data;
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
