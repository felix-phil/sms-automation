import { combineReducers } from "redux"
import authReducer from "./auth"
import loadReducer from "./loading"
import messageReducer from "./message"

const rootReducer = combineReducers({
    auth: authReducer,
    load: loadReducer,
    message: messageReducer
})

export default rootReducer