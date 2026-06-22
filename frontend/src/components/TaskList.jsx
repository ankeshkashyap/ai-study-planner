function TaskList ({tasks , deleteTask, updateTask, toggleTask}){

    
        return (
            <div className="mt-6 justify-around items-center">
                <h2 className="text-2xl font-bold mb-4">Task List</h2>
                <ul style={{listStylePosition:"inside"}}>
        
            {tasks.map((task, index)=>{
                    let borderColor="";

                    if (task.priority==="High")
                        borderColor="border-l-red-500";

                    else if (task.priority==="Medium")
                        borderColor="border-l-yellow-500";

                    else
                        borderColor="border-l-green-500";

                 return (   

                
                <li key = {index}>
                    

                 <div className={`
                 bg-gray-300 
                border
                border-l-8 
                ${borderColor}
                 py-4 px-5
                 rounded-xl
                 shadow-sm
                 mb-4
                 flex
                 justify-between
                 items-center
                 hover:shadow-lg
                 transitionn
                 ${task.completed ? "opacity-70":""}
                 `}>
                    
                  <div className="flex gap-3, text-xl items-start ">
                        <input type="checkbox" 
                        checked= {task.completed}
                        onChange={()=>toggleTask(index)} />

                    <div>
                        <h2
                         className={task.completed ? "line-through text-green-700":""}>
                            {task.title}
                        </h2>

                        <p className="text-sm text-gray-600">{task.subject}</p>
                        <p className="text-sm text-gray-600">{task.priority}</p>
                        
                  </div>
                  </div>
                    
                    

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
                 );
})}

        </ul>
        </div>
        );


    
}
export default TaskList;
