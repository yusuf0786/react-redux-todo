import { combineReducers } from "redux";
import taskReducer from "./taskes/taskReducer";

const rootReducer = combineReducers({
    task: taskReducer,
    other: null
})

export default rootReducer;