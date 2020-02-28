import {
  START_LOADING_SEARCH_RESULTS,
  END_LOADING_SEARCH_RESULTS,
  SET_SEARCH_RESULTS,
} from '../actionTypes';
import { getVideos as getVideosFromApi } from '../../api';

const startLoadingSearchResults = () => ({
  type: START_LOADING_SEARCH_RESULTS,
});

const endLoadingSearchResults = () => ({
  type: END_LOADING_SEARCH_RESULTS,
});

const setSearchResults = ({ keyword, page, results }) => ({
  type: SET_SEARCH_RESULTS,
  payload: { keyword, page, results },
});

export function getSearchResults({ keyword, page, pageToken }) {
  return dispatch => {
    dispatch(startLoadingSearchResults());

    return getVideosFromApi({ keyword, pageToken })
      .then(results => {
        dispatch(setSearchResults({ keyword, page, results }));
        dispatch(endLoadingSearchResults());
        return results;
      })
      .catch(err => {
        console.error('Error get search results', err);
        dispatch(endLoadingSearchResults());
        return [];
      });
  };
}
