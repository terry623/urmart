import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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

  const openLink = videoId => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="videos">
      {currentResults.map(({ id, snippet }) => (
        <Card
          key={id.videoId}
          className={classes.root}
          onClick={() => openLink(id.videoId)}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={snippet.thumbnails.medium.url}
            />
            <CardContent>
              <h3>{snippet.title}</h3>
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
