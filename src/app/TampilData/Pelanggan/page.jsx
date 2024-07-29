"use client";

import ContentPelanggan from "@/app/components/PanelContent/ContentPelanggan";
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
      fetch("http://localhost:3000/api/pelanggan").then((res) => {
        res.json().then(({ data }) => {
          setDisplay(data);
          console.log(display);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  

  return (
    <div>
      <ContentPelanggan data={filteredDisplay} />
    </div>
  );
};

export default page;
