import { useState } from "react" ;
 export default function TaskModal({setShowModal , addTask}){
    const [title, setTitle] = useState("")
    const [subject , setSubject] = useState("")
    const [priority, setPriority]=useState("Medium")
    return (
        <div className="fixed inset-0 bg-black/50 felx items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">
                    Add New Task
                </h2>

                <input 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text" 
                placeholder="Task Title" 
                className="w-full border p-2 rounded mb-3" />
                
                <input 
                value={subject}
                onChange={(e)=>setSubject(e.target.value)} 
                type="text" 
                placeholder="Subject" 
                className="w-full border p-2 rounded mb-3" />

                <select  
                value={priority}
                onChange={(e)=>setPriority(e.target.value)}
                className="w-full border p-2 rounded mb-4">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={()=>setShowModal(false)}
                    className="px-4 py2 bg-red-500 rounded text-white">
                        Cancel
                    </button>

                    <button 
                    onClick={()=>{
                        addTask (title, subject, priority)
                        setShowModal(false)
                    }}
                    className="px-4 py2 bg-blue-500 rounded text-white">
                        Create
                    </button>
                    
                </div>
                
            </div>
        </div>
    )
}