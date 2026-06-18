import { useState , useEffect} from "react"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import TaskInput from "./components/TaskInput"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup"
import Login from "./components/login"

  


function App() {
  const[loggedIn, setloggedIn]=useState(false)

    

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const[isLoaded, setIsLoaded]=useState(false)
  const token =localStorage.getItem("token");
  useEffect(()=>
  { 
    if(!loggedIn) return;

     fetch("http://127.0.0.1:8000/tasks",{
      headers:{
        Authorization: `Bearer ${token}`
      }
     })
     .then(response => response.json())
     .then(data => {
      console.log (data)
      setTasks(data)
     })
  },[loggedIn])

  /*useEffect(()=>{
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    setIsLoaded(true)
  },[])
*/
  useEffect(()=> {
    if(isLoaded){
   localStorage.setItem("tasks",JSON.stringify(tasks))
  }
 } , [tasks, isLoaded])

 
  console.log(loggedIn);
  if (!loggedIn){
    return <Login onLogin={()=>setloggedIn(true)}/>;
  }

  async function addTask() {
        if(task.trim() === "") return

      const token = localStorage.getItem("token");
      const response =  await fetch ("http://127.0.0.1:8000/tasks",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: task
                })
            });
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

  async function updateTask(index){
    const newTask = prompt ("Enter new task")
    if (!newTask || newTask.trim()==="") return

    const updateTask = tasks[index]
    const response =  await fetch (`http://127.0.0.1:8000/tasks/${updateTask.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newTask 
                })
            });
            const data =await response.json()
            console.log(data);
         
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
      <div>
        <Dashboard />
      </div>
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