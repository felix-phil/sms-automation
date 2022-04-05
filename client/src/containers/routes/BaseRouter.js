import React from 'react'
import AuthRoutes from './AuthRoutes'
import UnprotectedRoutes from './UnprotectedRoutes'

const BaseRouter = () => {
    return (
        <React.Fragment>
            <AuthRoutes />
            <UnprotectedRoutes />
        </React.Fragment>
    )
}

export default BaseRouter
