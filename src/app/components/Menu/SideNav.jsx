"use client";

import logo from "@/../public/Logo.svg";
import Mobil from "@/asset/SideNav/Mobil.png";
import Pelanggan from "@/asset/SideNav/Pelanggan.png";
import Pengembalian from "@/asset/SideNav/Pengembalian.png";
import Permbayaran from "@/asset/SideNav/Permbayaran.png";
import TampilData from "@/asset/SideNav/TampilData.png";
import Transaksi from "@/asset/SideNav/Transaksi.png";
import { useContentPanelStore, useLeftPanelPageStore } from "@/libs/store";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SideNav = () => {
  const router = useRouter();

  const setTampilDataPage = useLeftPanelPageStore(
    (state) => state.setLeftPanelPage
  );

  const setContentPanel = useContentPanelStore((state) => state.setContentPanel);

  const handleClickMenu = (newPage) => {
    setTampilDataPage(newPage);
    router.push(`/${newPage}`);
  };

  const handleClickTampilData = () => {
    router.push("/TampilData/Transaksi");
    setContentPanel("Transaksi");
  }


  const handleClickLogout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <div className="w-[21%] fixed flex flex-col items-center left-0 h-full bg-[#0E1629]">
      <Image src={logo} alt="logo" width={250} />
      <div className="flex flex-col w-full gap-8 px-10 py-8 text-white">
        <button
          className="cursor-ponter hover:bg-gray-800 px-4 py-2"
          onClick={() => handleClickTampilData()}
        >
          <div className="flex gap-4 items-center">
            <Image src={TampilData} width={25} />
            <h1 className="text-lg font-bold">Tampil Data</h1>
          </div>
        </button>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold ml-2 mb-3">Input Data</h1>
          <div className="flex flex-col gap-2">
            <button
              className="cursor-ponter hover:bg-gray-800 px-4 py-2"
              onClick={() => handleClickMenu("Pelanggan")}
            >
              <div className="flex gap-4 items-center">
                <Image src={Pelanggan} alt="pelanggan" width={25} height={20} />
                <h1 className="text-lg font-bold">Pelanggan</h1>
              </div>
            </button>
            <button
              className="cursor-ponter hover:bg-gray-800 px-4 py-2"
              onClick={() => handleClickMenu("Mobil")}
            >
              <div className="flex gap-4 items-center">
                <Image src={Mobil} alt="mobil" width={25} />
                <h1 className="text-lg font-bold">Mobil</h1>
              </div>
            </button>
            <button
              className="cursor-ponter hover:bg-gray-800 px-4 py-2"
              onClick={() => handleClickMenu("Transaksi")}
            >
              <div className="flex gap-4 items-center">
                <Image src={Transaksi} alt="transaksi" width={25} />
                <h1 className="text-lg font-bold">Transaksi</h1>
              </div>
            </button>
            <button
              className="cursor-ponter hover:bg-gray-800 px-4 py-2"
              onClick={() => handleClickMenu("Pembayaran")}
            >
              <div className="flex gap-4 items-center">
                <Image src={Permbayaran} alt="permbayaran" width={25} />
                <h1 className="text-lg font-bold">Pembayaran</h1>
              </div>
            </button>
            <button
              className="cursor-ponter hover:bg-gray-800 px-4 py-2"
              onClick={() => handleClickMenu("Pengembalian")}
            >
              <div className="flex gap-4 items-center">
                <Image src={Pengembalian} alt="pengembalian" width={25} />
                <h1 className="text-lg font-bold">Pengembalian</h1>
              </div>
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleClickLogout()}
        className="cursor-ponter hover:bg-gray-700 px-4 py-2 text-white text-lg bg-slate-600 rounded active:bg-slate-800"
      >
        Logout
      </button>
    </div>
  );
};
