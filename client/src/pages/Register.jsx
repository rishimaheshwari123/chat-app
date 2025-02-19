import React, { useState } from "react";
import { FaUser, FaLock, FaPhone, FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/operations/user";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password, contactNumber, navigate, dispatch);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <FaUser size={20} className="absolute left-3 top-3 text-blue-500" />
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FaUser size={20} className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FaPhone
              size={20}
              className="absolute left-3 top-3 text-blue-500"
            />
            <input
              type="number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Contact Number"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-6 relative">
            <FaLock
              className="absolute left-3 top-3 text-purple-500"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </button>
          </div>
          <div className="flex text-blue-600 justify-between items-center mb-3">
            <p>Already have account?</p>
            <Link to={"/"}>Login</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
