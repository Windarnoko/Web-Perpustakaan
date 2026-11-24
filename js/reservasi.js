const parameterReservasi = new URLSearchParams(window.location.search);
const idReservasi = parameterReservasi.get('id');
const bukuReservasi = Object.prototype.hasOwnProperty.call(window.dataBukuPerpustakaan, idReservasi)
  ? window.dataBukuPerpustakaan[idReservasi]
  : null;
const halamanDataReservasi = document.querySelector('#reservasi-data');
const halamanRingkasan = document.querySelector('#reservasi-ringkasan');
const halamanTidakDitemukan = document.querySelector('#reservasi-tidak-ditemukan');
const formReservasi = document.querySelector('#form-reservasi');
const tanggalPengambilan = document.querySelector('#tanggal-pengambilan');
const lamaPeminjaman = document.querySelector('#lama-peminjaman');
const persetujuanKetentuan = document.querySelector('#setuju-ketentuan');
const pesanFormReservasi = document.querySelector('#pesan-form-reservasi');
const langkahData = document.querySelector('#tahap-data');
const langkahKonfirmasi = document.querySelector('#tahap-konfirmasi');
const stepperReservasi = document.querySelector('.reservasi-stepper');

function tanggalHariIni() {
  const hariIni = new Date();
  const tahun = hariIni.getFullYear();
  const bulan = String(hariIni.getMonth() + 1).padStart(2, '0');
  const hari = String(hariIni.getDate()).padStart(2, '0');
  return `${tahun}-${bulan}-${hari}`;
}

function tanggalValid(tanggal) {
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(tanggal || '');
  if (!cocok || tanggal < tanggalPengambilan.min) {
    return false;
  }

  const [tahun, bulan, hari] = cocok.slice(1).map(Number);
  const nilaiTanggal = new Date(tahun, bulan - 1, hari);
  return nilaiTanggal.getFullYear() === tahun
    && nilaiTanggal.getMonth() === bulan - 1
    && nilaiTanggal.getDate() === hari;
}

function formatTanggal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(tahun, bulan - 1, hari));
}

function tambahHari(tanggal, jumlahHari) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number);
  const tanggalBaru = new Date(tahun, bulan - 1, hari);
  tanggalBaru.setDate(tanggalBaru.getDate() + jumlahHari);
  return [
    tanggalBaru.getFullYear(),
    String(tanggalBaru.getMonth() + 1).padStart(2, '0'),
    String(tanggalBaru.getDate()).padStart(2, '0')
  ].join('-');
}

function buatUrlLangkah(langkah) {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('id', idReservasi);
  url.searchParams.set('langkah', langkah);

  const metode = formReservasi.querySelector('input[name="metode"]:checked');
  if (metode) {
    url.searchParams.set('metode', metode.value);
  }
  if (tanggalPengambilan.value) {
    url.searchParams.set('tanggal', tanggalPengambilan.value);
  }
  url.searchParams.set('durasi', lamaPeminjaman.value);
  if (persetujuanKetentuan.checked) {
    url.searchParams.set('setuju', '1');
  }

  return url.href;
}

function tampilkanLangkah(konfirmasi) {
  halamanDataReservasi.hidden = konfirmasi;
  halamanRingkasan.hidden = !konfirmasi;
  langkahData.classList.toggle('selesai', konfirmasi);
  langkahData.classList.toggle('aktif', !konfirmasi);
  langkahKonfirmasi.classList.toggle('aktif', konfirmasi);
  langkahData.setAttribute('aria-current', konfirmasi ? 'false' : 'step');
  langkahKonfirmasi.setAttribute('aria-current', konfirmasi ? 'step' : 'false');
}

if (!bukuReservasi) {
  halamanTidakDitemukan.hidden = false;
  halamanDataReservasi.hidden = true;
  halamanRingkasan.hidden = true;
  stepperReservasi.hidden = true;
} else {
  document.querySelector('#reservasi-sampul').src = bukuReservasi.sampul;
  document.querySelector('#reservasi-sampul').alt = `Sampul ${bukuReservasi.judul}`;
  document.querySelector('#reservasi-judul').textContent = bukuReservasi.judul;
  document.querySelector('#reservasi-pengarang').textContent = bukuReservasi.pengarang;
  document.querySelector('#reservasi-kategori').textContent = bukuReservasi.kategori;
  document.querySelector('#reservasi-jenis').textContent = bukuReservasi.jenis;
  document.querySelector('#ringkasan-sampul').src = bukuReservasi.sampul;
  document.querySelector('#ringkasan-sampul').alt = `Sampul ${bukuReservasi.judul}`;
  document.querySelector('#reservasi-ganti-buku').href = 'katalog.html';
  document.querySelector('#reservasi-kembali-detail').href =
    `detail-buku.html?id=${encodeURIComponent(idReservasi)}`;

  document.title = `Peminjaman ${bukuReservasi.judul} - Perpustakaan Kota Madiun`;
  tanggalPengambilan.min = tanggalHariIni();

  const tanggalTersimpan = parameterReservasi.get('tanggal');
  if (tanggalValid(tanggalTersimpan)) {
    tanggalPengambilan.value = tanggalTersimpan;
  }

  const durasiTersimpan = parameterReservasi.get('durasi');
  if (['7', '14', '21'].includes(durasiTersimpan)) {
    lamaPeminjaman.value = durasiTersimpan;
  }
  persetujuanKetentuan.checked = parameterReservasi.get('setuju') === '1';

  const langkahAwal = parameterReservasi.get('langkah');
  if (parameterReservasi.get('metode') === 'Perpustakaan') {
    formReservasi.querySelector('input[name="metode"]').checked = true;
  }

  if (langkahAwal === 'konfirmasi') {
    if (tanggalValid(tanggalPengambilan.value) && persetujuanKetentuan.checked) {
      const metode = formReservasi.querySelector('input[name="metode"]:checked');
      const tanggalAmbil = new Date(`${tanggalPengambilan.value}T12:00:00`);
      const tanggalKembali = new Date(tanggalAmbil);
      tanggalKembali.setDate(tanggalKembali.getDate() + Number(lamaPeminjaman.value));

      document.querySelector('#ringkasan-judul').textContent = bukuReservasi.judul;
      document.querySelector('#ringkasan-metode').textContent = metode.value;
      document.querySelector('#ringkasan-tanggal').textContent = formatTanggal(tanggalPengambilan.value);
      document.querySelector('#ringkasan-durasi').textContent = `${lamaPeminjaman.value} hari`;
      document.querySelector('#ringkasan-kembali').textContent =
        new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(tanggalKembali);
      document.querySelector('#kembali-ke-data').href = buatUrlLangkah('data');
      tampilkanLangkah(true);
    } else {
      tampilkanLangkah(false);
      pesanFormReservasi.textContent =
        'Pilih tanggal pengambilan dan setujui ketentuan untuk melanjutkan.';
      pesanFormReservasi.hidden = false;
    }
  } else {
    tampilkanLangkah(false);
  }

  formReservasi.addEventListener('submit', (event) => {
    event.preventDefault();
    window.navigasiDenganTransisi(buatUrlLangkah('konfirmasi'));
  });

  document.querySelector('#ajukan-peminjaman').addEventListener('click', () => {
    const pesanPengajuan = document.querySelector('#pesan-pengajuan');
    const metode = formReservasi.querySelector('input[name="metode"]:checked');
    const peminjamanBaru = {
      id: `pinjam-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      bookId: idReservasi,
      tanggalAmbil: tanggalPengambilan.value,
      durasi: Number(lamaPeminjaman.value),
      jatuhTempo: tambahHari(tanggalPengambilan.value, Number(lamaPeminjaman.value)),
      metode: metode.value,
      sisaPerpanjangan: 1
    };

    try {
      const daftarPeminjaman = window.penyimpananPeminjaman.baca();
      daftarPeminjaman.push(peminjamanBaru);
      window.penyimpananPeminjaman.simpan(daftarPeminjaman);
      window.navigasiDenganTransisi(
        `perpanjangan.html?pinjaman=${encodeURIComponent(peminjamanBaru.id)}`
      );
    } catch (error) {
      pesanPengajuan.textContent =
        'Pengajuan belum tersimpan. Penyimpanan browser tidak tersedia atau data peminjaman bermasalah.';
      pesanPengajuan.hidden = false;
    }
  });
}
