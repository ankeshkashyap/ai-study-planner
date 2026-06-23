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
                    

                    let priorityStyle="";

                    if (task.priority==="High")
                        priorityStyle="bg-red-100 text-red-700";

                    else if (task.priority==="Medium")
                        priorityStyle="bg-yellow-100 text-yellow-700";

                    else
                        priorityStyle="bg-green-100 text-green-700";

                    let formattedDeadline ="";
                    if (task.deadline){
                        formattedDeadline = new Date(task.deadline).toLocaleDateString("en-In",{
                            day:"numeric",
                            month:"short"
                        });
                    }

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
                    
                  <div className="flex gap-3, text-xl flex-1 ">
                        <input type="checkbox" 
                        checked= {task.completed}
                        onChange={()=>toggleTask(index)} />

                    <div className="flex items-center justify-between flex-1">
                        <h2
                         className={` text-lg font-semibold ${task.completed ? "line-through text-green-700":""}`}>
                            {task.title}
                        </h2>
                        
                        <div className="flex gap-3 mr-30">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">{task.subject}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityStyle}`}>{task.priority}</span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">{formattedDeadline}</span>
                  </div>
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
