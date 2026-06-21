function Sidebar ({onLogout}){
    return (
        <div className="w-64 bg-gray-200 p-4 -h-screen flex flex-col ">
            <ul className="space-y-4">
                <li className="hover:text-blue-600 cursor-pointer">
                    📚 Tasks
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                   🗓️ Calender  
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                    📊 Analytics
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                    ⚙️ Settings
                </li>
            
            </ul>

            <button onClick = {onLogout}
            className=" mt-auto mb-6 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-2xl">LOGOUT</button>
        </div>
    );
}
export default Sidebar;