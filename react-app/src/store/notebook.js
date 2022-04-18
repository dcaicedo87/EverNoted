const GET_USER_NOTEBOOKS = "notebooks/all"
const CREATE_NOTEBOOK = "notebook/create"
const EDIT_NOTEBOOK = "notebook/edit"
const DELETE_NOTEBOOK = "notebook/delete"


const getAllNotebooks = notebooks => {
    return {
        type: GET_USER_NOTEBOOKS,
        notebooks
    }
}

const createNotebook = notebook => {
  return {
    type: CREATE_NOTEBOOK,
    notebook
  }
}

const editNotebook = notebook => {
  return {
    type: EDIT_NOTEBOOK,
    notebook
  }
}

const deleteNotebook = notebook => {
  return {
    type: DELETE_NOTEBOOK,
    notebook
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

export const createNotebookThunk = (notebook) => async dispatch => {
  console.log(`RIGHT BEFORE THUNK`)
  const res = await fetch(`/api/notebooks/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(notebook)
  })

  if (res.ok) {
      const notebook = await res.json();
      dispatch(createNotebook(notebook));
      return notebook;
  }
}

export const editNotebookThunk = (notebookId, userId, title) => async dispatch => {
  let res = await fetch(`api/notebooks/${notebookId}/users/${userId}`, {
    method: 'PUT',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({title})
  });

  if (res.ok) {
    const notebook = await res.json();
    dispatch(editNotebook(notebook))
  }
}

export const deleteNotebookThunk = (notebookId) => async dispatch => {
  let res = await fetch(`api/notebooks/${notebookId}/delete`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const notebook = await res.json();
    dispatch(deleteNotebook(notebook))
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
    case CREATE_NOTEBOOK:
      // console.log(`&&&&&&&&&&&`, action.notebook)
      newState[action.notebook.id] = action.notebook;
       return newState;
    case DELETE_NOTEBOOK:
      delete newState[action.notebook.id];
      return newState;
    default:
      return state;
  }
};

export default notebookReducer;
