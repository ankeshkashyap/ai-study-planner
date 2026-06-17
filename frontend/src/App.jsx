import { useState , useEffect} from "react"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import TaskInput from "./components/TaskInput"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup"

function App() {
  return(
    <div>
      <Signup />
    </div>
  );

}

export default App