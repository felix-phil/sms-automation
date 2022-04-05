import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const UnprotectedRoutes = () => {
  const isAuth = useSelector(state => state.auth.isAuth)

    if(isAuth){
        return <Redirect to="/" />
      }
    return (
        <React.Fragment>
                <Route path="/login" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
        </React.Fragment>
    )
}

export default UnprotectedRoutes
