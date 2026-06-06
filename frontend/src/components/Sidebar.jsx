function Sidebar (){
    return (
        <div className="w-64 bg-gray-200 p-4 min-h-screen">
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
        </div>
    );
}
export default Sidebar;