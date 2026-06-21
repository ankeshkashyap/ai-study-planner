import {useState} from "react";

export default function Login({onLogin, goToSignup }){
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [error , setError ] = useState("")


    async function handleLogin() {
        setError("")
        const response =  await fetch ("http://127.0.0.1:8000/login",
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
        )

        const data = await response.json();

        if (!response.ok){
            setError(data.detail)
            localStorage.removeItem("token")
            return
        }

        localStorage.setItem("token", data.access_token);       
        onLogin();

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

                    <button onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"> Login</button>
                    
                    <p className="text-center mt-4 text-gray-600">
                        Dont have an account ?
                    </p>

                    <button 
                    onClick={goToSignup}
                            className="text-blue-600 hover:underline block mx-auto">
                               Sign Up </button>
                                <p 
                                className="text-center text-gray-500 mb-6">
                                    PLAN SMARTER , STUDY BETTER. 
                                </p>
                </div>

        </div>
    );
}
