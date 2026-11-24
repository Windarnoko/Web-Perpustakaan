const urlSampulBuku = (namaFile) =>
  new URL(`../image/${namaFile}`, document.currentScript.src).href;

window.dataBukuPerpustakaan = {
  'tokyo-zodiac': {
    judul: 'The Tokyo Zodiac Murders',
    pengarang: 'Soji Shimada',
    sampul: urlSampulBuku('cover1.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'good-girl-murder': {
    judul: "A Good Girl's Guide to Murder",
    pengarang: 'Holly Jackson',
    sampul: urlSampulBuku('cover2.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'teka-teki-gambar-aneh': {
    judul: 'Teka-Teki Gambar Aneh',
    pengarang: 'Uketsu',
    sampul: urlSampulBuku('cover3.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'kasus-honjin': {
    judul: 'Kasus Pembunuhan Honjin',
    pengarang: 'Seishi Yokomizo',
    sampul: urlSampulBuku('cover4.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'petaka-inugami': {
    judul: 'Petaka Keluarga Inugami',
    pengarang: 'Seishi Yokomizo',
    sampul: urlSampulBuku('cover5.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'hantu-rumah-kos': {
    judul: 'Hantu di Rumah Kos',
    pengarang: 'Dini W. Tamam & Erby S.',
    sampul: urlSampulBuku('cover6.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  tujuh: {
    judul: 'Tujuh',
    pengarang: 'Abdul Rasyid B Damanik',
    sampul: urlSampulBuku('baru1.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'kiri-sampai-sini': {
    judul: 'Kiri Sampai Sini',
    pengarang: 'Faroq Zamzami',
    sampul: urlSampulBuku('baru3.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  pulang: {
    judul: 'Pulang',
    pengarang: 'Tere Liye',
    sampul: urlSampulBuku('baru2.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  }
};
