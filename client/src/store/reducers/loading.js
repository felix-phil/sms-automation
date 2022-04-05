import { START_LOADING, STOP_LOADING } from "../actions/loading"

const initialState = {
    loading: false,
    loadText: ""
}

const reducer = (state=initialState, action) => {
    const { type, payload } = action

    switch(type){
        case START_LOADING:
            return {
                ...state,
                loading: true,
                loadText: payload
            }
        case STOP_LOADING:
            return{
                ...state,
                loading: false,
                loadText: ''
            }
        default:
            return initialState
    }
}
export default reducer