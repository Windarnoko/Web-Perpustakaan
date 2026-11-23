function tampilkanNotifikasiKoleksi(teks, gagal) {
  let notifikasi = document.querySelector('#notifikasi-koleksi');
  if (!notifikasi) {
    notifikasi = document.createElement('p');
    notifikasi.id = 'notifikasi-koleksi';
    notifikasi.className = 'notifikasi-koleksi';
    notifikasi.setAttribute('role', 'status');
    document.body.append(notifikasi);
  }

  notifikasi.textContent = teks;
  notifikasi.classList.toggle('gagal', Boolean(gagal));
  notifikasi.classList.add('terlihat');
  window.clearTimeout(notifikasi.timerNotifikasi);
  notifikasi.timerNotifikasi = window.setTimeout(() => {
    notifikasi.classList.remove('terlihat');
  }, 3200);
}

function ambilIdBukuDariTombol(tombol) {
  if (tombol.dataset.bookId) {
    return tombol.dataset.bookId;
  }
  const kartu = tombol.closest('[data-id], [data-book-id]');
  return kartu ? (kartu.dataset.bookId || kartu.dataset.id) : null;
}

const dialogKoleksi = document.createElement('dialog');
dialogKoleksi.className = 'dialog-koleksi';
dialogKoleksi.setAttribute('aria-labelledby', 'judul-dialog-koleksi');
dialogKoleksi.innerHTML = `
  <div class="dialog-koleksi-isi">
    <div class="dialog-koleksi-header">
      <div>
        <h2 id="judul-dialog-koleksi">Simpan buku</h2>
        <p id="keterangan-dialog-koleksi"></p>
      </div>
      <button class="dialog-koleksi-tutup" type="button" aria-label="Tutup">×</button>
    </div>
    <div id="target-simpan-buku">
      <button class="pilihan-simpan-favorit" id="simpan-ke-favorit" type="button">
        <span aria-hidden="true">♡</span> Favorit
      </button>
      <h3>Koleksi buatan sendiri</h3>
      <div class="pilihan-koleksi" id="pilihan-koleksi"></div>
    </div>
    <button class="tombol-buat-baru" id="tampilkan-form-koleksi" type="button">+ Buat koleksi baru</button>
    <form class="form-buat-koleksi" id="form-buat-koleksi" hidden>
      <label for="nama-koleksi-baru">Nama koleksi</label>
      <input id="nama-koleksi-baru" name="nama" maxlength="40" required>
      <div>
        <button class="tombol-buat-baru" id="batal-buat-koleksi" type="button">Batal</button>
        <button class="tombol-simpan-baru" id="tombol-submit-koleksi" type="submit">Buat dan simpan</button>
      </div>
    </form>
    <p class="pesan-dialog-koleksi" id="pesan-dialog-koleksi" role="status" hidden></p>
  </div>
`;
document.body.append(dialogKoleksi);

let idBukuAktif = null;
const formKoleksiBaru = dialogKoleksi.querySelector('#form-buat-koleksi');
const namaKoleksiBaru = dialogKoleksi.querySelector('#nama-koleksi-baru');
const pesanDialogKoleksi = dialogKoleksi.querySelector('#pesan-dialog-koleksi');

function perbaruiStatusHati() {
  let data;
  try {
    data = window.koleksiStore.baca();
  } catch (error) {
    tampilkanNotifikasiKoleksi(
      'Status favorit tidak dapat dibaca dari penyimpanan browser.',
      true
    );
    return;
  }

  document.querySelectorAll('[data-aksi-favorit]').forEach((tombol) => {
    const idBuku = ambilIdBukuDariTombol(tombol);
    if (!idBuku) {
      return;
    }

    const favorit = data.favorit.includes(idBuku);
    const buku = window.dataBukuPerpustakaan[idBuku];
    tombol.textContent = favorit ? '♥' : '♡';
    tombol.classList.toggle('favorit-aktif', favorit);
    tombol.setAttribute('aria-pressed', String(favorit));
    if (buku) {
      tombol.setAttribute(
        'aria-label',
        `${favorit ? 'Hapus dari' : 'Tambahkan ke'} favorit: ${buku.judul}`
      );
    }
  });
}

function perbaruiPilihanKoleksi() {
  const daftarPilihan = dialogKoleksi.querySelector('#pilihan-koleksi');
  daftarPilihan.replaceChildren();

  if (!idBukuAktif) {
    return;
  }

  const data = window.koleksiStore.baca();
  if (data.koleksi.length === 0) {
    const kosong = document.createElement('p');
    kosong.className = 'koleksi-belum-ada';
    kosong.textContent = 'Belum ada koleksi. Buat koleksi baru untuk menyimpan buku ini.';
    daftarPilihan.append(kosong);
    return;
  }

  data.koleksi.forEach((koleksi) => {
    const tombol = document.createElement('button');
    tombol.type = 'button';
    tombol.className = 'pilihan-simpan-koleksi';
    tombol.textContent = koleksi.buku.includes(idBukuAktif)
      ? `${koleksi.nama} · Sudah tersimpan`
      : koleksi.nama;
    tombol.disabled = koleksi.buku.includes(idBukuAktif);
    tombol.addEventListener('click', () => {
      try {
        window.koleksiStore.tambahKeKoleksi(idBukuAktif, koleksi.id);
        dialogKoleksi.close();
        window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
        tampilkanNotifikasiKoleksi(`Buku ditambahkan ke koleksi: ${koleksi.nama}.`);
      } catch (error) {
        pesanDialogKoleksi.textContent =
          'Buku belum dapat disimpan. Penyimpanan browser tidak tersedia atau data koleksi bermasalah.';
        pesanDialogKoleksi.hidden = false;
      }
    });
    daftarPilihan.append(tombol);
  });
}

function bukaDialogKoleksi(idBuku) {
  idBukuAktif = idBuku;
  pesanDialogKoleksi.hidden = true;
  namaKoleksiBaru.value = '';
  formKoleksiBaru.hidden = Boolean(idBukuAktif);
  dialogKoleksi.querySelector('#target-simpan-buku').hidden = !idBukuAktif;
  dialogKoleksi.querySelector('#simpan-ke-favorit').hidden = !idBukuAktif;
  dialogKoleksi.querySelector('#tampilkan-form-koleksi').hidden = !idBukuAktif;
  dialogKoleksi.querySelector('#judul-dialog-koleksi').textContent =
    idBukuAktif ? 'Simpan buku' : 'Buat koleksi';
  dialogKoleksi.querySelector('#tombol-submit-koleksi').textContent =
    idBukuAktif ? 'Buat dan simpan' : 'Buat koleksi';

  if (idBukuAktif) {
    const buku = window.dataBukuPerpustakaan[idBukuAktif];
    if (!buku) {
      tampilkanNotifikasiKoleksi('Data buku tidak ditemukan.', true);
      return;
    }
    dialogKoleksi.querySelector('#keterangan-dialog-koleksi').textContent = buku.judul;
    try {
      perbaruiPilihanKoleksi();
      const tombolFavorit = dialogKoleksi.querySelector('#simpan-ke-favorit');
      const sudahFavorit = window.koleksiStore.baca().favorit.includes(idBukuAktif);
      tombolFavorit.disabled = sudahFavorit;
      tombolFavorit.innerHTML = sudahFavorit
        ? '<span aria-hidden="true">♥</span> Sudah ada di Favorit'
        : '<span aria-hidden="true">♡</span> Simpan ke Favorit';
    } catch (error) {
      pesanDialogKoleksi.textContent =
        'Pilihan penyimpanan tidak dapat dibaca. Coba muat ulang halaman.';
      pesanDialogKoleksi.hidden = false;
    }
  } else {
    dialogKoleksi.querySelector('#keterangan-dialog-koleksi').textContent =
      'Buat tempat baru untuk mengelompokkan buku pilihan Anda.';
  }

  dialogKoleksi.showModal();
  if (!idBukuAktif) {
    namaKoleksiBaru.focus();
  }
}

dialogKoleksi.querySelector('.dialog-koleksi-tutup').addEventListener('click', () => {
  dialogKoleksi.close();
});

dialogKoleksi.querySelector('#simpan-ke-favorit').addEventListener('click', () => {
  try {
    window.koleksiStore.tambahFavorit(idBukuAktif);
    dialogKoleksi.close();
    perbaruiStatusHati();
    window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
    tampilkanNotifikasiKoleksi('Buku ditambahkan ke Favorit.');
  } catch (error) {
    pesanDialogKoleksi.textContent =
      'Buku belum dapat disimpan. Penyimpanan browser tidak tersedia atau data koleksi bermasalah.';
    pesanDialogKoleksi.hidden = false;
  }
});

dialogKoleksi.querySelector('#tampilkan-form-koleksi').addEventListener('click', () => {
  formKoleksiBaru.hidden = false;
  dialogKoleksi.querySelector('#tampilkan-form-koleksi').hidden = true;
  namaKoleksiBaru.focus();
});

dialogKoleksi.querySelector('#batal-buat-koleksi').addEventListener('click', () => {
  if (!idBukuAktif) {
    dialogKoleksi.close();
    return;
  }

  formKoleksiBaru.reset();
  formKoleksiBaru.hidden = true;
  dialogKoleksi.querySelector('#tampilkan-form-koleksi').hidden = false;
  pesanDialogKoleksi.hidden = true;
});

formKoleksiBaru.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    const koleksi = window.koleksiStore.buatKoleksi(namaKoleksiBaru.value, idBukuAktif);
    dialogKoleksi.close();
    window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
    tampilkanNotifikasiKoleksi(
      idBukuAktif
        ? `Buku disimpan ke koleksi: ${koleksi.nama}.`
        : `Koleksi ${koleksi.nama} berhasil dibuat.`
    );
  } catch (error) {
    pesanDialogKoleksi.textContent = error.message;
    pesanDialogKoleksi.hidden = false;
  }
});

document.addEventListener('click', (event) => {
  const tombol = event.target.closest('[data-aksi-favorit], [data-aksi-simpan], [data-buat-koleksi]');
  if (!tombol) {
    return;
  }

  if (tombol.hasAttribute('data-buat-koleksi')) {
    bukaDialogKoleksi(null);
    return;
  }

  const idBuku = ambilIdBukuDariTombol(tombol);
  if (!idBuku) {
    tampilkanNotifikasiKoleksi('Buku tidak dapat dikenali untuk disimpan.', true);
    return;
  }

  if (tombol.hasAttribute('data-aksi-favorit')) {
    try {
      const data = window.koleksiStore.toggleFavorit(idBuku);
      perbaruiStatusHati();
      window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
      tampilkanNotifikasiKoleksi(
        data.favorit.includes(idBuku) ? 'Buku ditambahkan ke Favorit.' : 'Buku dihapus dari Favorit.'
      );
    } catch (error) {
      tampilkanNotifikasiKoleksi(
        'Status favorit tidak dapat diperbarui. Penyimpanan browser tidak tersedia.',
        true
      );
    }
    return;
  }

  bukaDialogKoleksi(idBuku);
});

window.koleksiUI = {
  bukaDialogKoleksi,
  perbaruiStatusHati
};

perbaruiStatusHati();
