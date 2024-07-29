"use client";

import Image from "next/image";
import logo from "../../asset/SideNav/AutorCar.svg";
import usernameIcon from "@/asset/SideNav/username.svg";
import passwordIcon from "@/asset/SideNav/password.svg";
import { signIn } from "next-auth/react";
import { useRef } from "react";

const page = () => {
  const username = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    await signIn("credentials", {
      username: username.current.value,
      password: password.current.value,
      redirect: true,
      callbackUrl: "/home",
    });
  };

  return (
    <div className="flex h-100vh justify-center">
      <div className="flex items-center justify-center bg-[#0e1629] h-[100vh] w-[50%] left-0">
        <Image src={logo} alt="logo" width={500} />
      </div>
      <div className="flex flex-col mt-10 w-[50%] ml-auto px-16 justify-center">
        <h1 className="text-[5rem] leading-tight font-extrabold">
          Login As Admin
        </h1>

        <div className="flex flex-col gap-5 mt-7">
          <div className="flex items-center justify-center gap-4 h-16">
            <Image src={usernameIcon} width={35} />
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                ref={username}
                placeholder="Username"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Username
              </label>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center h-16">
            <Image src={passwordIcon} width={35} />
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                ref={password}
                placeholder="Password"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#0e1629] py-5 text-white font-semibold rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
