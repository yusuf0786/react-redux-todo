import { Add_Task, Check_Task, Delete_Task, Edit_Task} from "./taskActionTypes"

export const addTaskTodo = (task, id) => {
    return {
        type: Add_Task,
        payload: {task: task, id: id}
    }
}

export const editTaskTodo = () => {
    return {
        type: Edit_Task,
        payload: 'Task edit to todo list'
    }
}

export const deleteTaskTodo = (id) => {
    return {
        type: Delete_Task,
        payload: {
            id:id
        }
    }
}

export const checkTaskTodo = (id) => {
    return {
        type: Check_Task,
        payload: {
            id:id
        }
    }
}