import { Add_Task, Delete_Task } from "./taskActionTypes";

const initialState = JSON.parse(localStorage.getItem("taskState")).length > 0 ? JSON.parse(localStorage.getItem("taskState")) : [];
// localStorage.setItem("taskState", JSON.stringify(initialState));

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case Add_Task: {
            const newState = [
                ...state,
                {task: action.payload.task, id: action.payload.id}
            ]
            localStorage.setItem("taskState", JSON.stringify(newState))
            return newState
        }
        break;

        case Delete_Task: {
            const newState = state.filter(d => d.id !== action.payload.id)
            localStorage.setItem("taskState", JSON.stringify(newState))
            return newState
        }
        break;
    
        default: return state
    }
}

export default taskReducer