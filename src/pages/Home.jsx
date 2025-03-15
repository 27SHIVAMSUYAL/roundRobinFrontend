import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function Home({ user }) {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const navigate = useNavigate();

 


const claimCoupon = async () => {
    setLoading(true);
    try {
        if (user.guest) {
            console.log("User is a guest, claiming guest coupon.");
        } else {
            console.log("User is logged in, claiming logged-in coupon.");
        }

        console.log("User Object:", user); // Debugging

        // Retrieve the token from localStorage (only for logged-in users)
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debugging
        if (!user.guest && !token) {
            console.error("No token found! Please log in.");
            alert("You must log in to claim a coupon.");
            setLoading(false);
            return;
        }

        // Load FingerprintJS and get a unique visitor ID (for guests only)
        let fingerprint = null;
        if (user.guest) {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            fingerprint = result.visitorId;
            console.log("Generated Fingerprint:", fingerprint); // Debugging
        }

        // Select API based on user type
        const endpoint = user.guest
            ? "https://roundrobinbackend-sn4n.onrender.com/api/coupons/issue/guest"
            : "https://roundrobinbackend-sn4n.onrender.com/api/coupons/issue/loggedin";

        // Prepare request body (only include guestId & fingerprint for guests)
        const requestBody = user.guest
            ? { guestId: `guest_${fingerprint}`, fingerprint }
            : {};

        // Make API request to claim a coupon
        const response = await axios.post(
            endpoint,
            requestBody, // Include guestId & fingerprint if guest
            {
                headers: user.guest ? {} : { Authorization: `Bearer ${token}` },
            }
        );

        setCoupon(response.data.uniqueCode); // Store issued coupon
        alert("Coupon claimed successfully!");
    } catch (error) {
        console.error("Error Response:", error.response?.data); // Debugging
        alert(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
};


  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome {user.guest ? "Guest" : user.name}!</h1>

      {coupon ? (
        <div className="bg-green-200 p-4 rounded text-center">
          <h2 className="text-xl font-semibold">Your Coupon:</h2>
          <p className="text-2xl font-bold">{coupon}</p>
          <button
            onClick={() => navigator.clipboard.writeText(coupon)}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Copy Code
          </button>
        </div>
      ) : (
        <button
          onClick={claimCoupon}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-700"
        >
          {loading ? "Claiming..." : "Claim Coupon"}
        </button>
      )}

      <button onClick={logout} className="text-red-500 mt-4">
        Logout
      </button>
    </div>
  );
}
