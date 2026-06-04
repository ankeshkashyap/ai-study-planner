function TaskInput ({
    task,
    setTask,
    addTask
}){
    return(
        <>
        <input
            value={task}
            onChange={(e) => setTask(e.target.value)} 
            />
        <button onClick={addTask}>Add Task</button>
        
        </>
    )
}
export default TaskInput