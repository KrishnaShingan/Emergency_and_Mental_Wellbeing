import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api'; // Import API function

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required!");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must have at least 1 uppercase letter, 1 number, 1 special character, and be 8+ characters long.");
            return;
        }

        setError('');
        setSuccess('');

        const response = await registerUser({ firstName, lastName, email, password });

        if (response === "User already exists!") {
            setError("This email is already registered! Try logging in.");
        } else if (response === "User registered successfully!") {
            setSuccess("Registration Successful! Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setError(response || "Registration failed! Try again.");
        }
    };

    return (
        <div className="bg-sky-100 flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg w-96">
                <h2 className="text-center text-black text-2xl py-2 mb-4 font-bold">Register</h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}

                <div className="mb-4">
                    <label className="font-semibold">First Name</label>
                    <input 
                        type="text" 
                        className="w-full border px-3 py-2 focus:outline-none focus:border-sky-500 rounded"
                        placeholder="Enter your first name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Last Name</label>
                    <input 
                        type="text" 
                        className="w-full border px-3 py-2 focus:outline-none focus:border-sky-500 rounded"
                        placeholder="Enter your last name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Email</label>
                    <input 
                        type="email" 
                        className="w-full border px-3 py-2 focus:outline-none focus:border-sky-500 rounded"
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Password</label>
                    <input 
                        type="password" 
                        className="w-full border px-3 py-2 focus:outline-none focus:border-sky-500 rounded"
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Must have 1 uppercase letter, 1 number, 1 special character, and be 8+ characters long.
                    </p>
                </div>

                <button type="submit" className="w-full bg-sky-500 text-white py-2 mt-2 rounded-lg hover:bg-sky-700 transition-colors">
                    Register
                </button>

                <Link to="/login" className="mt-4 text-sm block text-center text-sky-500">Already have an account?</Link>
            </form>
        </div>
    );
};

export default RegistrationPage;
