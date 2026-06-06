import { useState } from "react"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import TaskInput from "./components/TaskInput"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

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
    updatedTasks [index]=newTask

    setTasks(updatedTasks)
  }

  return (
    
    
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />
      


      <h2 className=" text-4xl font-bold mb-6 ">Dashboard </h2>
      <div className="flex-1 p-6">
      <TaskInput 
      task={task}
      setTask = {setTask}
      addTask={addTask}
      />
      
      <p className="text-grey-600 mb-4">Total Tasks : {tasks.length}</p>


      <TaskList 
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask} />
        </div>
        </div>
     </div>
  )
}

export default App