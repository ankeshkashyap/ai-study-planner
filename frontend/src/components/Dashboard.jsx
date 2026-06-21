import { useEffect,useState } from "react";

export default function Dashboard ({tasks = []}){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task=>task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks=== 0 ? 0: Math.round((completedTasks / totalTasks)*100);
    
    return (
          <div className="w-full p-6">
        <h2 className=" text-4xl font-bold mb-6 ">Dashboard </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-gray-600 text-lg">
                    Total Tasks
                </h3>
                <p className="text-5xl font-bold text-blue-500 mt-4">
                    {totalTasks}
                </p>
            </div>
        
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-gray-600 text-lg">
                    Completed
                </h3>
                <p className="text-5xl font-bold text-green-500 mt-4">
                    {completedTasks}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-gray-600 text-lg">
                    Pending
                </h3>
                <p className="text-5xl font-bold text-orange-500 mt-4">
                    {pendingTasks}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-gray-600 text-lg">
                    Completion
                </h3>
                <p className="text-5xl font-bold text-purple-500 mt-4">
                    {completionRate}%
                </p>
            </div>
        
        </div>

        <div className="w-full mt-8 px-6">
            <h3 className="mb-2 font-semibold">
                Completion : {completionRate}%
            </h3>
            <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden relative">

                <div 
                className="absolute inset-0 bg-linear-to-r from-red-500 via-yellow-400 to-green-500 ">
                </div>

                <div 
                className="absolute right-0 top-0 h-full bg-gray-300 transition-all shadow-lg duration-500 "style={{width: `${100-completionRate}%`}}></div>
            </div>
        </div>
      </div>
      
    );
    }
