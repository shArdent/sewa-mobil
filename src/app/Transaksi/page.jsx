"use client";

import { useEffect, useState } from "react";

const page = () => {
  const [mobils, setMobils] = useState([]);
  const [pelanggans, setPelanggans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idPelanggan, setIdPelanggan] = useState(0);
  const [idMobil, setIdMobil] = useState(0);

  const handleChangeIdPelanggan = (e) => {
    setIdPelanggan(e.target.value);
  };
  const handleChangeIdMobil = (e) => {
    setIdMobil(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/mobil/all-rekomen").then((res) => {
      res.json().then(({ data }) => {
        setMobils(data);
      });
    });

    fetch("http://localhost:3000/api/pelanggan").then((res) => {
      res.json().then(({ data }) => {
        setPelanggans(data);
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idMobil == 0 || idPelanggan == 0) {
      alert("Pilih mobil dan pelanggan terlebih dahulu");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.target);
    const target = pelanggans.find(
      (pelanggan) => pelanggan.id_pelanggan === parseInt(idPelanggan)
    );
    const dataTransaksi = {
      id_pelanggan: parseInt(idPelanggan),
      id_mobil: parseInt(idMobil),
      nama_lengkap: target?.nama_lengkap,
      tgl_sewa: new Date(formData.get("tgl_sewa")),
      tgl_pengembalian: new Date(formData.get("tgl_pengembalian")),
    };
    try {
      const res = await fetch("http://localhost:3000/api/transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTransaksi),
      });
      alert("Berhasil Ditambahkan");
      e.target.reset();
    } catch (error) {
      alert("Gagal Ditambahkan");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full px-16 py-10 ml-auto h-auto flex flex-col justify-start">
      <h1 className="text-4xl underline italic">Input Transaksi</h1>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-8">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 gap-y-8 text-sm grid-cols-1 md:grid-cols-6"
          >
            <div className="md:col-span-6">
              <label htmlFor="merk">Pelanggan</label>
              <select
                name="status_pengembalian"
                id="status_pengembalian "
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                onChange={handleChangeIdPelanggan}
              >
                <option>Pilih...</option>
                {pelanggans?.map((pelanggan) => (
                  <option
                    key={pelanggan.id_pelanggan}
                    value={pelanggan.id_pelanggan}
                  >
                    {pelanggan.nama_lengkap}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-6">
              <label htmlFor="id_mobil">Mobil</label>
              <select
                defaultValue={"Select..."}
                name="status_pengembalian"
                id="status_pengembalian "
                className="h-10 border mt-1 rounded px-4 w-full text-black bg-gray-50"
                onChange={handleChangeIdMobil}
              >
                <option>Pilih...</option>
                {mobils?.map((mobil) => (
                  <option key={mobil.id_mobil} value={mobil.id_mobil}>
                    {mobil.merk}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="tgl_sewa">Tanggal Sewa</label>
              <div className="flex items-center">
                <input
                  type="date"
                  name="tgl_sewa"
                  id="tgl_sewa"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder=""
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="tgl_pengembalian">Tanggal Pengembalian</label>
              <input
                type="date"
                name="tgl_pengembalian"
                id="tgl_pengembalian"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Hitam"
              />
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
