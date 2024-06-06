import { Add_Task, Delete_Task, Check_Task} from "./taskActionTypes";

JSON.parse(localStorage.getItem("taskState")) && JSON.parse(localStorage.getItem("taskState")).length > 0 ? localStorage.removeItem("taskState") : null

let initialState = JSON.parse(localStorage.getItem("taskAPIState")) ? JSON.parse(localStorage.getItem("taskAPIState")) : {};
initialState = {...initialState, userTodos: initialState?.userTodos?.filter(item => item?.userId === 1)}

const getRandomItems = (array, numItems) => {
    const randomItems = [];
    const arrayCopy = array?.slice(); // Create a copy of the original array

    // Generate random indices and push corresponding items into the result array
    for (let i = 0; i < numItems; i++) {
        const randomIndex = Math.floor(Math.random() * arrayCopy?.length);
        if(!arrayCopy || !arrayCopy[randomIndex]) break;
        randomItems.push(arrayCopy?.splice(randomIndex, 1)[0]); // Remove selected item from arrayCopy
    }
    return randomItems;
}

initialState = {...initialState, userTodos: getRandomItems(initialState?.userTodos, 10)}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case Add_Task: {
            const newState = {
                ...state,
                userTodos: [
                    ...state?.userTodos,
                    {userId: 1, id: action?.payload?.id, title: action?.payload?.task, completed: false}
                ],
            }
            localStorage.setItem("taskState", JSON.stringify(newState))
            return newState
        }
        break;

        case Delete_Task: {
            const newState = {
                ...state,
                userTodos: state.userTodos.filter(d => d?.id !== action?.payload?.id),
            }
            localStorage.setItem("taskState", JSON.stringify(newState))
            return newState
        }
        break;

        case Check_Task: {
            const newState = {
                ...state,
                userTodos: state.userTodos.map(d => {
                    d.completed = d.id === action.payload.id ? !d.completed : d.completed
                    return d
                }),
            }
            localStorage.setItem("taskState", JSON.stringify(newState))
            return newState
        }
        break;
    
        default: return state
    }
}

export default taskReducer