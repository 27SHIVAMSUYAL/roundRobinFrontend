import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Store both user & token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);  // ✅ Store token

      setUser(response.data.user);
      console.log("Login successful!");
      alert("Login Successful!");
      navigate("/home");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't have an account?
            <span onClick={() => navigate("/signup")} className="text-blue-500 cursor-pointer hover:underline"> Sign up</span>
          </p>

          <button
            onClick={() => {
              localStorage.setItem("user", JSON.stringify({ guest: true }));
              setUser({ guest: true });
              navigate("/home");
            }}
            className="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Login as Guest
          </button>



        </div>
        <div className="text-center mt-4">


          <span onClick={() => navigate("/admin/login")} className="text-blue-500  cursor-pointer hover:underline hover:text-blue-800">  Admin Login </span>
        </div>
      </div>
    </div>
  );
}
