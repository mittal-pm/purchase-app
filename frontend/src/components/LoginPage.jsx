
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export function LoginPage({setUser}){
    const handleLoginSuccess = async (credentailResponse)=>{
        try{
            const decoded = jwtDecode(credentailResponse.credential)
            const response = await axios.post("http://localhost:5000/login/success", {
                user: decoded
            })
            setUser({
                name: decoded.name, 
                email: decoded.email,
                role: response.data.user.role
            })
        }catch(e){
            alert(e.message)
        }
    }

    return  <div className="flex justify-center items-stretch py-28 ">

        <div> <img src="/purchase.jpg"></img></div>

        <div className="py-20">
            <h1 className="text-4xl font-bold text-blue-500 mb-4 flex justify-center ">Purchase App</h1>
            <h5 className="flex justify-center">Welcome Back! Please Login To Your Account.</h5>
            <div className="flex justify-center p-8">
                <GoogleOAuthProvider clientId= "your-google-client-id">
                    <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => alert('Login Failed')}
                    />
                </GoogleOAuthProvider>
              
            </div>
        </div>
        
    </div>
}