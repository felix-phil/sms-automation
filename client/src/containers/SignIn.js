import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from "formik"
import * as authActions from "../store/actions/auth";
import * as messageActions from "../store/actions/message";
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const initialState = {
    email: "",
    password: ""
  }
  const validate = (values, prop) => {
		const errors = {};
		if (!values.email) {
			errors.email = "Email is required"
		} else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
			errors.email = "Invalid Email Address"
		}
    if(!values.password){
      errors.password = "Password is required"
    }
    if(values.password.length < 6){
      errors.password = "Invalid Password"
    }
		
		return errors
	}
  const onSubmitHandler = async (values) => {
    try{
      await dispatch(authActions.login(values.email, values.password))
    }catch(err){
      console.log(err.message)
      dispatch(messageActions.setMessage(err.message, "error"))
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialState}
          onSubmit={onSubmitHandler}
          validate = {validate}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
                error = {errors.email ? true : false}
                value={values.email}
                helperText={touched.email && errors.email ? errors.email : null}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
                error = {errors.password ? true : false}
                value={values.password}
                helperText={touched.password && errors.password ? errors.password : null}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={errors.email || errors.password ? true : false}

              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
export default SignIn