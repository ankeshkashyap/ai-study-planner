function TaskList ({tasks , deleteTask, updateTask, toggleTask}){
    return (
        <ul style={{listStylePosition:"inside"}}>
            {tasks.map((task, index)=>(
                <li key = {index}>

                 <div className="
                 bg-gray-300 
                border
                 py-3 px-4
                 rounded-lg
                 mb-4
                 flex
                 justify-between
                 items-center
                 hover:shadow-md
                 transitionn
                 ">
                    
                  <span className="flex gap-2, text-xl ">
                        <input type="checkbox" 
                        checked= {task.completed}
                        onChange={()=>toggleTask(index)} />
                        <span className={task.completed ? "line-through text-green-700":""}>{task.title}</span>
                        
                  </span>
                    
                    

                <div className="flex gap-2">
                <button onClick={()=>deleteTask(index)} className="bg-red-500 text-white px-4 py-2 border rounded-lg hover:bg-red-800 ">
                    Delete
                    </button>
            
                <button onClick={()=>updateTask(index)}className="bg-green-500 text-white px-4 py-2 border rounded-lg hover:bg-green-800 ">
                    Edit
                    </button>
                    
                </div>
                </div>
                </li>
            ))}

           </ul>
    );
}
export default TaskList;
