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

  return (
    
    <div>
      <Header title="AI STUDY PLANNER" />

      <TaskInput 
      task={task}
      setTask = {setTask}
      addTask={addTask}
      />
      
      <TaskList tasks={tasks} />
     { /*<h1>AI Study Planner</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul style={{ listStylePosition: "inside" }}>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>*/}

    </div>
  )
}

export default App