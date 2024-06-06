import { combineReducers } from "redux";
import taskReducer from "./taskes/taskReducer";
import taskAPIReducer from "./taskesAPI/taskAPIReducer"

const rootReducer = combineReducers({
    task: taskReducer,
    taskAPI: taskAPIReducer,
    other: null
})

export default rootReducer;