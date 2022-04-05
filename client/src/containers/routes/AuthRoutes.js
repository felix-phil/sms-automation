import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Home from '../Home'

const AuthRoutes = () => {
  const isAuth = useSelector(state => state.auth.isAuth)
  
  if(!isAuth){
    return <Redirect to="/login" />
  }
    return (
        <React.Fragment>
          <Route path="/" exact component={Home} />
        </React.Fragment>
    )
}

export default AuthRoutes
