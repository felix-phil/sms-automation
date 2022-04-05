export const START_LOADING = "START_LOADING"
export const STOP_LOADING = "STOP_LOADING"

export const startLoading = (loadText) => {
    return dispatch => {
        dispatch({ type: START_LOADING, payload: loadText})
    }
}

export const stopLoading = () => {
    return dispatch => {
        dispatch({ type: STOP_LOADING})
    }
}