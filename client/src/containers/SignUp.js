import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Formik } from "formik"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const initialState = {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const validate = (values, prop) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
            errors.email = "Invalid Email Address"
        }
        if (!values.fullname) {
            errors.fullname = "Fullname is required!"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        if (values.password.length < 8) {
            errors.password = "Minimum of 8 characters password is required!"
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords must be equal"
        }
        return errors
    }
    const onSubmitHandler = async (values) => {
        try {
            await dispatch(authActions.register(values.fullname, values.email, values.password))
            history.push("/login")
        } catch (err) {
            dispatch(messageActions.setMessage(err.message, "error"))
            console.log(err)
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
                    Sign up
                </Typography>
                <Formik
                    initialValues={initialState}
                    onSubmit={onSubmitHandler}
                    validate={validate}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur('fullname')}
                                        onChange={handleChange('fullname')}
                                        error={errors.fullname ? true : false}
                                        value={values.fullname}
                                        helperText={touched.fullname && errors.fullname ? errors.fullname : null}
                                        autoComplete="fullname"
                                        name="fullname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="fullname"
                                        label="Full Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur('email')}
                                        onChange={handleChange('email')}
                                        error={errors.email ? true : false}
                                        value={values.email}
                                        helperText={touched.email && errors.email ? errors.email : null}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur('password')}
                                        onChange={handleChange('password')}
                                        error={errors.password ? true : false}
                                        value={values.password}
                                        helperText={touched.password && errors.password ? errors.password : null}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur('confirmPassword')}
                                        onChange={handleChange('confirmPassword')}
                                        error={errors.confirmPassword ? true : false}
                                        value={values.confirmPassword}
                                        helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={errors.email || errors.fullname || errors.password || errors.confirmPassword ? true : false}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
            {/* <Box mt={5}>
        <Copyright />
      </Box> */}
        </Container>
    );
}
export default SignUp