import { useContentPanelStore } from "@/libs/store";
import { useRouter } from "next/navigation";
import React from "react";

const Tab = ({ name }) => {
  const router = useRouter();
  const tampilanContent = useContentPanelStore(
    (state) => state.tampilanContentPanel
  );
  const setTampilanContetn = useContentPanelStore(
    (state) => state.setContentPanel
  );

  const handleChangeTab = (route) => {
    setTampilanContetn(route);
    router.push(`/TampilData/${route}`);
  }

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-400 text-gray-400">
      <li className="me-2">
        <button
          onClick={() => handleChangeTab("Transaksi")}
          className={`inline-block p-4 active:bg-blue-900 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 ${
            tampilanContent === "Transaksi" && "text-white bg-gray-800"
          }`}
        >
          Transaksi
        </button>
      </li>
      <li className="me-2">
        <button
          onClick={() => handleChangeTab("Pelanggan")}
          className={`inline-block p-4 active:bg-blue-900 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 ${
            tampilanContent === "Pelanggan" && "text-white bg-gray-800"
          }`}
        >
          Pelanggan
        </button>
      </li>
      <li className="me-2">
        <button
          onClick={() => handleChangeTab("Mobil")}
          className={`inline-block p-4 active:bg-blue-900 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 ${
            tampilanContent === "Mobil" && "text-white bg-gray-800"
          }`}
        >
          Mobil
        </button>
      </li>
      <li className="me-2">
        <button
          onClick={() => handleChangeTab("Pembayaran")}
          className={`inline-block p-4 active:bg-blue-900 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 ${
            tampilanContent === "Pembayaran" && "text-white bg-gray-800"
          }`}
        >
          Pembayaran
        </button>
      </li>
      <li className="me-2">
        <button
          onClick={() => handleChangeTab("Pengembalian")}
          className={`inline-block p-4 active:bg-blue-900 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 ${
            tampilanContent === "Pengembalian" && "text-white bg-gray-800"
          }`}
        >
          Pengembalian
        </button>
      </li>
    </ul>
  );
};

export default Tab;
