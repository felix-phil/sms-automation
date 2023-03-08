import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const { fullname, email } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Title>Total SMS</Title>
      <Typography component="p" variant="h4">
        {props.smsCount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        total SMS you have sent
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {fullname || email}
        </Link>
      </div>
    </React.Fragment>
  );
}
