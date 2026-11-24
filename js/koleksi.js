const daftarFavorit = document.querySelector('#daftar-favorit');
const daftarKoleksiPribadi = document.querySelector('#daftar-koleksi-pribadi');
const pesanFavoritKosong = document.querySelector('#pesan-favorit');
const pesanKoleksiKosong = document.querySelector('#pesan-koleksi-kosong');
const pesanKoleksiError = document.querySelector('#pesan-koleksi-error');

function buatKartuKoleksi(idBuku, idKoleksi) {
  const buku = window.dataBukuPerpustakaan[idBuku];
  if (!buku) {
    return null;
  }

  const kartu = document.createElement('article');
  kartu.className = 'buku buku-koleksi';

  const tautan = document.createElement('a');
  tautan.className = 'tautan-detail-buku';
  tautan.href = `detail-buku.html?id=${encodeURIComponent(idBuku)}`;

  const sampul = document.createElement('img');
  sampul.src = buku.sampul;
  sampul.alt = `Sampul ${buku.judul}`;
  tautan.append(sampul);

  const judul = document.createElement('h3');
  judul.textContent = buku.judul;
  tautan.append(judul);

  const pengarang = document.createElement('p');
  pengarang.textContent = buku.pengarang;
  tautan.append(pengarang);
  kartu.append(tautan);

  const tombolHapus = document.createElement('button');
  tombolHapus.type = 'button';
  tombolHapus.className = 'tombol-hapus-koleksi';
  tombolHapus.dataset.bookId = idBuku;
  if (idKoleksi) {
    tombolHapus.dataset.collectionId = idKoleksi;
    tombolHapus.dataset.hapusDariKoleksi = '';
    tombolHapus.textContent = 'Hapus dari koleksi';
  } else {
    tombolHapus.dataset.hapusDariFavorit = '';
    tombolHapus.textContent = 'Hapus dari favorit';
  }
  kartu.append(tombolHapus);
  return kartu;
}

function tampilkanKoleksi() {
  let data;
  try {
    data = window.koleksiStore.baca();
    pesanKoleksiError.hidden = true;
  } catch (error) {
    pesanKoleksiError.textContent =
      'Koleksi tidak dapat dibaca dari penyimpanan browser. Coba muat ulang halaman.';
    pesanKoleksiError.hidden = false;
    return;
  }

  daftarFavorit.replaceChildren();
  daftarKoleksiPribadi.replaceChildren();
  document.querySelector('#jumlah-favorit').textContent = data.favorit.length;
  document.querySelector('#jumlah-koleksi').textContent = data.koleksi.length;

  const bukuFavorit = data.favorit
    .map((idBuku) => buatKartuKoleksi(idBuku, null))
    .filter(Boolean);
  bukuFavorit.forEach((kartu) => daftarFavorit.append(kartu));
  pesanFavoritKosong.hidden = bukuFavorit.length > 0;

  data.koleksi.forEach((koleksi) => {
    const bagian = document.createElement('section');
    bagian.className = 'bagian-koleksi-pribadi';
    bagian.setAttribute('aria-labelledby', `judul-${koleksi.id}`);

    const kepala = document.createElement('div');
    kepala.className = 'kepala-koleksi-pribadi';
    const judul = document.createElement('h3');
    judul.id = `judul-${koleksi.id}`;
    judul.textContent = koleksi.nama;
    kepala.append(judul);

    const tombolHapusKoleksi = document.createElement('button');
    tombolHapusKoleksi.type = 'button';
    tombolHapusKoleksi.className = 'tombol-hapus-koleksi tombol-hapus-grup';
    tombolHapusKoleksi.dataset.collectionId = koleksi.id;
    tombolHapusKoleksi.dataset.hapusKoleksi = '';
    tombolHapusKoleksi.textContent = 'Hapus koleksi';
    kepala.append(tombolHapusKoleksi);
    bagian.append(kepala);

    const daftarBuku = document.createElement('div');
    daftarBuku.className = 'baris-buku daftar-buku-koleksi';
    koleksi.buku
      .map((idBuku) => buatKartuKoleksi(idBuku, koleksi.id))
      .filter(Boolean)
      .forEach((kartu) => daftarBuku.append(kartu));
    bagian.append(daftarBuku);

    if (daftarBuku.childElementCount === 0) {
      const kosong = document.createElement('p');
      kosong.className = 'pesan-koleksi-kosong';
      kosong.textContent = 'Koleksi ini belum berisi buku. Tambahkan buku dari detail buku.';
      bagian.append(kosong);
    }

    daftarKoleksiPribadi.append(bagian);
  });
  pesanKoleksiKosong.hidden = data.koleksi.length > 0;
}

document.addEventListener('click', (event) => {
  const tombolHapusFavorit = event.target.closest('[data-hapus-dari-favorit]');
  const tombolHapusDariKoleksi = event.target.closest('[data-hapus-dari-koleksi]');
  const tombolHapusKoleksi = event.target.closest('[data-hapus-koleksi]');

  try {
    if (tombolHapusFavorit) {
      window.koleksiStore.hapusFavorit(tombolHapusFavorit.dataset.bookId);
      window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
      window.koleksiUI.perbaruiStatusHati();
    } else if (tombolHapusDariKoleksi) {
      window.koleksiStore.hapusDariKoleksi(
        tombolHapusDariKoleksi.dataset.bookId,
        tombolHapusDariKoleksi.dataset.collectionId
      );
      window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
    } else if (tombolHapusKoleksi) {
      if (!window.confirm('Hapus koleksi ini beserta daftar bukunya?')) {
        return;
      }
      window.koleksiStore.hapusKoleksi(tombolHapusKoleksi.dataset.collectionId);
      window.dispatchEvent(new CustomEvent('koleksi:diperbarui'));
    }
  } catch (error) {
    pesanKoleksiError.textContent =
      'Perubahan koleksi tidak dapat disimpan ke browser. Coba muat ulang halaman.';
    pesanKoleksiError.hidden = false;
  }
});

window.addEventListener('koleksi:diperbarui', tampilkanKoleksi);
tampilkanKoleksi();
