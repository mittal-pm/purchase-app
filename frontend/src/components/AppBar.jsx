import { googleLogout } from '@react-oauth/google';
import axios from 'axios';

export function AppBar({user, setUser}){
    const handlelogout = async()=>{
        try{
            googleLogout();
            setUser({})
            await axios.post("http://localhost:5000/logout", {
               user: user
              })
        }catch(e){
            alert(e.message)
        }
      
    }
    return <>
    <div className="flex justify-around items-center bg-blue-500 p-4 text-white  h-16">
        <div className="flex justify-items-start items-center">
            <img  src="/logo.png" 
                alt="Logo" 
                className="h-10 w-12"></img> 
            <div className="ml-2"> <h5>Purchase App</h5></div>
        </div>
        <div>Hello, {user.name}</div>
        <div><button className="cursor-pointer hover:underline" onClick={handlelogout}>Logout</button></div>
    </div>
    </>
}