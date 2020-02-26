import {
  START_LOADING_SEARCH_RESULTS,
  END_LOADING_SEARCH_RESULTS,
  SET_SEARCH_RESULTS,
} from '../actionTypes';
import { getVideosByKeyword as getVideosByKeywordFromApi } from '../../api';

const startLoadingSearchResults = () => ({
  type: START_LOADING_SEARCH_RESULTS,
});

const endLoadingSearchResults = () => ({
  type: END_LOADING_SEARCH_RESULTS,
});

const setSearchResults = results => ({
  type: SET_SEARCH_RESULTS,
  payload: { results },
});

export function getSearchResults(keyword, page) {
  return dispatch => {
    dispatch(startLoadingSearchResults());

    return getVideosByKeywordFromApi(keyword, page)
      .then(results => {
        dispatch(setSearchResults(results));
        dispatch(endLoadingSearchResults());
        return results;
      })
      .catch(err => {
        console.error('Error get search results', err);
        dispatch(endLoadingSearchResults());
        // FIXME: 要拿掉，改為 []
        return [
          'temp1',
          'temp2',
          'temp3',
          'temp4',
          'temp5',
          'temp6',
          'temp7',
          'temp8',
        ];
      });
  };
}
