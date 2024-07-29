"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailPelanggan, setDetailPelanggan] = useState({});
  const router = useRouter();

  const id = params.id;

  useEffect(() => {
    fetch(`http://localhost:3000/api/pelanggan/${id}`).then((res) =>
      res.json().then(({ data }) => {
        setDetailPelanggan(data);
      })
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const dataPelanggan = {
      nama_lengkap: formData.get("nama_lengkap"),
      no_ktp: formData.get("no_ktp"),
      no_telepon: formData.get("no_telepon"),
      alamat_pelanggan: formData.get("alamat_pelanggan"),
    };
    try {
      const res = await fetch(`http://localhost:3000/api/pelanggan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPelanggan),
      });

      alert("Berhasil Diupdate");
      e.target.reset();
    } catch (error) {
      alert("Gagal Diupdate");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full px-16 py-10 ml-auto h-auto flex flex-col justify-start">
      <h1 className="text-4xl underline italic">Update Pelanggan</h1>
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
                placeholder="Nama Lengkap Anda"
                defaultValue={detailPelanggan?.nama_lengkap}
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="no_ktp">No KTP</label>
              <input
                type="text"
                name="no_ktp"
                id="no_ktp"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="3205xxxxxxxxx"
                defaultValue={detailPelanggan?.no_ktp}
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="no_telepon">No Telepon</label>
              <input
                type="text"
                name="no_telepon"
                id="no_telepon"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="08xxxxxx"
                defaultValue={detailPelanggan?.no_telepon}
              />
            </div>

            <div className="md:col-span-6">
              <label htmlFor="alamat_pelanggan">Alamat</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="alamat_pelanggan"
                  id="alamat_pelanggan"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder=""
                  defaultValue={detailPelanggan?.alamat_pelanggan}
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
