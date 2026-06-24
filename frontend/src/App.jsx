import { useState , useEffect} from "react"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import TaskInput from "./components/TaskInput"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup"
import Login from "./components/Login"
import TaskModal from "./components/TaskModal"
  


function App() {
  const [showSignup, setShowSignup] = useState(false)
  const[loggedIn, setloggedIn]=useState(!!localStorage.getItem("token"))
  const [error , seterror ] = useState("")
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const[isLoaded, setIsLoaded]=useState(false)
  const [showModal, setShowModal]=useState(false)
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

      const sortedTasks =[...data].sort((a, b)=>{
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date (b.deadline) 
      });

      setTasks(sortedTasks)
     }) 
  },[loggedIn])

  useEffect(()=> {
    if(isLoaded){
   localStorage.setItem("tasks",JSON.stringify(tasks))
  }
 } , [tasks, isLoaded])

 
  console.log(loggedIn);
  if (!loggedIn){
    if (showSignup)
        return(
      <Signup goToLogin={()=> setShowSignup(false)}/>
    );
    return (
      <Login onLogin = {()=>setloggedIn(true)} goToSignup={()=> setShowSignup (true)}/>
    );
  }

  async function addTask(title, subject, priority,deadline) {
        if(title.trim() === "" || subject.trim === "") return

      const token = localStorage.getItem("token");
      const response =  await fetch ("http://127.0.0.1:8000/tasks",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    subject,
                    priority,
                    deadline
                })
            });
    setTasks([...tasks, 
            {
              title,
              subject,
              priority,
              completed : false,
              deadline
            }
          ])

    setTask("")
  }

  async function deleteTask (indexToDelete){
    const confirm = window.confirm("Are you sure you want to delete this task ?")
    if (!confirm){
      return
    }
    const taskToDelete = tasks[indexToDelete]
    const token = localStorage.getItem("token")
    const response =  await fetch (`http://127.0.0.1:8000/tasks/${taskToDelete.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                const newTasks = tasks.filter ((_, index )=> index !== indexToDelete)
    setTasks(newTasks)
  }

  async function updateTask(index){
    const newTask = prompt ("Enter new task")
    if (!newTask || newTask.trim()==="") return

    const updateTask = tasks[index]
    const token = localStorage.getItem("token")
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

            const updatedTasks=[...tasks]
            updatedTasks[index] = {
              ...updatedTasks[index],
              title: newTask
            }
            
            const data =await response.json()
            setTasks(updatedTasks)
        }

    async  function toggleTask(taskId){
     const taskToToggle = tasks.find(
      task => task.id === taskId )
    const token = localStorage.getItem("token")
    const response =  await fetch (`http://127.0.0.1:8000/tasks/${taskToToggle.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                completed:!taskToToggle.completed
                })
            });
            const data =await response.json()
            setTasks(
              tasks.map(task => task.id === taskId?{...task,completed:!task.completed} : task)
            )
    }
    console.log(tasks)
    console.log(typeof tasks)
  const completedTasks = tasks.filter(
    (task)=> task.completed
  )

  function logout (){
    const confirm = window.confirm("Are you sure you want to Logout ?")
    if (!confirm){
      return
    }
    localStorage.removeItem("token");
    setloggedIn(false);

  }

  return (
    
    
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar onLogout={logout}/>
      
       <div className="flex-1 p-6"> 
      <div className="bg-blue-100
       text-blue-700
       font-semibold 
      py-3 px-4
      rounded-lg
      mb-4
      flex
      flex-col
      items-stretched">
      
        <Dashboard tasks={tasks}/>
      
      
      </div>

      <button 
      onClick={()=>setShowModal(true)}
      className="bg-blue-500 text-white px-4 py-3 rounded-lg">
      + ADD TASK
      </button>
      {showModal && <TaskModal setShowModal={setShowModal} addTask={addTask}/>}

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