
const initState = {proteins:[]}

const rootReducer = (state = initState, action) => {
    if (action.type === "ENTER_PROTEIN_QUERY_RESULT") {
        state = {
            ...state,
            proteins: action.proteins
        }
    }
    return state
}

export default rootReducer