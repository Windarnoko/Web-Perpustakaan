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
    sampul: urlSampulBuku('cover19.webp'),
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
  },
  watersong: {
    judul: 'Watersong',
    pengarang: 'Clarissa Goenawan',
    sampul: urlSampulBuku('cover31.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'master-book-toefl': {
    judul: 'Master Book Grammar TOEFL Terlengkap',
    pengarang: 'Muhammad Kodim',
    sampul: urlSampulBuku('cover32.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'the-star-and-i': {
    judul: 'The Star and I',
    pengarang: 'Ilana Tan',
    sampul: urlSampulBuku('cover33.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'perfect-world-miwako-sumida': {
    judul: 'The Perfect World of Miwako Sumida',
    pengarang: 'Clarissa Goenawan',
    sampul: urlSampulBuku('cover34.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'the-paper-magician': {
    judul: 'The Paper Magician',
    pengarang: 'Charlie N. Holmberg',
    sampul: urlSampulBuku('cover35.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'the-dragon-republic': {
    judul: 'The Dragon Republic',
    pengarang: 'R. F. Kuang',
    sampul: urlSampulBuku('cover36.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'teruslah-bodoh-jangan-pintar': {
    judul: 'Teruslah Bodoh Jangan Pintar',
    pengarang: 'Tere Liye',
    sampul: urlSampulBuku('cover37.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'pengantar-teori-ekonomi': {
    judul: 'Pengantar Teori Ekonomi',
    pengarang: 'Suherman Rosyidi',
    sampul: urlSampulBuku('cover38.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  sumur: {
    judul: 'Sumur',
    pengarang: 'Eka Kurniawan',
    sampul: urlSampulBuku('cover39.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'sherlock-holmes-koleksi-kasus-1': {
    judul: 'Sherlock Holmes: Koleksi Kasus 1',
    pengarang: 'Sir Arthur Conan Doyle',
    sampul: urlSampulBuku('cover40.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'shadow-and-bone': {
    judul: 'Shadow and Bone',
    pengarang: 'Leigh Bardugo',
    sampul: urlSampulBuku('cover41.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'second-sister': {
    judul: 'Second Sister',
    pengarang: 'Chan Ho-Kei',
    sampul: urlSampulBuku('cover42.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'sang-keris': {
    judul: 'Sang Keris',
    pengarang: 'Panji Sukma',
    sampul: urlSampulBuku('cover43.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'rumah-kaca': {
    judul: 'Rumah Kaca',
    pengarang: 'Pramoedya Ananta Toer',
    sampul: urlSampulBuku('cover44.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'ronggeng-dukuh-paruk': {
    judul: 'Ronggeng Dukuh Paruk',
    pengarang: 'Ahmad Tohari',
    sampul: urlSampulBuku('cover45.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  rainbirds: {
    judul: 'Rainbirds',
    pengarang: 'Clarissa Goenawan',
    sampul: urlSampulBuku('cover46.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'pulang-pergi': {
    judul: 'Pulang-Pergi',
    pengarang: 'Tere Liye',
    sampul: urlSampulBuku('cover47.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'bahasa-prancis-itu-mudah': {
    judul: 'Bahasa Prancis Itu Mudah',
    pengarang: 'Isna Fatmawati',
    sampul: urlSampulBuku('cover48.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'politik-partai-perempuan': {
    judul: 'Politik, Partai Politik, & Perempuan',
    pengarang: 'Imron Wasi',
    sampul: urlSampulBuku('cover49.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'politik-kebijakan-publik': {
    judul: 'Politik dan Kebijakan Publik',
    pengarang: 'Amir Muhiddin, Rudi Hardi & Syamsidah',
    sampul: urlSampulBuku('cover50.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'pendosa-merindukan-tuhan': {
    judul: 'Pendosa yang Merindukan Tuhan',
    pengarang: 'Yoga Maulana',
    sampul: urlSampulBuku('cover51.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'matematika-diskret': {
    judul: 'Matematika Diskret',
    pengarang: 'Seng Hansun',
    sampul: urlSampulBuku('cover52.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'make-it-mine': {
    judul: 'Make It Mine',
    pengarang: 'Indah Juni',
    sampul: urlSampulBuku('cover53.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'makanya-mikir': {
    judul: 'Makanya, Mikir!',
    pengarang: 'Abigail Limuria & Cania Citta',
    sampul: urlSampulBuku('cover54.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'lima-cerita': {
    judul: 'Lima Cerita: Kisah-kisah Menjadi Dewasa',
    pengarang: 'Desi Anwar',
    sampul: urlSampulBuku('cover55.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  legenda: {
    judul: 'Legenda',
    pengarang: 'Rafani Nur Aeni',
    sampul: urlSampulBuku('cover56.webp'),
    kategori: 'Fantasi',
    jenis: 'Buku Cetak'
  },
  'belajar-bahasa-korea': {
    judul: 'Buku Praktis Belajar Bahasa Korea',
    pengarang: 'Riskinanda Maharani',
    sampul: urlSampulBuku('cover57.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'bank-gaib': {
    judul: 'Kisah Tanah Jawa: Bank Gaib',
    pengarang: 'Kisah Tanah Jawa',
    sampul: urlSampulBuku('cover58.webp'),
    kategori: 'Misteri',
    jenis: 'Buku Cetak'
  },
  'simple-book-bahasa-jerman': {
    judul: 'Simple Book Bahasa Jerman',
    pengarang: 'Cahya Ardhika N. & Chilla Anugrah O.',
    sampul: urlSampulBuku('cover59.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'kuasai-bahasa-jepang-n5': {
    judul: 'Kuasai Bahasa Jepang N5',
    pengarang: 'Kang Sam',
    sampul: urlSampulBuku('cover60.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'pengantar-ilmu-ekonomi': {
    judul: 'Pengantar Ilmu Ekonomi',
    pengarang: 'Aswanto & H. Yurnal Edward',
    sampul: urlSampulBuku('cover61.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'ielts-academic-16': {
    judul: 'IELTS Academic 16 with Answers',
    pengarang: 'Cambridge University Press',
    sampul: urlSampulBuku('cover62.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'fisika-dasar-1': {
    judul: 'Fisika Dasar 1',
    pengarang: 'Astuti Salim & Suryani Taib',
    sampul: urlSampulBuku('cover63.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'filosofi-teras': {
    judul: 'Filosofi Teras',
    pengarang: 'Henry Manampiring',
    sampul: urlSampulBuku('cover64.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  carstenz: {
    judul: 'Carstenz',
    pengarang: 'Doni Nurdiansyah',
    sampul: urlSampulBuku('cover65.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'cake-shop': {
    judul: 'Cake Shop',
    pengarang: 'Nana S.',
    sampul: urlSampulBuku('cover66.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'cake-shop-extended': {
    judul: 'Cake Shop: Extended Version',
    pengarang: 'Nana S.',
    sampul: urlSampulBuku('cover67.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  'belajar-bahasa-inggris': {
    judul: 'Buku Praktis Belajar Bahasa Inggris',
    pengarang: 'Wahidah Murriska',
    sampul: urlSampulBuku('cover68.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'bahasa-indonesia-menulis': {
    judul: 'Bahasa Indonesia: Pengantar Dasar Menulis di Perguruan Tinggi',
    pengarang: 'Nina & Ahyati Kurniamala N.',
    sampul: urlSampulBuku('cover69.webp'),
    kategori: 'Pendidikan',
    jenis: 'Buku Cetak'
  },
  'anonymous-crush': {
    judul: 'Anonymous Crush',
    pengarang: 'Haniifah',
    sampul: urlSampulBuku('cover70.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  },
  aku: {
    judul: 'Aku: Berdasarkan Perjalanan Hidup dan Karya Penyair Chairil Anwar',
    pengarang: 'Sjuman Djaya',
    sampul: urlSampulBuku('cover71.webp'),
    kategori: 'Fiksi',
    jenis: 'Buku Cetak'
  }
};
