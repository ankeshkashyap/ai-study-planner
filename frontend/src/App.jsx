import { useState } from "react"

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

      <h1>AI Study Planner</h1>

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
      </ul>

    </div>
  )
}

export default App