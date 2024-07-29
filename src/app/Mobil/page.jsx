"use client";

import { useState } from "react";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const dataMobil = {
      merk: formData.get("merk"),
      no_polisi: formData.get("no_pol"),
      warna: formData.get("warna"),
      harga_sehari: parseFloat(formData.get("harga_perhari")),
      tahun_keluar: parseInt(formData.get("tahun_keluar")),
    };
    try {
      const res = await fetch("http://localhost:3000/api/mobil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMobil),
      });

      e.target.reset();
      alert("Berhasil Ditambahkan");
    } catch (error) {
      alert("Gagal Ditambahkan");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full px-16 py-10 ml-auto h-auto flex flex-col justify-start">
      <h1 className="text-4xl underline italic">Input Mobil</h1>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-8">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 gap-y-8 text-sm grid-cols-1 md:grid-cols-6"
          >
            <div className="md:col-span-6">
              <label htmlFor="merk">Tipe Mobil</label>
              <input
                type="text"
                name="merk"
                id="merk"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Toyota Avanza"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="no_pol">No Polisi</label>
              <input
                type="text"
                name="no_pol"
                id="no_pol"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="A 1234 BCD"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="harga_perhari">Harga per Hari</label>
              <div className="flex items-center">
                <h2 className="mr-2 text-base">Rp.</h2>
                <input
                  type="number"
                  name="harga_perhari"
                  id="harga_perhari"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="500000"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="warna">Warna</label>
              <input
                type="text"
                name="warna"
                id="warna"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Hitam"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="tahun_keluar">Tahun Keluaran</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="tahun_keluar"
                  id="tahun_keluar"
                  placeholder="2018"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                />
              </div>
            </div>

            <div className="md:col-span-1 text-start">
              <div className="inline-flex items-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
