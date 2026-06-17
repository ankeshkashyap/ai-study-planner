import { useEffect,useState } from "react";

export default function Dashboard (){

    const [stats, setStats] = useState(null);
    useEffect(()=> {
        const token = localStorage.getItem("token");
        fetch ("http://127.0.0.1:8000/dashboard",{
            headers:{
                Authorisation : 'Bearer ${token}'
            }
        })
        .then(res=>res.json())
        .then(data=>setStats(data));
    },[]);

    if (!stats){
        return (<div className="flex-1 p-6 items-center ">
                      <h2 className=" text-4xl font-bold mb-6 ">Dashboard </h2>
                    <h2>Loading ...</h2>
        </div> );
    }
    return (
        <div className="flex-1 p-6 items-center">
        <h2 className=" text-4xl font-bold mb-6 ">Dashboard </h2>

        <h2>Completed: {stats.completed}</h2>
        <h2>Pending: {stats.pending}</h2>
      </div>
      
      );
}
