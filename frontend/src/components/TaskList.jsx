function TaskList ({tasks , deleteTask, updateTask, toggleTask}){

                    const pendingTasks = tasks.filter (task =>!task.completed);
                    const completedTasks = tasks.filter (task =>task.completed );
                    console.log ("pending = " , pendingTasks);
                    console.log ("completed= ", completedTasks);

                    const renderTask = (task, index) =>{
                       
        
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

                    let deadlineStyle = "bg-blue-100 text-blue-700"

                    if (task.deadline){
                        const today=new Date()
                        const deadlineDate = new Date (task.deadline)
                        const diffTime = deadlineDate - today;

                        const diffDays = Math.ceil(diffTime/(1000*60*60*24));
                        if (diffDays<0){
                            deadlineStyle= "bg-red-100 text-red-700"
                        }
                        else if (diffDays<=1){
                            deadlineStyle= "bg-orange-100 text-orange-700"
                        }
                        else if (diffDays<=7){
                            deadlineStyle= "bg-yellow-100 text-yellow-700"
                        }
                        }

                        return(
                             <li key = {task.id}>
                    

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
                    <div
                    onClick={()=>toggleTask(task.id)}
                    className="flex items-center cursor-pointer justify-between flex-1">
                        <h2
                         className={` text-lg font-semibold ${task.completed ? "line-through text-green-700":""}`}>
                            {task.title}
                        </h2>
                        
                        <div className="flex gap-3 mr-30">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">{task.subject}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityStyle}`}>{task.priority}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${deadlineStyle}`}>{formattedDeadline}</span>
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
                }
            
    
        return (
            <div className="mt-6 justify-around items-center">
                <h2 className="text-2xl font-bold mb-4 text-orange-500">Pending Tasks</h2>
                <ul style={{listStylePosition:"inside"}}>
                    {pendingTasks.map(renderTask)}
                </ul>
 


            <h2 className="text-2xl font-bold mb-4 text-green-500">Completed Tasks</h2>
                <ul style={{listStylePosition:"inside"}}>
                    {completedTasks.map(renderTask)}
                </ul>
 
        </div>
        );


    
}
export default TaskList;
