import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://roundrobinbackend-sn4n.onrender.com/api/admin/login", { username, password });
      localStorage.setItem("adminToken", res.data.token);
      console.log("Admin login successful!");
      console.log(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <form className="bg-white p-6 shadow-lg rounded" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          Login
        </button>
        <p className="mt-4 text-center">
          <a href="/" className="text-blue-500 hover:underline">Back to Login</a>
        </p>
          
      </form>
    </div>
  );
};

export default AdminLogin;
