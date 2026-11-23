const daftarPeminjamanElemen = document.querySelector('#daftar-peminjaman');
const peminjamanKosong = document.querySelector('#peminjaman-kosong');
const panelPilihInfo = document.querySelector('#panel-pilih-info');
const panelDetail = document.querySelector('#panel-detail-perpanjangan');
const pilihanDurasi = document.querySelector('#durasi-perpanjangan');
const pesanPerpanjangan = document.querySelector('#pesan-perpanjangan');
const pesanGagalMuat = document.querySelector('#pesan-gagal-muat');
const idPeminjamanDiminta = new URLSearchParams(window.location.search).get('pinjaman');
let daftarPeminjaman = [];
let idPeminjamanDipilih = null;

function tanggalLokal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number);
  return new Date(tahun, bulan - 1, hari);
}

function formatTanggal(tanggal) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(tanggalLokal(tanggal));
}

function formatTanggalISO(tanggal) {
  return [
    tanggal.getFullYear(),
    String(tanggal.getMonth() + 1).padStart(2, '0'),
    String(tanggal.getDate()).padStart(2, '0')
  ].join('-');
}

function tambahHari(tanggal, jumlahHari) {
  const hasil = tanggalLokal(tanggal);
  hasil.setDate(hasil.getDate() + jumlahHari);
  return formatTanggalISO(hasil);
}

function hitungSisaHari(jatuhTempo) {
  const hariIni = new Date();
  const hariTempo = tanggalLokal(jatuhTempo);
  const hariIniUTC = Date.UTC(hariIni.getFullYear(), hariIni.getMonth(), hariIni.getDate());
  const hariTempoUTC = Date.UTC(hariTempo.getFullYear(), hariTempo.getMonth(), hariTempo.getDate());
  return Math.round((hariTempoUTC - hariIniUTC) / 86400000);
}

function dapatkanBuku(peminjaman) {
  if (Object.prototype.hasOwnProperty.call(window.dataBukuPerpustakaan, peminjaman.bookId)) {
    return window.dataBukuPerpustakaan[peminjaman.bookId];
  }
  return {
    judul: 'Buku tidak ditemukan di katalog',
    pengarang: 'Informasi belum tersedia',
    sampul: 'image/buku.webp',
    kategori: 'Belum tersedia',
    jenis: 'Buku'
  };
}

function teksStatus(sisaHari) {
  if (sisaHari < 0) {
    return { label: 'Terlambat', kelas: 'terlambat' };
  }
  if (sisaHari === 0) {
    return { label: 'Jatuh tempo hari ini', kelas: 'segera' };
  }
  if (sisaHari === 1) {
    return { label: 'Jatuh tempo besok', kelas: 'segera' };
  }
  return { label: `Sisa ${sisaHari} hari`, kelas: 'aman' };
}

function buatElemen(tag, kelas, teks) {
  const elemen = document.createElement(tag);
  if (kelas) {
    elemen.className = kelas;
  }
  if (teks) {
    elemen.textContent = teks;
  }
  return elemen;
}

function buatKartu(peminjaman) {
  const buku = dapatkanBuku(peminjaman);
  const sisaHari = hitungSisaHari(peminjaman.jatuhTempo);
  const status = teksStatus(sisaHari);
  const terpilih = peminjaman.id === idPeminjamanDipilih;
  const kartu = buatElemen('article', `kartu-peminjaman${terpilih ? ' terpilih' : ''}`);
  const sampul = document.createElement('img');
  sampul.src = buku.sampul;
  sampul.alt = `Sampul ${buku.judul}`;
  kartu.appendChild(sampul);

  const info = buatElemen('div', 'kartu-peminjaman-info');
  info.appendChild(buatElemen('span', `status-pinjam ${status.kelas}`, status.label));
  info.appendChild(buatElemen('h2', '', buku.judul));
  info.appendChild(buatElemen('p', 'peminjaman-pengarang', buku.pengarang));

  const metadata = buatElemen('dl', 'peminjaman-metadata');
  [
    ['Kategori', buku.kategori],
    ['Jenis', buku.jenis],
    ['ISBN', 'Belum dicantumkan'],
    ['Lokasi rak', 'Belum dicantumkan']
  ].forEach(([label, nilai]) => {
    const baris = document.createElement('div');
    baris.appendChild(buatElemen('dt', '', label));
    baris.appendChild(buatElemen('dd', '', nilai));
    metadata.appendChild(baris);
  });
  info.appendChild(metadata);
  kartu.appendChild(info);

  const aksi = buatElemen('div', 'kartu-peminjaman-aksi');
  if (sisaHari >= 0 && peminjaman.sisaPerpanjangan > 0) {
    const tombol = buatElemen('button', terpilih ? 'dipilih' : '', terpilih ? 'Dipilih' : 'Perpanjang');
    tombol.type = 'button';
    tombol.disabled = terpilih;
    tombol.setAttribute('aria-pressed', String(terpilih));
    tombol.addEventListener('click', () => {
      idPeminjamanDipilih = peminjaman.id;
      pesanPerpanjangan.hidden = true;
      render();
    });
    aksi.appendChild(tombol);
  } else if (peminjaman.sisaPerpanjangan === 0 && sisaHari >= 0) {
    aksi.appendChild(buatElemen('span', 'status-kuota-habis', 'Kuota habis'));
  } else {
    aksi.appendChild(buatElemen('span', 'status-kuota-habis', 'Tidak dapat diperpanjang'));
  }
  kartu.appendChild(aksi);
  return kartu;
}

function renderPanel() {
  const peminjaman = daftarPeminjaman.find((item) => item.id === idPeminjamanDipilih);
  if (!peminjaman) {
    panelDetail.hidden = true;
    panelPilihInfo.hidden = false;
    return;
  }

  const buku = dapatkanBuku(peminjaman);
  const sisaHari = hitungSisaHari(peminjaman.jatuhTempo);
  const status = teksStatus(sisaHari);
  document.querySelector('#panel-sampul').src = buku.sampul;
  document.querySelector('#panel-sampul').alt = `Sampul ${buku.judul}`;
  document.querySelector('#panel-judul').textContent = buku.judul;
  document.querySelector('#panel-pengarang').textContent = buku.pengarang;
  document.querySelector('#panel-status').textContent = status.label;
  document.querySelector('#panel-status').className = `status-peminjaman ${status.kelas}`;
  document.querySelector('#panel-jatuh-tempo').textContent = formatTanggal(peminjaman.jatuhTempo);
  document.querySelector('#panel-kuota').textContent =
    `${peminjaman.sisaPerpanjangan} kali (simulasi)`;
  document.querySelector('#panel-jatuh-tempo-baru').textContent =
    formatTanggal(tambahHari(peminjaman.jatuhTempo, Number(pilihanDurasi.value)));

  const tombolAjukan = document.querySelector('#ajukan-perpanjangan');
  tombolAjukan.disabled = sisaHari < 0 || peminjaman.sisaPerpanjangan < 1;
  panelDetail.hidden = false;
  panelPilihInfo.hidden = true;
}

function render() {
  daftarPeminjamanElemen.querySelectorAll('.kartu-peminjaman').forEach((kartu) => kartu.remove());
  const adaPeminjaman = daftarPeminjaman.length > 0;
  peminjamanKosong.hidden = adaPeminjaman;
  daftarPeminjaman.forEach((peminjaman) => {
    daftarPeminjamanElemen.appendChild(buatKartu(peminjaman));
  });
  renderPanel();
}

try {
  daftarPeminjaman = window.penyimpananPeminjaman.baca();
  const pilihanDariURL = daftarPeminjaman.find((item) => item.id === idPeminjamanDiminta);
  const pilihanAwal = pilihanDariURL
    || daftarPeminjaman.find((item) =>
      hitungSisaHari(item.jatuhTempo) >= 0 && item.sisaPerpanjangan > 0)
    || daftarPeminjaman[0];
  idPeminjamanDipilih = pilihanAwal ? pilihanAwal.id : null;
  render();
} catch (error) {
  daftarPeminjamanElemen.hidden = true;
  panelPilihInfo.hidden = true;
  pesanGagalMuat.textContent =
    'Daftar peminjaman tidak dapat dibaca dari browser. Coba muat ulang atau hubungi petugas perpustakaan.';
  pesanGagalMuat.hidden = false;
}

pilihanDurasi.addEventListener('change', renderPanel);

document.querySelector('#ajukan-perpanjangan').addEventListener('click', () => {
  const peminjaman = daftarPeminjaman.find((item) => item.id === idPeminjamanDipilih);
  if (!peminjaman || hitungSisaHari(peminjaman.jatuhTempo) < 0 || peminjaman.sisaPerpanjangan < 1) {
    return;
  }

  const jatuhTempoSebelumnya = peminjaman.jatuhTempo;
  peminjaman.jatuhTempo = tambahHari(peminjaman.jatuhTempo, Number(pilihanDurasi.value));
  peminjaman.sisaPerpanjangan -= 1;

  try {
    window.penyimpananPeminjaman.simpan(daftarPeminjaman);
    render();
    pesanPerpanjangan.textContent =
      'Perubahan tersimpan di browser ini sebagai simulasi, tetapi belum dikirim ke perpustakaan.';
    pesanPerpanjangan.hidden = false;
  } catch (error) {
    peminjaman.jatuhTempo = jatuhTempoSebelumnya;
    peminjaman.sisaPerpanjangan += 1;
    pesanPerpanjangan.textContent =
      'Perpanjangan belum tersimpan. Penyimpanan browser tidak tersedia atau data peminjaman bermasalah.';
    pesanPerpanjangan.hidden = false;
  }
});
