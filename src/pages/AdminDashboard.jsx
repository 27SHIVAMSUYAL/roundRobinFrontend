import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const res = await axios.get("https://roundrobinbackend-sn4n.onrender.com/api/admin/view", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(res.data);
    } catch (err) {
      console.error("Failed to load coupons", err);
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Coupon code cannot be empty");
      return;
    }

    try {
      await axios.post(
        "https://roundrobinbackend-sn4n.onrender.com/api/admin/add",
        { name, category, count: Number(count) },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Coupon added successfully!");
      setName("");
      setCategory("");
      setCount("");
      loadCoupons();
    } catch (err) {
      console.error("Error adding coupon", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#F5E1C0] to-[#EAD7BB] flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition">Logout</button>
        </div>

        {/* Add Coupon Form */}
        <form onSubmit={handleAddCoupon} className="mb-4 flex flex-col md:flex-row gap-2">
          <input className="border p-2 flex-1 rounded-lg" type="text" placeholder="Coupon Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="border p-2 flex-1 rounded-lg" type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <input className="border p-2 flex-1 rounded-lg" type="number" placeholder="Count" value={count} onChange={(e) => setCount(e.target.value)} required />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">Add</button>
        </form>

        {/* Coupon List */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Coupon Name</th>
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="bg-white border hover:bg-gray-100 transition">
                  <td className="border p-2">{coupon.name}</td>
                  <td className="border p-2">{coupon.category}</td>
                  <td className="border p-2">{coupon.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;