const urlSampulBuku = (namaFile) =>
  new URL(`../image/cover/${namaFile}`, document.currentScript.src).href;

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
  },
  'asterwood': {
    judul: 'Asterwood',
    pengarang: 'Jacquelyn Stolos',
    sampul: urlSampulBuku('cover07.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'sobotta-edisi-24': {
    judul: 'Sobotta: Kepala, Leher, dan Neuroanatomi',
    pengarang: 'Friedrich Paulsen & Jens Waschke',
    sampul: urlSampulBuku('cover08.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'sobotta-organ-interna': {
    judul: 'Sobotta: Organ Interna',
    pengarang: 'Friedrich Paulsen & Jens Waschke',
    sampul: urlSampulBuku('cover09.webp'),
    kategori: 'Kesehatan',
    jenis: 'Buku Cetak'
  },
  'sobotta-anatomi-umum': {
    judul: 'Sobotta: Anatomi Umum dan Sistem Muskuloskeletal',
    pengarang: 'Friedrich Paulsen & Jens Waschke',
    sampul: urlSampulBuku('cover10.webp'),
    kategori: 'Kesehatan',
    jenis: 'Buku Cetak'
  },
  'pengantar-teknologi-informasi': {
    judul: 'Pengantar Teknologi Informasi dan Komunikasi',
    pengarang: 'Bagaskoro S., S.Kom., M.M.',
    sampul: urlSampulBuku('cover11.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'laut-kecewa': {
    judul: 'Laut Bercerita',
    pengarang: 'Leila S. Chudori',
    sampul: urlSampulBuku('cover12.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  kalkulus: {
    judul: 'Kalkulus Integral Berbasis Maple',
    pengarang: 'Belum dicantumkan',
    sampul: urlSampulBuku('cover13.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'dasar-dasar-kalkulus': {
    judul: 'Dasar-dasar Kalkulus',
    pengarang: 'Handriani Kristiani',
    sampul: urlSampulBuku('cover14.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'jan-shen': {
    judul: 'Jan Shen',
    pengarang: 'Risa Saraswati',
    sampul: urlSampulBuku('cover15.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-kamar-rahasia': {
    judul: 'Harry Potter dan Kamar Rahasia',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover20.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-orde-phoenix': {
    judul: 'Harry Potter dan Orde Phoenix',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover18.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-pangeran-berdarah': {
    judul: 'Harry Potter dan Pangeran Berdarah-Campuran',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover18.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-tawanan-azkaban': {
    judul: 'Harry Potter dan Tawanan Azkaban',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover22.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-piala-api': {
    judul: 'Harry Potter dan Piala Api',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover17.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-relikui-kematian': {
    judul: 'Harry Potter dan Relikui Kematian',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover16.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'harry-potter-batu-bertuah': {
    judul: 'Harry Potter dan Batu Bertuah',
    pengarang: 'J.K. Rowling',
    sampul: urlSampulBuku('cover21.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'gadis-kretek': {
    judul: 'Gadis Kretek',
    pengarang: 'Ratih Kumala',
    sampul: urlSampulBuku('cover23.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'fisika-modern': {
    judul: 'Fisika Modern',
    pengarang: 'Indrajit',
    sampul: urlSampulBuku('cover24.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'filsafat-dan-filsafat-ilmu': {
    judul: 'Filsafat dan Filsafat Ilmu',
    pengarang: 'Isfaroh, M.Ag.',
    sampul: urlSampulBuku('cover25.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'filsafat-ilmu': {
    judul: 'Filsafat Ilmu',
    pengarang: 'Prof. Dr. Amsal Bakhtiar',
    sampul: urlSampulBuku('cover26.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'enola-holmes': {
    judul: 'Enola Holmes dan Misteri Marquess',
    pengarang: 'Nancy Springer',
    sampul: urlSampulBuku('cover27.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  dilan: {
    judul: 'Dilan: Dia adalah Dilanku Tahun 1990',
    pengarang: 'Pidi Baiq',
    sampul: urlSampulBuku('cover28.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'dasar-dasar-teknik-informatika': {
    judul: 'Dasar-Dasar Teknik Informatika',
    pengarang: 'Novega Pratama Adiputra',
    sampul: urlSampulBuku('cover29.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'kligo-higashino': {
    judul: 'Black Showman dan Pembunuhan di Kota Tak Bernama',
    pengarang: 'Keigo Higashino',
    sampul: urlSampulBuku('cover30.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  }
};
