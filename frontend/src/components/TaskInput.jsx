function TaskInput ({
    task,
    setTask,
    addTask
}){
    return(
        <>
        <input
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)} 
            />
        <button onClick={addTask}>Add Task</button>
        </>     
    )
}
export default TaskInput