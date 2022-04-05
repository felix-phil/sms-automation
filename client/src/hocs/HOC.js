import React, { useEffect, useCallback } from 'react'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from "react-redux"
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core"
import * as messageActions from "../store/actions/message"
import * as authActions from "../store/actions/auth"

import { Alert } from "@material-ui/lab"
const HOC = (props) => {
    const dispatch = useDispatch()

    const tryAutoLogin = useCallback(
        () => {
            try {
                const authData = localStorage.getItem("authData")
                if (!authData) {
                    return
                }
                const { token, email, expiryDate, fullname, userId } = JSON.parse(authData)
                const expiryTime = new Date(expiryDate)
                if (Date.now() >= expiryTime.getTime() || !token || !email || !userId) {
                    return
                }
                const remainingTime = expiryTime.getTime() - Date.now()
                dispatch(authActions.authenticate(token, userId, fullname, email, remainingTime))
            } catch (error) {
                dispatch(messageActions.setMessage("Something went wrong", "error"))
            }
        },
        [dispatch],
    )
    // const tryAutoLogin = 
    useEffect(() => {
        tryAutoLogin()
    }, [tryAutoLogin])
    const isLoading = useSelector(state => state.load.loading)
    const { show: showMessage, message, type: messageType } = useSelector(state => state.message)

    return (
        <>
            <Snackbar transitionDuration={200} onClose={() => {
                dispatch(messageActions.clearMessage())
            }}
                open={showMessage}
                onClick={() => {
                    dispatch(messageActions.clearMessage())
                }}
                autoHideDuration={5000}
                anchorOrigin={{ horizontal: "center", vertical: messageType === "error" ? "top" : "bottom" }}>
                <Alert onClose={() => {
                    dispatch(messageActions.clearMessage())

                }} severity={messageType || "info"}>
                    {message}
                </Alert>
            </Snackbar>
            <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
                <CircularProgress />
            </Backdrop>
            {props.children}
            <Footer />
        </>
    )
}

export default HOC
