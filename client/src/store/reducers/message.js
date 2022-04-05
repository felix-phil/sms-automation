import { CLEAR_MESSAGE, SET_MESSAGE } from "../actions/message"

const initialState = {
    show: false,
    message: "",
    type: ""
}
const reducer = (state=initialState, action) => {
    const {type, payload} = action

    switch(type){
        case SET_MESSAGE:
            return {
                ...state,
                show: true,
                message: payload.message,
                type: payload.message_type
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                show: false,
                message: "",
                type: ""
            }
        default:
            return initialState
        }    
}
export default reducer