// import axios from "axios"
import { loginURL, registerURL, sendMessageUrl } from "../../constants/endpoints"
import * as loadingAction from "./loading"
import * as messagesAction from "./message"
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS"
export const AUTHENTICATE_FAIL = "AUTHENTICATE_FAIL"

let timer;

export const authenticate = (token, userId, fullname, email, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE_SUCCESS, payload: { userId, fullname, email, token } })
    }
}

export const register = (fullname, email, password) => {
    return async dispatch => {
        try {
            dispatch(loadingAction.startLoading())
            const body = JSON.stringify({ email, password, fullname })
            const res = await fetch(registerURL, {
                method: "POST",
                body:body,
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json"
                }
            })

            if (!res.ok) {
                dispatch(loadingAction.stopLoading())
                let errorMessage = "Internal server error!"
                const errorData = await res.json()
                if (errorData.data && errorData.data.length !== 0) {
                    errorMessage = errorData.data[0].msg
                } else {
                    errorMessage = errorData.message
                }
                throw new Error(errorMessage)
            }
            const resData = await res.json()
            console.log(resData)
            dispatch(loadingAction.stopLoading())
        } catch (error) {
            dispatch(loadingAction.stopLoading())
            if (!error.message) {
                error.message = "An error occured!"
            }
            throw error
        }
    }
}
export const login = (userEmail, userPassword) => {
    return async dispatch => {
        try {
            dispatch(loadingAction.startLoading())
            const body = JSON.stringify({ email: userEmail, password: userPassword })
            const res = await fetch(loginURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: body
            })

            if (!res.ok) {
                dispatch(loadingAction.stopLoading())
                let errorMessage = "Internal server error!"
                const errorData = await res.json()
                if (errorData.data && errorData.data.length !== 0) {
                    errorMessage = errorData.data[0].msg
                } else {
                    errorMessage = errorData.message
                }
                throw new Error(errorMessage)
            }
            const resData = await res.json()
            // console.log(resData)
            const email = resData.user.email
            const userId = resData.user._id
            const fullname = resData.user.fullname
            const token = resData.token
            const expirationDate = new Date(Date.now() + 6 * (60 * 60 * 1000))

            dispatch(authenticate(token, userId, fullname, email, 12*(60*60*1000)))
            saveAuthDataToStorage(token,userId, email, fullname, expirationDate)

        } catch (error) {
            dispatch(loadingAction.stopLoading())
            if (!error.message) {
                error.message = "An error occured!"
            }
            throw error
        }
    }
}

export const logout = () => {
    clearLogoutTimer()
    localStorage.removeItem("authData")
    return { type: AUTHENTICATE_FAIL }
}

export const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}
export const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
            dispatch(messagesAction.setMessage("Your session has has expired, Login again to continue!", "info"))
        }, expirationTime)
    }
}
export const sendSMS = (recipients, msgBody) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingAction.startLoading())
            const body = JSON.stringify({ recipients: recipients, body: msgBody })
            const res = await fetch(sendMessageUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json",
                    "Authorization": `Bearer ${getState().auth.token}`
                },
                body: body
            })

            if (!res.ok) {
                dispatch(loadingAction.stopLoading())
                let errorMessage = "Internal server error!"
                const errorData = await res.json()
                if (errorData.data && errorData.data.length !== 0) {
                    errorMessage = errorData.data[0].msg
                } else {
                    errorMessage = errorData.message
                }
                throw new Error(errorMessage)
            }
            const resData = await res.json()
            dispatch(messagesAction.setMessage(`Messages has been sent to ${resData.sms.recipients.length} rescipients successfully`, "success"))
            console.log(resData)

        } catch (error) {
            dispatch(loadingAction.stopLoading())
            if (!error.message) {
                error.message = "An error occured!"
            }
            throw error
        }
    }
}
const saveAuthDataToStorage = (token, userId, email, fullname, expirationDate) => {
    localStorage.setItem("authData", JSON.stringify({
        token,
        userId,
        email,
        fullname,
        expiryDate: expirationDate.toISOString()
    }))
}