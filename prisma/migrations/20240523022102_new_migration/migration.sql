-- CreateTable
CREATE TABLE "admin" (
    "id_admin" SERIAL NOT NULL,
    "username" VARCHAR(20),
    "password" VARCHAR(20),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "mobil" (
    "id_mobil" SERIAL NOT NULL,
    "merk" VARCHAR(50),
    "no_polisi" VARCHAR(10),
    "warna" VARCHAR(50),
    "harga" DOUBLE PRECISION,
    "status" TEXT,

    CONSTRAINT "mobil_pkey" PRIMARY KEY ("id_mobil")
);

-- CreateTable
CREATE TABLE "pelanggan" (
    "id_pelanggan" SERIAL NOT NULL,
    "no_ktp" VARCHAR(50),
    "nama_lengkap" VARCHAR(100),
    "alamat_pelanggan" TEXT,
    "no_telepon" VARCHAR(20),
    "status_peminjaman" TEXT,

    CONSTRAINT "pelanggan_pkey" PRIMARY KEY ("id_pelanggan")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id_pembayaran" SERIAL NOT NULL,
    "id_transaksi" INTEGER,
    "tgl_pembayaran" DATE,
    "nama_lengkap" TEXT,
    "jenis_pembayaran" VARCHAR(20),
    "no_rek" VARCHAR(10),
    "total_pembayaran" DOUBLE PRECISION,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id_pembayaran")
);

-- CreateTable
CREATE TABLE "pengembalian" (
    "id_pengembalian" SERIAL NOT NULL,
    "id_transaksi" INTEGER,
    "status_pengembalian" VARCHAR(20),
    "denda" DOUBLE PRECISION,

    CONSTRAINT "pengembalian_pkey" PRIMARY KEY ("id_pengembalian")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "id_mobil" INTEGER,
    "id_pelanggan" INTEGER,
    "nama_lengkap" TEXT,
    "tgl_sewa" DATE,
    "tgl_pengembalian" DATE,
    "harga" DOUBLE PRECISION,
    "status_pembayaran" VARCHAR(20),
    "denda" DOUBLE PRECISION,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "transaksi"("id_transaksi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pengembalian" ADD CONSTRAINT "pengembalian_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "transaksi"("id_transaksi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_mobil_fkey" FOREIGN KEY ("id_mobil") REFERENCES "mobil"("id_mobil") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "pelanggan"("id_pelanggan") ON DELETE NO ACTION ON UPDATE NO ACTION;
