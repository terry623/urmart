import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// import VideoCard from './VideoCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 'auto',
  },
  media: {
    width: 300,
    height: 140,
  },
});

const Videos = ({ currentResults }) => {
  const classes = useStyles();

  return (
    <div className="videos">
      {currentResults.map(result => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image="" />
            <CardContent>
              <h2>{result}</h2>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

Videos.propTypes = {
  currentResults: PropTypes.array.isRequired,
};

export default Videos;
