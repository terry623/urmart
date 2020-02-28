import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';

import { getSearchResults } from '../states/actions/searchResults';

import Videos from './Videos';

import './Home.scss';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
  progress: {
    textAlign: 'center',
    width: '100%',
    marginTop: 100,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
}));

const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
};

const Home = ({
  searchResultsLoading,
  allSearchResults,
  getSearchResults: getSearchResultsFromProps,
}) => {
  const classes = useStyles();
  const [currentResults, setCurrentResults] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchBarId = 'search-bar';

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleKeywordChange = () => {
    const { value } = document.getElementById(searchBarId);
    setCurrentKeyword(value);
  };

  useEffect(() => {
    async function fetchSearchResults() {
      const { items } = await getSearchResultsFromProps({
        keyword: currentKeyword,
        page: 1,
        pageToken: '',
      });
      setCurrentPage(1);
      setCurrentResults(items);
    }

    fetchSearchResults();
  }, [currentKeyword]);

  useEffect(() => {
    async function fetchSearchResults() {
      let targetPageToken = '';
      if (allSearchResults[currentKeyword]) {
        const page = allSearchResults[currentKeyword][currentPage];
        if (!page.pageToken) {
          setCurrentResults(page.items);
          return;
        }
        targetPageToken = page.pageToken;
      }
      const { items } = await getSearchResultsFromProps({
        keyword: currentKeyword,
        page: currentPage,
        pageToken: targetPageToken,
      });
      setCurrentResults(items);
    }

    fetchSearchResults();
  }, [currentPage]);

  return (
    <div className="Home">
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            想找什麼影片？
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              id={searchBarId}
              autoFocus
              onChange={debounce(e => handleKeywordChange(e), 1000)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      {searchResultsLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          {currentResults && (
            <Fragment>
              <Videos currentResults={currentResults} />
              <Pagination
                count={3}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                className={classes.pagination}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

Home.propTypes = {
  allSearchResults: PropTypes.object.isRequired,
  getSearchResults: PropTypes.func.isRequired,
  searchResultsLoading: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    ...state.searchResults,
  }),
  { getSearchResults }
)(Home);
