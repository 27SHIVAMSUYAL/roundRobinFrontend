import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username, // Change 'name' to 'username'
        email,
        password,
      });
      alert("Signup successful! You can now log in.");
      console.log("Signup successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
      console.error("Signup error:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800">Sign Up</h1>
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account?  
            <span onClick={() => navigate("/")} className="text-purple-500 cursor-pointer hover:underline"> Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
