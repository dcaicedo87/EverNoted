const GET_USER_NOTEBOOKS = "notebooks/all"


const getAllNotebooks = notebooks => {
    return {
        type: GET_USER_NOTEBOOKS,
        notebooks
    }
}

//thunks

export const getAllUserNotebooksThunk = userId => async dispatch => {
    const res = await fetch(`/api/notebooks/${userId}/all`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllNotebooks(data))
        return data;
    }
}

//reducer

const initialState = {};

const notebookReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_USER_NOTEBOOKS:
      newState = {};
      action.notebooks.notebooks.forEach(
        notebook => (newState[notebook.id] = notebook)
      );
      return newState;
    default:
      return state;
  }
};

export default notebookReducer;
