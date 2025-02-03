import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dynamicmainpagelogo from "../../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const apiUrl = "https://dynamicvibellc.com/api/v1/admin/email-login";
      const response = await axios.post(apiUrl, { email, password });
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.data));
        navigate("/admin/dashboard/car-rental");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center bg-gray-100">
      <div className="mb-5 max-w-[150px]">
        <img
          src={dynamicmainpagelogo}
          alt="Company Logo"
          className="w-full h-auto bg-orange-500 p-5 rounded-lg animate-fadeInScale"
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center max-w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Admin Panel Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
                required
              />
            </div>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded font-bold text-lg hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
