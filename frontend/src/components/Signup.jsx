import {useState} from "react";

export default function Signup({goToLogin}){

    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [error , setError ] = useState("")

    async function handleSignup() {
        
        const response =  await fetch ("http://127.0.0.1:8000/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );
        const data = await response.json();
        if (!response.ok){
            setError(data.detail)
            localStorage.removeItem("token")
            return
        }
        alert("Signup Successfull!")
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    AI STUDY PLANNER
                </h1>
            <input type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4" />

            <input type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    className="w-full border p-3 rounded-lg mb-2" />

                    {error && (<p className="text-red-500 text-sm mb-2">
                        {error}
                    </p>)}

                    <button onClick={handleSignup}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"> Signup</button>
                    
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account ?
                    </p>

                    <button 
                    onClick={goToLogin}
                            className="text-blue-600 hover:underline block mx-auto">
                               Login </button>
                                <p 
                                className="text-center text-gray-500 mb-6">
                                    PLAN SMARTER , STUDY BETTER. 
                                </p>
                </div>

        </div>
    );
}
