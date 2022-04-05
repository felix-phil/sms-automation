const { AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL } = require("../actions/auth")

const initialState = {
    isAuth: false,
    fullname: null,
    email: null,
    userId: null,
    token: null
}

const reducer = (state=initialState, action) => {
    const { type, payload } = action

    switch(type){
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                isAuth: true,
                fullname: payload.fullname,
                email: payload.email,
                token: payload.token,
                userId: payload.userId
            }
        case AUTHENTICATE_FAIL:
            return {
                ...state,
                isAuth: false,
                fullname: null,
                email: null,
                token: null,
                userId: null
            }
        default:
            return state
    }
}

export default reducer