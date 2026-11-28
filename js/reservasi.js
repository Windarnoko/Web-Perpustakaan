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
const tampilanTanggalPengambilan = document.querySelector('#tanggal-pengambilan-format');
const kalenderTanggal = document.querySelector('#kalender-tanggal');
const gridKalenderTanggal = document.querySelector('#kalender-tanggal-grid');
const judulBulanKalender = document.querySelector('#judul-bulan-kalender');
const tombolBukaKalender = document.querySelector('#buka-kalender-tanggal');
const lamaPeminjaman = document.querySelector('#lama-peminjaman');
const persetujuanKetentuan = document.querySelector('#setuju-ketentuan');
const pesanFormReservasi = document.querySelector('#pesan-form-reservasi');
const langkahData = document.querySelector('#tahap-data');
const langkahKonfirmasi = document.querySelector('#tahap-konfirmasi');
const stepperReservasi = document.querySelector('.reservasi-stepper');
let bulanKalenderAktif = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

function tanggalHariIni() {
  const hariIni = new Date();
  const tahun = hariIni.getFullYear();
  const bulan = String(hariIni.getMonth() + 1).padStart(2, '0');
  const hari = String(hariIni.getDate()).padStart(2, '0');
  return `${tahun}-${bulan}-${hari}`;
}

function tanggalISOValid(tanggal) {
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(tanggal || '');
  if (!cocok || tanggal < tanggalHariIni()) {
    return false;
  }

  const [tahun, bulan, hari] = cocok.slice(1).map(Number);
  const nilaiTanggal = new Date(tahun, bulan - 1, hari);
  return nilaiTanggal.getFullYear() === tahun
    && nilaiTanggal.getMonth() === bulan - 1
    && nilaiTanggal.getDate() === hari;
}

function tanggalKeISO(tanggal) {
  const cocok = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(tanggal || '');
  if (!cocok) {
    return null;
  }

  const [, hari, bulan, tahun] = cocok;
  const tanggalISO = `${tahun}-${bulan}-${hari}`;
  return tanggalISOValid(tanggalISO) ? tanggalISO : null;
}

function tanggalISOKeIndonesia(tanggal) {
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(tanggal || '');
  if (!cocok || !tanggalISOValid(tanggal)) {
    return '';
  }
  return `${cocok[3]}/${cocok[2]}/${cocok[1]}`;
}

function tanggalValid(tanggal) {
  return tanggalKeISO(tanggal) !== null;
}

function formatTanggal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(tahun, bulan - 1, hari));
}

function buatTanggalISO(tahun, bulan, hari) {
  return [
    tahun,
    String(bulan + 1).padStart(2, '0'),
    String(hari).padStart(2, '0')
  ].join('-');
}

function kalenderSedangTerbuka() {
  return kalenderTanggal.matches(':popover-open');
}

function tutupKalenderTanggal() {
  if (kalenderSedangTerbuka()) {
    kalenderTanggal.hidePopover();
  }
  tombolBukaKalender.setAttribute('aria-expanded', 'false');
}

function posisikanKalenderTanggal() {
  if (!kalenderSedangTerbuka()) {
    return;
  }

  const kontrol = document.querySelector('.tanggal-pengambilan-kontrol');
  const batasKontrol = kontrol.getBoundingClientRect();
  const tinggiKalender = kalenderTanggal.offsetHeight;
  const lebarKalender = kalenderTanggal.offsetWidth;
  const ruangBawah = window.innerHeight - batasKontrol.bottom - 12;
  const ruangAtas = batasKontrol.top - 12;
  let atas = 12;

  if (tinggiKalender <= ruangBawah) {
    atas = batasKontrol.bottom + 6;
  } else if (tinggiKalender <= ruangAtas) {
    atas = batasKontrol.top - tinggiKalender - 6;
  }

  kalenderTanggal.style.left = `${Math.max(
    12,
    Math.min(batasKontrol.left, window.innerWidth - lebarKalender - 12)
  )}px`;
  kalenderTanggal.style.top = `${atas}px`;
}

function renderKalenderTanggal() {
  const tahun = bulanKalenderAktif.getFullYear();
  const bulan = bulanKalenderAktif.getMonth();
  const tanggalPertama = new Date(tahun, bulan, 1);
  const hariMulai = (tanggalPertama.getDay() + 6) % 7;
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const jumlahSel = Math.ceil((hariMulai + jumlahHari) / 7) * 7;
  const tanggalTerpilih = tanggalKeISO(tanggalPengambilan.value);
  const bulanSaatIni = new Date();

  judulBulanKalender.textContent = new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric'
  }).format(bulanKalenderAktif);
  gridKalenderTanggal.replaceChildren();

  ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].forEach((namaHari) => {
    const kepalaHari = document.createElement('span');
    kepalaHari.textContent = namaHari;
    kepalaHari.setAttribute('aria-hidden', 'true');
    gridKalenderTanggal.append(kepalaHari);
  });

  for (let posisi = 0; posisi < jumlahSel; posisi += 1) {
    const hari = posisi - hariMulai + 1;
    if (hari < 1 || hari > jumlahHari) {
      gridKalenderTanggal.append(document.createElement('span'));
      continue;
    }

    const tanggal = buatTanggalISO(tahun, bulan, hari);
    const tombolHari = document.createElement('button');
    tombolHari.type = 'button';
    tombolHari.textContent = String(hari);
    tombolHari.setAttribute('aria-label', formatTanggal(tanggal));
    tombolHari.setAttribute('aria-pressed', String(tanggal === tanggalTerpilih));
    tombolHari.disabled = tanggal < tanggalHariIni();
    if (tanggal === tanggalTerpilih) tombolHari.classList.add('terpilih');
    if (tanggal === tanggalHariIni()) tombolHari.classList.add('hari-ini');
    tombolHari.addEventListener('click', () => {
      tanggalPengambilan.value = tanggalISOKeIndonesia(tanggal);
      tampilanTanggalPengambilan.textContent = formatTanggal(tanggal);
      tutupKalenderTanggal();
      renderKalenderTanggal();
      tombolBukaKalender.focus();
    });
    gridKalenderTanggal.append(tombolHari);
  }

  const nomorBulanSaatIni = bulanSaatIni.getFullYear() * 12 + bulanSaatIni.getMonth();
  const nomorBulanDitampilkan = tahun * 12 + bulan;
  document.querySelector('#bulan-sebelumnya').disabled =
    nomorBulanDitampilkan <= nomorBulanSaatIni;
}

function perbaruiTampilanTanggalPengambilan() {
  const tanggalISO = tanggalKeISO(tanggalPengambilan.value);
  tampilanTanggalPengambilan.textContent = tanggalISO
    ? formatTanggal(tanggalISO)
    : 'Pilih tanggal dalam format hari/bulan/tahun.';
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
  const tanggalISO = tanggalKeISO(tanggalPengambilan.value);
  if (tanggalISO) {
    url.searchParams.set('tanggal', tanggalISO);
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
  const tanggalTersimpan = parameterReservasi.get('tanggal');
  if (tanggalISOValid(tanggalTersimpan)) {
    tanggalPengambilan.value = tanggalISOKeIndonesia(tanggalTersimpan);
    const [tahun, bulan] = tanggalTersimpan.split('-').map(Number);
    bulanKalenderAktif = new Date(tahun, bulan - 1, 1);
  }
  perbaruiTampilanTanggalPengambilan();
  renderKalenderTanggal();

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
      document.querySelector('#ringkasan-judul').textContent = bukuReservasi.judul;
      document.querySelector('#ringkasan-metode').textContent = metode.value;
      const tanggalAmbil = tanggalKeISO(tanggalPengambilan.value);
      document.querySelector('#ringkasan-tanggal').textContent = formatTanggal(tanggalAmbil);
      document.querySelector('#ringkasan-durasi').textContent = `${lamaPeminjaman.value} hari`;
      document.querySelector('#ringkasan-kembali').textContent = formatTanggal(
        tambahHari(tanggalAmbil, Number(lamaPeminjaman.value))
      );
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
    if (!tanggalKeISO(tanggalPengambilan.value)) {
      pesanFormReservasi.textContent = 'Pilih tanggal pengambilan dari kalender sebelum melanjutkan.';
      pesanFormReservasi.hidden = false;
      return;
    }
    window.navigasiDenganTransisi(buatUrlLangkah('konfirmasi'));
  });

  tombolBukaKalender.addEventListener('click', () => {
    if (kalenderSedangTerbuka()) {
      tutupKalenderTanggal();
      return;
    }

    renderKalenderTanggal();
    kalenderTanggal.showPopover();
    tombolBukaKalender.setAttribute('aria-expanded', 'true');
    posisikanKalenderTanggal();
    const hariTerpilih = gridKalenderTanggal.querySelector('.terpilih')
      || gridKalenderTanggal.querySelector('button:not(:disabled)');
    if (hariTerpilih) hariTerpilih.focus();
  });

  tanggalPengambilan.addEventListener('click', () => tombolBukaKalender.click());

  document.addEventListener('click', (event) => {
    if (
      kalenderSedangTerbuka()
      && !kalenderTanggal.contains(event.target)
      && !tombolBukaKalender.contains(event.target)
      && !tanggalPengambilan.contains(event.target)
    ) {
      tutupKalenderTanggal();
    }
  });

  window.addEventListener('resize', posisikanKalenderTanggal);
  window.addEventListener('scroll', posisikanKalenderTanggal, true);

  document.querySelector('#bulan-sebelumnya').addEventListener('click', () => {
    bulanKalenderAktif = new Date(
      bulanKalenderAktif.getFullYear(),
      bulanKalenderAktif.getMonth() - 1,
      1
    );
    renderKalenderTanggal();
  });

  document.querySelector('#bulan-berikutnya').addEventListener('click', () => {
    bulanKalenderAktif = new Date(
      bulanKalenderAktif.getFullYear(),
      bulanKalenderAktif.getMonth() + 1,
      1
    );
    renderKalenderTanggal();
  });

  kalenderTanggal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      tutupKalenderTanggal();
      tombolBukaKalender.focus();
    }
  });

  document.querySelector('#ajukan-peminjaman').addEventListener('click', () => {
    const pesanPengajuan = document.querySelector('#pesan-pengajuan');
    const metode = formReservasi.querySelector('input[name="metode"]:checked');
    const peminjamanBaru = {
      id: `pinjam-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      bookId: idReservasi,
      tanggalAmbil: tanggalKeISO(tanggalPengambilan.value),
      durasi: Number(lamaPeminjaman.value),
      jatuhTempo: tambahHari(
        tanggalKeISO(tanggalPengambilan.value),
        Number(lamaPeminjaman.value)
      ),
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
