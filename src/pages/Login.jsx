import React, { useState, useEffect } from "react";
import { validUsers } from "../data/userFile";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, user, login, logout } = useAuth();

  const handleLogin = () => {
    if (email === "" || password === "") {
      setError("Please enter both email and password");
      return;
    }
    for (let i = 0; i < validUsers.length; i++) {
      if (
        email === validUsers[i].email &&
        password === validUsers[i].password
      ) {
        setError("");
        login({ email: validUsers[i].email, name: validUsers[i].name });
        navigate("/dashboard");
        return;
      }
    }
    if (email !== "" && password !== "") {
      setError("Wrong Credentials");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-5">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back to Incident Ops
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600">Password</label>
            <button className="text-xs text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
        >
          Login
        </button>

        {error !== "" && (
          <p className="text-sm text-center text-red-600">{error}</p>
        )}

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
