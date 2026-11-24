const dataBuku = window.dataBukuPerpustakaan;
const parameterBuku = new URLSearchParams(window.location.search);
const idBuku = parameterBuku.get('id');
const buku = Object.prototype.hasOwnProperty.call(dataBuku, idBuku)
  ? dataBuku[idBuku]
  : null;
const detailBuku = document.querySelector('#detail-buku');
const detailBukuKosong = document.querySelector('#detail-buku-kosong');

if (buku) {
  const linkReservasi = document.querySelector('#detail-buku-reservasi');
  document.querySelector('#detail-buku-simpan').dataset.bookId = idBuku;
  document.title = `${buku.judul} - Perpustakaan Kota Madiun`;
  document.querySelector('#detail-buku-sampul').src = buku.sampul;
  document.querySelector('#detail-buku-sampul').alt = `Sampul ${buku.judul}`;
  document.querySelector('#detail-buku-judul').textContent = buku.judul;
  linkReservasi.href = `reservasi.html?id=${encodeURIComponent(idBuku)}`;
  document.querySelector('#detail-buku-meta').textContent =
    `${buku.pengarang} · Tahun terbit belum dicantumkan`;
  document.querySelector('#detail-buku-sinopsis').textContent =
    'Sinopsis belum tersedia dalam katalog digital ini. Hubungi perpustakaan untuk informasi lebih lanjut mengenai isi dan ketersediaan buku.';

  const tagBuku = document.querySelector('#detail-buku-tag');
  ['Buku Cetak', buku.kategori].forEach((label) => {
    const tag = document.createElement('span');
    tag.textContent = label;
    tagBuku.append(tag);
  });

  detailBuku.hidden = false;
  detailBukuKosong.hidden = true;
} else {
  document.title = 'Buku tidak ditemukan - Perpustakaan Kota Madiun';
  detailBuku.hidden = true;
  detailBukuKosong.hidden = false;
}
