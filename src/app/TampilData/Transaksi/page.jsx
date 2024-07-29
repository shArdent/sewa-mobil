"use client";

import ContentTransaksi from "@/app/components/PanelContent/ContentTransaksi";
import { useEffect, useState } from "react";

const page = () => {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/transaksi").then((res) => {
        res.json().then(({ data }) => {
          const mapped = data.map((item) => {
            return {
              ...item,
              tgl_sewa: item.tgl_sewa.split("T")[0],
              tgl_pengembalian: item.tgl_pengembalian.split("T")[0],
            };
          })


          setDisplay(mapped);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <ContentTransaksi data={display} />
    </div>
  );
};

export default page;
