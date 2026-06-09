import { useState , useEffect} from "react"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import TaskInput from "./components/TaskInput"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const[isLoaded, setIsLoaded]=useState(false)

  useEffect(()=>
  {
     fetch("http://127.0.0.1:8000/tasks")
     .then(response => response.json())
     .then(data => {
      setTasks(data)
     })
  },[])

  useEffect(()=>{
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    setIsLoaded(true)
  },[])

  useEffect(()=> {
    if(isLoaded){
   localStorage.setItem("tasks",JSON.stringify(tasks))
  }
 } , [tasks, isLoaded])

  function addTask() {

    if(task.trim() === "") return

    setTasks([...tasks, 
      
            {
              title:task,
              completed : false
            }
    ])

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
    updatedTasks [index]={
      ...updatedTasks [index],
      title: newTask

    }

    setTasks(updatedTasks)
  }

  function toggleTask(index){
    
    const updatedTasks = [...tasks]
    updatedTasks [index]={
      ...updatedTasks[index],
      completed: !updatedTasks [index].completed
    }
    setTasks(updatedTasks)
  }
  const completedTasks = tasks.filter(
    (task)=> task.completed
  )

  return (
    
    
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />
      
       <div className="flex-1 p-6"> 
      <div className="bg-blue-100
       text-blue-700
       font-semibold 
      py-3 px-4
      rounded-lg
      mb-4
      flex
      flex-col
      items-center">
      <h2 className=" text-4xl font-bold mb-6 ">Dashboard </h2>
      
      <p className="text-grey-600 mb-4">Total Tasks : {tasks.length}</p>
      <p className="text-grey-600 mb-4">Completed : {completedTasks.length}/{tasks.length}</p>
      
      
      </div>
      <TaskInput 
      task={task}
      setTask = {setTask}
      addTask={addTask}
      />

      <TaskList 
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask} />
        </div>
       </div>
     </div>
  )
}

export default App