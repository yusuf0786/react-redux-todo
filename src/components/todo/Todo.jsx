import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
// import actions
import { addTaskTodo, fetchTodos, checkTaskTodo } from '../../redux'
import { deleteTaskTodo } from '../../redux'

// images import
import deleteIcon from '../../assets/img/delete.svg'
import editIcon from '../../assets/img/edit.svg'
import { useDispatch, useSelector } from 'react-redux';
import { InputCheck } from '../others/InputCheck'
import { addFetchedTaskTodo } from '../../redux/taskes/taskActions'

function getUID() {
    // Get the timestamp and convert it into alphanumeric input
    return Date.now().toString(36);
}

const Todo = () => {
    let id = getUID();
    const [taskInput, setTaskInput] = useState('')
    const [editTaskInput, setEditTaskInput] = useState('')
    const inputTaskRef = useRef()
    const editInputTaskRef = useRef()
    const [editOpen, setEditOpen] = useState(false)
    const dispatch = useDispatch()
    const userFetchData = useSelector(state => state?.taskAPI?.userTodos)
    const userFullData = useSelector(state => state?.task?.userTodos)
    
    // on windowload
    useEffect(() => {
      inputTaskRef?.current.focus()
      
      dispatch(fetchTodos())

      const windowLoad = () => console.log("window loaded");
      window.addEventListener('load', windowLoad)
      return () => window.removeEventListener('load', windowLoad)
    }, [])

    useEffect(() => {
      userFetchData && dispatch(addFetchedTaskTodo(userFetchData));
    },[userFetchData])

    // Function to get random number of items from array
    const getRandomItems = useCallback( (array, numItems) => {
      const randomItems = [];
      const arrayCopy = array?.slice(); // Create a copy of the original array

      // Generate random indices and push corresponding items into the result array
      for (let i = 0; i < numItems; i++) {
          const randomIndex = Math.floor(Math.random() * arrayCopy?.length);
          if(!arrayCopy || !arrayCopy[randomIndex]) break;
          randomItems.push(arrayCopy?.splice(randomIndex, 1)[0]); // Remove selected item from arrayCopy
      }
      return randomItems;
    }, [userFullData])
    
    const formSubmit = (e) => {
      e.preventDefault()
      let isIncludes = false;
      if (taskInput === '') return
      if (userFullData?.length > 0) {
        isIncludes = userFullData?.some(d => d?.title === taskInput)
      }
      if (isIncludes) return
      dispatch(addTaskTodo(taskInput, getUID()))
      setTaskInput('')
    }
  
    const editFormSubmit = (e) => {
      e.preventDefault()
      if (editTaskInput === '') return
      if (userFullData.includes(taskInput)) return
      dispatch(addTaskTodo(editTaskInput, getUID()))
      setEditTaskInput('')
      setEditOpen(false)
    }
    
    const handleTaskCheck = (id) => {
      id && dispatch(checkTaskTodo(id))
    }
  
    const handleTaskDelete = (id) => {
        dispatch(deleteTaskTodo(id))
    }
  
    const handleTaskEdit = useCallback((data) => {
      setEditOpen(true)
      dispatch(deleteTaskTodo(data.id))
      setEditTaskInput(data.title)
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
                {userFullData && userFullData.length > 0 && userFullData.map((d,i) => (

                    <li key={d?.id}>

                    <div className="task-content-container">
                      <InputCheck inputChecked={ d?.completed ? true : false} optionalValueSend={d?.id} onClickFunction={handleTaskCheck}/>
                      <p className="task-text"><span>{i+1}.</span> <span>{d?.title}</span> </p>
                    </div>

                    {!editOpen && <div className="task-icon-container">
                        <img className='delete-icon' width='18' src={deleteIcon} alt="delete icon" onClick={(e) => handleTaskDelete(d?.id)} />
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