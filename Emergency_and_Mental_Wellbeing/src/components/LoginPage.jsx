import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api'; // Import API function

const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email.trim() || !password.trim()) {
            setError("Email and password are required!");
            return;
        }
    
        setError('');
        setSuccess('');
    
        // 🔵 Attempt to log in
        const response = await loginUser({ email, password });
    
        if (response && response.token) {  // ✅ Check if token is received
            setSuccess("Login Successful! Redirecting...");
        
            const userData = { username: response.username };
            localStorage.setItem("user", JSON.stringify(userData));  // ✅ Store user info
            localStorage.setItem("authToken", response.token);  // ✅ Store auth token
        
            setTimeout(() => {
                setUser(userData);
                navigate("/home");
            }, 1500);
        } else {
            setError("Invalid email or password! Try again.");
        }
        
        
        
    };    

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-sky-100">
            <form className="bg-white rounded-lg shadow-md border p-6 w-96" onSubmit={handleSubmit}>
                <h2 className="text-center text-black text-2xl py-2 mb-4 font-bold">Login</h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}

                <div className="mb-4">
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="w-full border px-3 py-2 focus:outline-none focus:border-sky-500 rounded"
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label className="font-semibold" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="w-full border px-3 py-2 focus:outline-none focus:border-sky-500 rounded"
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button type="submit" className="w-full bg-sky-500 text-white py-2 mt-2 rounded-lg hover:bg-sky-700 transition-colors">
                    Login
                </button>

                <div className="mt-4 flex flex-col items-center">
                    <button 
                        className="text-sky-500 hover:underline text-sm"
                        onClick={() => navigate("/register")}
                    >
                        Don't have an account? Register here
                    </button>

                    <button 
                        className="text-blue-500 hover:underline text-sm mt-2"
                        onClick={() => alert("Redirecting to password reset... (Not implemented)")}
                    >
                        Forgot Password?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;