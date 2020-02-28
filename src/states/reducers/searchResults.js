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
      const { keyword, page, results } = action.payload;

      const newAllSearchResults = { ...state.allSearchResults };
      if (!newAllSearchResults[keyword]) {
        newAllSearchResults[keyword] = [];
      }

      if (results) {
        newAllSearchResults[keyword][page] = results;
        newAllSearchResults[keyword][page + 1] = {
          pageToken: results.nextPageToken,
        };
      }

      return {
        ...state,
        allSearchResults: newAllSearchResults,
      };
    }
    default:
      return state;
  }
};

export default searchResults;
