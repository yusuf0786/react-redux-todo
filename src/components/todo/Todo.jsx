import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
// import actions
import { addTaskTodo } from '../../redux'
import { deleteTaskTodo } from '../../redux'

// images import
import deleteIcon from '../../assets/img/delete.svg'
import editIcon from '../../assets/img/edit.svg'
import { useDispatch, useSelector } from 'react-redux';

function getUID() {
    // Get the timestamp and convert it into alphanumeric input
    return Date.now().toString(36);
}

const Todo = () => {
    let id = getUID();
    const [taskInput, setTaskInput] = useState('')
    const [editTaskInput, setEditTaskInput] = useState('')
    // const [taskList, setTaskList] = useState([{task:'Task',id:id}])
    const [editOpen, setEditOpen] = useState(false)
    const inputTaskRef = useRef()
    const editInputTaskRef = useRef()
    const dispatch = useDispatch()
    const taskList = useSelector(state => state.task)
  
    useEffect(() => {
  
      function windowLoad() {
        console.log("window loaded");
        inputTaskRef.current.focus()
      }
  
      window.addEventListener('load', windowLoad)
  
      return () => {
        window.removeEventListener('load', windowLoad)
      }
    }, [])
  
    const formSubmit = (e) => {
      e.preventDefault()
      if (taskInput === '') return
      if (taskList.includes(taskInput)) return
      // setTaskList(prevData => [...prevData, {task:taskInput, id: getUID()} ])
      dispatch(addTaskTodo(taskInput, getUID()))
      setTaskInput('')
    }
  
    const editFormSubmit = (e) => {
      e.preventDefault()
      if (editTaskInput === '') return
      if (taskList.includes(taskInput)) return
      //   setTaskList(prevData => [...prevData, {task:editTaskInput, id: getUID()} ])
      dispatch(addTaskTodo(editTaskInput, getUID()))
      setEditTaskInput('')
      setEditOpen(false)
    }
    
    const handleTaskCheck = (e) => {
      e.target.checked ? e.target.parentNode.parentNode.classList.add("striked-list") : e.target.parentNode.parentNode.classList.remove("striked-list");
    }
  
    const handleTaskDelete = (id) => {
        //   setTaskList(prevData => taskList.filter(d => d.id !== id))
        dispatch(deleteTaskTodo(id))
    }
  
    const handleTaskEdit = useCallback((data) => {
      setEditOpen(true)
      //   setTaskList(prevData => taskList.filter(d => d.id !== data.id))
      dispatch(deleteTaskTodo(data.id))
      setEditTaskInput(data.task)
      setTimeout(() => { editInputTaskRef.current.focus() }, 0.1);
    }, [editOpen])

    return (
        <div className="todo-container">

            <h1>React-Redux Todo</h1>

            <div className="common-wrapper">
                {editOpen ? <form action="#" onSubmit={(e) => editFormSubmit(e)}>
                <input ref={editInputTaskRef} type="text" name="editTask" id="editTask" value={editTaskInput} onChange={(e) => setEditTaskInput(e.target.value)} />
                </form>: <form action="#" onSubmit={(e) => formSubmit(e)}>
                <input ref={inputTaskRef} placeholder='Write Your Task' type="text" name="task" id="task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)}  />
                </form>}

                <ul className='task-list'>

                {taskList && taskList.map((d,i) => (

                    <li key={d.id}>

                  <div className="task-content-container">
                    <input type="checkbox" onClick={(e) => handleTaskCheck(e)} />
                    <p className="task-text"><span>{i+1}.</span> <span>{d.task}</span> </p>
                  </div>

                    {!editOpen && <div className="task-icon-container">
                        <img className='delete-icon' width='18' src={deleteIcon} alt="delete icon" onClick={(e) => handleTaskDelete(d.id)} />
                        <img className='edit-icon' width='18' src={editIcon} alt="edit icon" onClick={(e) => handleTaskEdit(d)} />
                    </div>}

                    </li>

                ))}

                </ul>
            </div>

            </div>
    )
}

export default Todo