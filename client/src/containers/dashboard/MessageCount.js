import React, { useCallback, useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useDispatch, useSelector } from "react-redux";
import { allMessages } from '../../constants/endpoints';
import * as loadAction from "../../store/actions/loading";
import * as messageAction from "../../store/actions/message";

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
  const { fullname, email, token } = useSelector(state => state.auth)
  const [smsCount, setsmsCount] = useState(0)
  const dispatch = useDispatch()

  const fetchSMSCount = useCallback(
    async () => {
      try {
        dispatch(loadAction.startLoading())
        const res = await fetch(allMessages, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (!res.ok) {
          dispatch(loadAction.stopLoading())
          throw new Error("Something went worng fetching SMS")
        }
        dispatch(loadAction.stopLoading())
        const resData = await res.json()
        setsmsCount(resData.userMessageCount)
      } catch (error) {
        dispatch(loadAction.stopLoading())
        dispatch(messageAction.setMessage(error.message, "error"))
      }
    },
    [setsmsCount, dispatch, token],
  )
  useEffect(() => {
    fetchSMSCount()
  }, [fetchSMSCount, props.refresh])
  return (
    <React.Fragment>
      <Title>Total SMS</Title>
      <Typography component="p" variant="h4">
        {smsCount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        total SMS you have sent
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault} >
          {fullname || email}
        </Link>
      </div>
    </React.Fragment>
  );
}
