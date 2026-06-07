function TaskInput ({
    task,
    setTask,
    addTask
}){
    return(
        <>
        <input 
            className="bordeer p-2 rounded-lg m-3 border to-black "
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)} 
            />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 ">Add Task</button>
        </>     
    )
}
export default TaskInput