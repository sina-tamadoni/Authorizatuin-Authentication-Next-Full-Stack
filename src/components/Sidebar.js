"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  PanelLeftOpen,
  PanelLeftClose,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  MonitorCog,
} from "lucide-react";
import Tooltip from "@/modules/Tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const router = useRouter();
  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.status === 200) {
          setIsLoggedIn(true);
          setRole(data.data.role);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, []);

  const logout = async () => {
    const res = await fetch("api/auth/signout");
    const data = await res.json();
    toast.success(data.message);
    window.location.reload();
    router.replace("/");
  };
  return (
    <div
      className={`relative h-screen py-4 bg-[#161819] text-white flex flex-col items-center transition-all duration-300 ${
        isOpen ? "w-44 md:w-64 px-4 overflow-hidden" : "w-16 p-10"
      }`}
      //   onMouseEnter={() => setIsOpen(true)}
      //   onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`flex min-w-56 mb-24  ${
          isOpen ? "justify-between" : "justify-center"
        } items-center`}
      >
        <div
          className={`${
            isOpen ? "hidden md:flex" : "hidden"
          }  gap-2 items-center `}
        >
          <Image
            src="../../pizza-logo.svg"
            width={50}
            height={50}
            alt="logo"
            className=" bg-[#1686e9] rounded-full"
          />
          <span className=" text-[#fefefe] text-2xl">Pizza Hut</span>
        </div>
        {isOpen ? (
          <PanelLeftClose
            size={30}
            color="#707479"
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer flex justify-center items-center w-full md:w-fit"
          />
        ) : (
          <PanelLeftOpen
            size={35}
            color="#707479"
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer"
          />
        )}
      </div>
      {isLoggedIn ? (
        <>
          <Link href="/dashboard" className={`${isOpen && "w-full"}`}>
            <button className="relative btn inline-flex items-center gap-5 mb-8">
              <LayoutDashboard
                size={35}
                color="#97788e"
                className="cursor-pointer"
              />
              <span className={`${isOpen ? "not-sr-only" : "sr-only"} text-lg`}>
                Dashboard
              </span>
              {!isOpen && <Tooltip name="Dashboard" />}
            </button>
          </Link>
          <button
            className={`relative btn inline-flex items-center gap-5 mb-8 ${
              isOpen && "w-full"
            }`}
            onClick={() => logout()}
          >
            <LogOut size={35} color="#573293" className="cursor-pointer" />
            <span className={`${isOpen ? "not-sr-only" : "sr-only"} text-lg`}>
              Logout
            </span>
            {!isOpen && <Tooltip name="Logout" />}
          </button>
        </>
      ) : (
        <>
          <Link href="/signin" className={` ${isOpen && "w-full"}`}>
            <button className="btn relative inline-flex items-center gap-5 mb-8">
              <LogIn size={35} color="#3d80c2" className="cursor-pointer" />
              <span className={`${isOpen ? "not-sr-only" : "sr-only"} text-lg`}>
                Signin
              </span>
              {!isOpen && <Tooltip name="Signin" />}
            </button>
          </Link>
          <Link href="/signup" className={`${isOpen && "w-full"}`}>
            <button className="relative btn inline-flex items-center gap-5 mb-8">
              <UserPlus size={35} color="#5be28e" className="cursor-pointer" />
              <span className={`${isOpen ? "not-sr-only" : "sr-only"} text-lg`}>
                Signup
              </span>
              {!isOpen && <Tooltip name="Signup" />}
            </button>
          </Link>
        </>
      )}
      <>
        {role && role === "ADMIN" && (
          <Link href="/p-admin" className={`${isOpen && "w-full"}`}>
            <button className="relative btn inline-flex items-center gap-5 mb-8">
              <MonitorCog
                size={35}
                color="#c76a41"
                className="cursor-pointer"
              />
              <span
                className={`${
                  isOpen ? "not-sr-only" : "sr-only"
                } text-lg w-[100px]`}
              >
                Admin Panel
              </span>
              {!isOpen && <Tooltip name="Admin Panel" />}
            </button>
          </Link>
        )}
      </>

      <Image
        src="/Images/wave.svg"
        width={100}
        height={100}
        alt="wave"
        className="absolute bottom-0 w-full"
      />
    </div>
  );
}

export default Sidebar;
