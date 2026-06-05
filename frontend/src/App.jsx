import { useState } from "react"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import TaskInput from "./components/TaskInput"

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  function addTask() {

    if(task.trim() === "") return

    setTasks([...tasks, task])

    setTask("")
  }
  function deleteTask (indexToDelete){
    const newTasks = tasks.filter((_,index)=> index !==indexToDelete)
    setTasks(newTasks)
  }
  function updateTask(index){
    const newTask = prompt ("Enter new task")

    if (!newTask) return

    const updatedTasks = [...tasks]
    updatedTasks [index]=newTasks 

    setTasks(updatedTasks)
  }

  return (
    
    <div>
      <Header title="AI STUDY PLANNER" />
      <TaskInput 
      task={task}
      setTask = {setTask}
      addTask={addTask}
      />
      
      <p>Total Tasks : {tasks.length}</p>


      <TaskList 
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask} />
     </div>
  )
}

export default App