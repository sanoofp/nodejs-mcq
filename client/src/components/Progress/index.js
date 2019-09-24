import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    margin: "16px auto"
  },
  top: {
    color: blue.A100,
  },
  bottom: {
    color: blue.A700,
    position: 'absolute',
    left: "20%",
  },
});

function PercentageProgress(props) {
  const {percentage} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="static"
        value={100}
        className={classes.top}
        size={130}
        thickness={9}
        {...props}
        />
      <CircularProgress
        variant="static"
        value={percentage}
        className={classes.bottom}
        size={130}
        thickness={9}
        {...props}
      />
    </div>
  );
}

export default PercentageProgress;
