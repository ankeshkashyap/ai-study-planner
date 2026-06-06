function TaskList ({tasks , deleteTask, updateTask}){
    return (
        <ul style={{listStylePosition:"inside"}}>
            {tasks.map((task, index)=>(
                <li key = {index}>

                 <div className="
                 bg-gray-300 
                border
                 p-4
                 rounded-lg
                 mb-4
                 flex
                 justify-between
                 items-center
                 ">
                  <span>
                        {task}
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
