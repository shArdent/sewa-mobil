"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailPembayaran, setDetailPembayaran] = useState({});

  const router = useRouter();

  const id = params.id;

  useEffect(() => {
    fetch(`http://localhost:3000/api/pembayaran/${id}`).then((res) =>
      res.json().then(({ data }) => {
        setDetailPembayaran(data);
        const tgl = data.tgl_pembayaran.split("T")[0];

        setDetailPembayaran((prev) => ({ ...prev, tgl_pembayaran: tgl }));
      })
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const dataPembayaran = {
      nama_lengkap: formData.get("nama_lengkap"),
      jenis_pembayaran: formData.get("jenis_pembayaran"),
      no_rek: formData.get("no_rek"),
      tgl_pembayaran: new Date(formData.get("tgl_pembayaran")),
      id_transaksi: parseInt(formData.get("id_transaksi")),
    };
    try {
      const res = await fetch(`http://localhost:3000/api/pembayaran/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPembayaran),
      });

      alert("Berhasil Diupdate");

      window.location.reload();
    } catch (error) {
      alert("Gagal Diupdate");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full px-16 py-10 ml-auto h-auto flex flex-col justify-start">
      <h1 className="text-4xl underline italic">Update Pembayaran</h1>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-8">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 gap-y-8 text-sm grid-cols-1 md:grid-cols-6"
          >
            <div className="md:col-span-6">
              <label htmlFor="nama_lengkap">Nama Lengkap</label>
              <input
                type="text"
                name="nama_lengkap"
                id="nama_lengkap"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Nama Penyewa"
                defaultValue={detailPembayaran?.nama_lengkap}
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="jenis_pembayaran">Jenis Pembayaran</label>
              <input
                type="text"
                name="jenis_pembayaran"
                id="jenis_pembayaran"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Tunai/Transfer"
                defaultValue={detailPembayaran?.jenis_pembayaran}
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="no_rek">No Rek (Opsioanl)</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="no_rek"
                  id="no_rek"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder=""
                  defaultValue={detailPembayaran?.no_rek}
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="tgl_pembayaran">Tanggal Pembayaran</label>
              <input
                type="date"
                name="tgl_pembayaran"
                id="tgl_pembayaran"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
                defaultValue={detailPembayaran?.tgl_pembayaran}
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="id_trans2ksi">ID Transaksi</label>
              <div className="h-10 bg-gray-200 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="id_transaksi"
                  id="id_transaksi"
                  placeholder=""
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  defaultValue={detailPembayaran?.id_transaksi}
                  disabled
                />
              </div>
            </div>

            <div className="md:col-span-6 flex justify-end">
              <div className="inline-flex items-end gap-8">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-600 w-[5.1rem] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
