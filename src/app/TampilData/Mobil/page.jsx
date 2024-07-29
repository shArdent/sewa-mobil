"use client";

import ContentMobil from "../../components/PanelContent/ContentMobil";
import { useSearchFilterStore } from "../../../libs/store";
import { useEffect, useState } from "react";

const page = () => {
  const searchFilter = useSearchFilterStore((state) => state.searchFilter);
  const [display, setDisplay] = useState([]);
  const [filteredDisplay, setFilteredDisplay] = useState([]);
  const [displayRekomendasi, setDisplayRekomendasi] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/mobil").then((res) => {
        res.json().then(({ data }) => {
          setDisplay(data);
          console.log(display);
        });
      });

      fetch("http://localhost:3000/api/mobil/rekomen").then((res) => {
        res.json().then(({ data }) => {
          setDisplayRekomendasi(data);
          console.log(display);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setFilteredDisplay(
      display.filter((car) =>
        car.merk.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  }, [searchFilter, display]);
  return (
    <div>
      <ContentMobil cars={filteredDisplay} rekomendasi={displayRekomendasi}/>
    </div>
  );
};

export default page;
