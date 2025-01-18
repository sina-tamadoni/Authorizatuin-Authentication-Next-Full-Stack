"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const [formValue, setFormValue] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const router = useRouter();
  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.status === 200) {
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUserData();
  }, []);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.status === 201) {
        setFormValue((prev) => ({
          ...prev,
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
        }));
        toast.success("Registration was successful");
        router.replace("/dashboard");
        window.location.reload();
      } else if (data.status === 422) {
        toast.error("this username or email already exist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form onSubmit={submitHandler}>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            name="firstname"
            value={formValue.firstname}
            onChange={handleChange}
            required
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            name="lastname"
            value={formValue.lastname}
            onChange={handleChange}
            required
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            name="username"
            value={formValue.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            autoComplete="off"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            autoComplete="off"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" />
      </form>
    </div>
  );
}

export default Signup;
