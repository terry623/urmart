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

const Home = ({
  searchResultsLoading,
  allSearchResults,
  getSearchResults: getSearchResultsFromProps,
}) => {
  const classes = useStyles();
  const [currentResults, setCurrentResults] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e, v) => {
    setCurrentPage(v);
  };

  const handleKeywordChange = e => {
    setCurrentKeyword(e.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const fetchResultsAndSet = async (keyword, page = 1, pageToken = '') => {
    const results = await getSearchResultsFromProps({
      keyword,
      page,
      pageToken,
    });
    if (results) setCurrentResults(results.items);
  };

  const fetchSearchResultsByKeyword = async e => {
    if (e.key === 'Enter') {
      scrollToTop();

      if (currentKeyword === '') {
        setCurrentResults([]);
        return;
      }

      setCurrentPage(1);

      if (allSearchResults[currentKeyword]) {
        const page = allSearchResults[currentKeyword][1];
        if (!page) return;
        if (!page.pageToken) {
          setCurrentResults(page.items);
          return;
        }
      }

      fetchResultsAndSet(currentKeyword);
    }
  };

  useEffect(() => {
    async function fetchSearchResults() {
      if (currentKeyword === '') return;
      scrollToTop();

      let targetPageToken = '';
      if (allSearchResults[currentKeyword]) {
        const page = allSearchResults[currentKeyword][currentPage];
        if (!page) return;
        if (!page.pageToken) {
          setCurrentResults(page.items);
          return;
        }
        targetPageToken = page.pageToken;
      }

      fetchResultsAndSet(currentKeyword, currentPage, targetPageToken);
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
              autoFocus
              value={currentKeyword}
              onChange={handleKeywordChange}
              onKeyPress={fetchSearchResultsByKeyword}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
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
          {currentResults.length > 0 ? (
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
          ) : (
            <h3 className="description">輸入關鍵字，按下 Enter 即可查詢 😎</h3>
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
