import * as actionType from '../actions/types';

const initialState = {
  fileExtension: '',
};

const editFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FILE_EXTENSION:
      return { ...state, fileExtension: action.payload };

    case actionType.EDIT_USER_INFO:
      return { ...state };
    default:
      return { ...state };
  }
};

export default editFormReducer;
