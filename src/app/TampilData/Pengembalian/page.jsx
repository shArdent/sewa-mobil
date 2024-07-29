"use client";

import ContentPengembalian from "@/app/components/PanelContent/ContentPengembalian";
import { useSearchFilterStore } from "@/libs/store";
import { useEffect, useState } from "react";


const page = () => {
  const [display, setDisplay] = useState([]);

  const [filteredDisplay, setFilteredDisplay] = useState([]);
  const searchFilter = useSearchFilterStore((state) => state.searchFilter);

  useEffect(() => {
    setFilteredDisplay(
      display.filter((pelanggan) =>
        pelanggan.transaksi.nama_lengkap
          .toLowerCase()
          .includes(searchFilter.toLowerCase())
      )
    );
  }, [searchFilter, display]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/pengembalian").then((res) => {
        res.json().then(({ data }) => {
          const mapped = data.map((item) => {
            return {
              ...item,
              tgl_pengembalian: item.tgl_pengembalian.split("T")[0],
            };
          });

          setDisplay(mapped);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <ContentPengembalian data={filteredDisplay ? filteredDisplay : display} />
    </div>
  );
};

export default page;
