import axios from "axios";
import { FETCH_Task_Failure, FETCH_Task_Request, FETCH_Task_Success } from "./taskAPIActionTypes";

export const fetchTodosRequest = () => {
    console.log("fetch requested");
    return {
        type: FETCH_Task_Request
    }
}

const fetchTodosSuccess = (todos) => {
    console.log("fetch success");
    // console.log(todos);
    return {
        type: FETCH_Task_Success,
        payload: todos
    }
}

const fetchTodosFailure = (error) => {
    console.log("fetch failure");
    console.log(error);
    return {
        type: FETCH_Task_Failure,
        payload: error
    }
}

// Defining async action creator
export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosRequest())
        axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
            const todos = response.data
            dispatch(fetchTodosSuccess(todos))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(fetchTodosFailure(errorMsg))
        })
    }
}