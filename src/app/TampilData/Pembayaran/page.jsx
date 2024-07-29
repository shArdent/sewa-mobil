"use client"

import ContentPembayaran from "@/app/components/PanelContent/ContentPembayaran";
import { useSearchFilterStore } from "@/libs/store";
import { useEffect, useState } from "react";

const page = () => {
  const [display, setDisplay] = useState([]);

  const [filteredDisplay, setFilteredDisplay] = useState([]);
  const searchFilter = useSearchFilterStore((state) => state.searchFilter);

  useEffect(() => {
    setFilteredDisplay(
      display.filter((pelanggan) =>
        pelanggan.nama_lengkap.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  }, [searchFilter, display]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/pembayaran").then((res) => {
        res.json().then(({ data }) => {
          setDisplay(data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <ContentPembayaran data={filteredDisplay} />
    </div>
  );
};

export default page;