function TaskList ({tasks , deleteTask, updateTask}){
    return (
        <ul style={{listStylePosition:"inside"}}>
            {tasks.map((task, index)=>(
                <li key = {index}>{task}
                
                <button onClick={()=>deleteTask(index)}>Delete</button>
            
                <button onClick={()=>updateTask(index)}>Edit</button>
        
                </li>
            ))}

           </ul>
    );
}
export default TaskList;