import {useState} from "react";

export default function Login({onLogin}){

    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    

    async function handleLogin() {
        
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
        );
        const data = await response.json();

        localStorage.setItem("token", data.access_token);
                
        onLogin();
        }

    return(
        <div>
            <input type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)} />

            <input type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />

                    <button onClick={handleLogin}> Login</button>
                    
        </div>
    );
}
