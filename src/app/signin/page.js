"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Index() {
  const [user, setUser] = useState({
    userIdentifier: "",
    password: "",
  });
  const router = useRouter();
  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.status === 200) {
          router.push("/");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUserData();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        method: "POST",
      });
      const data = await res.json();
      if (data.status === 422 || data.status === 404) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form onSubmit={submitHandler}>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            required
            name="userIdentifier"
            value={user.userIdentifier}
            onChange={handleChange}
          />
          <label>Username/Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            autoComplete="off"
            required
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign In" />
      </form>
    </div>
  );
}

export default Index;
