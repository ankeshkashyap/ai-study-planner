import {useState} from "react";

export default function Signup(){

    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");

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
        alert("Signup Successfull!")
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

                    <button onClick={handleSignup}> Sign Up</button>
                    
        </div>
    );
}
