import {
  START_LOADING_SEARCH_RESULTS,
  END_LOADING_SEARCH_RESULTS,
  SET_SEARCH_RESULTS,
} from '../actionTypes';

const initialState = {
  allSearchResults: {},
  searchResultsLoading: false,
};

const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_SEARCH_RESULTS:
      return {
        ...state,
        searchResultsLoading: true,
      };
    case END_LOADING_SEARCH_RESULTS:
      return {
        ...state,
        searchResultsLoading: false,
      };
    case SET_SEARCH_RESULTS: {
      const { results } = action.payload;
      // console.log(results);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default searchResults;
