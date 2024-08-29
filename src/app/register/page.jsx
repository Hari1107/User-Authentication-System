"use client";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { addUser } from "@/services/userService";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter(); // Initialize the useRouter hook

  let registerData;
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [pmatch, setPmatch] = useState(false);

  const getInutValue = (e) => {
    e.preventDefault();
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const dataReset = () => {
    setInputData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  const matchPassword = () => {
    if (inputData.password !== inputData.cpassword) {
      setPmatch(true);
      setInputData((prev) => ({
        ...prev,
        cpassword: "",
      }));
    } else {
      setPmatch(false);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    // Check if mandatory fields are filled
    if (!inputData.firstName || !inputData.email || !inputData.password || !inputData.cpassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    registerData = {
      ...inputData,
      name: `${inputData.firstName} ${inputData.lastName || ""}`,
    };
    delete registerData.firstName;
    delete registerData.lastName;

    try {
      await addUser(registerData);
      toast.success("User registered successfully!");
      console.log(registerData);
      dataReset();
      //router.push("/login"); // Redirect to the dashboard page after successful registration
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again!");
    }
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={submitData}>
        <div className="grid grid-cols-12 m-3 ">
          <div className="col-start-5 col-end-9 ">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
                <input
                  name="firstName"
                  value={inputData.firstName}
                  onChange={getInutValue}
                  className="mt-1 w-full border border-gray-300 rounded py-1 ps-3 outline-blue-200 outline-offset-2"
                  type="text"
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  value={inputData.lastName}
                  onChange={getInutValue}
                  className="mt-1 w-full border border-gray-300 rounded py-1 ps-3 outline-blue-200 outline-offset-2"
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 m-3 ">
          <div className="col-start-5 col-end-9">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="Password">Password <span className="text-red-500">*</span></label>
                <input
                  name="password"
                  value={inputData.password}
                  onChange={getInutValue}
                  className="mt-1 w-full border border-gray-300 rounded py-1 ps-3 outline-blue-200 outline-offset-2"
                  type="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div>
                <label htmlFor="cPassword">Confirm Password <span className="text-red-500">*</span></label>
                <input
                  name="cpassword"
                  value={inputData.cpassword}
                  onChange={getInutValue}
                  onBlur={matchPassword}
                  className="mt-1 w-full border border-gray-300 rounded py-1 ps-3 outline-blue-200 outline-offset-2"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
            {pmatch && (
              <small className="text-red-400">Passwords do not match</small>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 m-3 ">
          <div className="col-start-5 col-end-9 ">
            <label htmlFor="Email">Email <span className="text-red-500">*</span></label>
            <input
              name="email"
              value={inputData.email}
              onChange={getInutValue}
              className="mt-1 w-full border border-gray-300 rounded py-1 ps-3 outline-blue-200 outline-offset-2"
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-12 m-3 ">
          <div className="col-start-5 col-end-9">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded"
            >
              Register
            </button>
            <button
              type="button"
              onClick={dataReset}
              className="ms-5 bg-yellow-500 text-white py-3 px-8 rounded"
              style={{ marginLeft: "1rem" }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-12 m-3">
        <div className="col-start-5 col-end-9">
          <h3>
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Click here to login</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Page;
