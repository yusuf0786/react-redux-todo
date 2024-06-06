import { FETCH_Task_Failure, FETCH_Task_Request, FETCH_Task_Success } from "./taskAPIActionTypes";

JSON.parse(localStorage.getItem("taskAPIState")) && JSON.parse(localStorage.getItem("taskAPIState")).length > 0 ? localStorage.removeItem("taskAPIState") : null

const initialState = JSON.parse(localStorage.getItem("taskAPIState")) ? JSON.parse(localStorage.getItem("taskAPIState")) : {};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_Task_Request: return {
            ...state,
            loading: true
        }
        break;
        case FETCH_Task_Success: {
            const newState = {
                ...state,
                userTodos: action.payload,
                loading: false,
                error: ''
            }
            localStorage.setItem("taskAPIState", JSON.stringify(newState))
            return newState
        }
        break;
        case FETCH_Task_Failure: return {
            // ...state,
            loading: false,
            userTodos: [],
            error: action.payload
        }
        break;
        default: return state
    }
}

export default taskReducer