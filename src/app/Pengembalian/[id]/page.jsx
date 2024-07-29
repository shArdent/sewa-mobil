"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailPengembalian, setDetailPengembalian] = useState({});
  const [statusKembali, setStatusKembali] = useState("Tepat Waktu");

  const handleChangeStatusKembali = (e) => {
    setStatusKembali(e.target.value);
  };
  const router = useRouter();

  const id = params.id;

  useEffect(() => {
    fetch(`http://localhost:3000/api/pengembalian/${id}`).then((res) =>
      res.json().then(({ data }) => {
        setDetailPengembalian(data);
        const tgl = data.tgl_pengembalian.split("T")[0];

        setDetailPengembalian((prev) => ({ ...prev, tgl_pengembalian: tgl }));
      })
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataPengembalian = {
      id_transaksi: parseInt(formData.get("id_transaksi")),
      tgl_pengembalian: new Date(formData.get("tgl_pengembalian")),
      status_pengembalian: statusKembali,
    };
    try {
      const res = await fetch("http://localhost:3000/api/pengembalian", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPengembalian),
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
      <h1 className="text-4xl underline italic">Update Pengembalian</h1>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-8">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 gap-y-8 text-sm grid-cols-1 md:grid-cols-6"
          >
            <div className="md:col-span-3">
              <label htmlFor="id_transaksi">ID Transaksi</label>
              <input
                type="text"
                name="id_transaksi"
                id="id_transaksi"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                placeholder=""
                defaultValue={detailPengembalian?.id_transaksi}
                disabled
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="tgl_pengembalian">Tanggal Pengembalian</label>
              <input
                type="date"
                name="tgl_pengembalian"
                id="tgl_pengembalian"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
                defaultValue={detailPengembalian?.tgl_pengembalian}
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="status_pengembalian">Status Pengembalian</label>
              <div className="flex items-center">
                <select
                  name="status_pengembalian"
                  id="status_pengembalian "
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={handleChangeStatusKembali}
                  defaultValue={statusKembali}
                >
                  <option value="Tepat Waktu">Tepat Waktu</option>
                  <option value="Terlambat">Terlambat</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-3"></div>

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
