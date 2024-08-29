"use client";

import { loginUser } from "@/services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setInputData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputData.email || !inputData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser(inputData);
      if (response.status === 200) {
        toast.error("Login successful!");
        
      } else {
        toast.success("Login successful!.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials, please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} onReset={handleReset} className="grid grid-cols-12 gap-4 p-6">
        <div className="col-start-5 col-end-9">
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            id="email"
            name="email"
            value={inputData.email}
            className="mt-1 w-full border border-gray-300 rounded py-2 px-3 outline-blue-200 outline-offset-2"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
            required
          />
          <small className="text-gray-500">We will never share your credentials with anyone else.</small>
        </div>

        <div className="col-start-5 col-end-9">
          <label htmlFor="password" className="block font-medium">Password</label>
          <input
            id="password"
            name="password"
            value={inputData.password}
            className="mt-1 w-full border border-gray-300 rounded py-2 px-3 outline-blue-200 outline-offset-2"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-start-5 col-end-9 flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            type="reset"
            className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600"
          >
            Reset
          </button>
        </div>

        <div className="col-start-5 col-end-9">
          <p className="mt-4">
            Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
