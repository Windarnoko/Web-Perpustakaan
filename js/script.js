const katalogForm = document.querySelector('.katalog-form-cari');
const katalogQuery = document.querySelector('#katalog-query');
const katalogGrid = document.querySelector('.katalog-grid');
let katalogItems = [];
const katalogTabs = Array.from(document.querySelectorAll('.katalog-tabs button'));
const filterKategori = document.querySelector('#filter-kategori');
const filterTahun = document.querySelector('#filter-tahun');
const urutkanKatalog = document.querySelector('#urutkan-katalog');
const katalogJumlah = document.querySelector('.katalog-jumlah');
const katalogKosong = document.querySelector('.katalog-kosong');
const parameterPencarian = new URLSearchParams(window.location.search);
const jenisAwal = parameterPencarian.get('jenis');
let tipeAktif = 'semua';

if (parameterPencarian.has('q')) {
  katalogQuery.value = parameterPencarian.get('q');
}

if (katalogTabs.some((tab) => tab.dataset.tipe === jenisAwal)) {
  tipeAktif = jenisAwal;
}

katalogTabs.forEach((tab) => {
  const aktif = tab.dataset.tipe === tipeAktif;
  tab.classList.toggle('aktif', aktif);
  tab.setAttribute('aria-pressed', String(aktif));
});

let halamanAktif = 1;
const jumlahPerHalaman = 30;

function buatKartuKatalog(idBuku, buku) {
  const artikel = document.createElement('article');
  artikel.className = 'kartu-buku item-katalog';
  artikel.dataset.id = idBuku;
  artikel.dataset.tipe = 'buku';
  artikel.dataset.kategori = buku.kategori.toLocaleLowerCase('id');
  artikel.dataset.tahun = 'tidak-dicantumkan';
  artikel.dataset.populer = String(Object.keys(window.dataBukuPerpustakaan).indexOf(idBuku) + 1);
  artikel.dataset.judul = buku.judul;
  artikel.dataset.pengarang = buku.pengarang;
  artikel.innerHTML = `
    <a class="tautan-detail-buku" href="detail-buku.html?id=${encodeURIComponent(idBuku)}">
      <img src="${buku.sampul}" alt="Sampul ${buku.judul}">
      <h3>${buku.judul}</h3>
    </a>
    <p class="penulis">${buku.pengarang}</p>
    <div class="bawah-kartu">
      <span class="status">Tersedia</span>
      <div>
        <button class="tombol-bulat aksi-favorit" type="button" data-aksi-favorit aria-label="Tambahkan ${buku.judul} ke favorit" aria-pressed="false">♡</button>
        <button class="tombol-bulat oranye aksi-simpan" type="button" data-aksi-simpan aria-label="Simpan ${buku.judul} ke koleksi">+</button>
      </div>
    </div>`;
  return artikel;
}

katalogGrid.replaceChildren();
Object.entries(window.dataBukuPerpustakaan).forEach(([idBuku, buku]) => {
  const kartu = buatKartuKatalog(idBuku, buku);
  katalogGrid.append(kartu);
  katalogItems.push(kartu);
});

function perbaruiKatalog() {
  const kataKunci = katalogQuery.value.trim().toLocaleLowerCase('id');
  const hasil = katalogItems.filter((item) => {
    const cocokTipe = tipeAktif === 'semua' || item.dataset.tipe === tipeAktif;
    const cocokKategori = filterKategori.value === 'semua' || item.dataset.kategori === filterKategori.value;
    const cocokTahun = filterTahun.value === 'semua' || item.dataset.tahun === filterTahun.value;
    const teksBuku = `${item.dataset.judul} ${item.dataset.pengarang}`.toLocaleLowerCase('id');
    return cocokTipe && cocokKategori && cocokTahun && teksBuku.includes(kataKunci);
  });

  if (urutkanKatalog.value === 'judul-az') {
    hasil.sort((a, b) => a.dataset.judul.localeCompare(b.dataset.judul, 'id'));
  } else if (urutkanKatalog.value === 'judul-za') {
    hasil.sort((a, b) => b.dataset.judul.localeCompare(a.dataset.judul, 'id'));
  }

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / jumlahPerHalaman));
  halamanAktif = Math.min(halamanAktif, totalHalaman);
  const awal = (halamanAktif - 1) * jumlahPerHalaman;
  const hasilHalaman = hasil.slice(awal, awal + jumlahPerHalaman);

  katalogItems.forEach((item) => {
    item.hidden = !hasil.includes(item);
  });
  hasilHalaman.forEach((item) => {
    item.hidden = false;
    katalogGrid.append(item);
  });
  hasil.forEach((item) => {
    if (!hasilHalaman.includes(item)) item.hidden = true;
  });
  katalogJumlah.textContent = `${hasil.length} hasil ditemukan`;
  katalogKosong.hidden = hasil.length > 0;

  const paginasi = document.querySelector('.katalog-paginasi');
  if (paginasi) {
    const [tombolSebelumnya, labelHalaman, tombolBerikutnya] = paginasi.children;
    tombolSebelumnya.disabled = halamanAktif === 1;
    tombolBerikutnya.disabled = halamanAktif === totalHalaman;
    labelHalaman.textContent = `${halamanAktif} / ${totalHalaman}`;
  }
}

katalogForm.addEventListener('submit', (event) => {
  event.preventDefault();
  halamanAktif = 1;
  perbaruiKatalog();
});

katalogQuery.addEventListener('input', () => {
  halamanAktif = 1;
  perbaruiKatalog();
});
filterKategori.addEventListener('change', () => {
  halamanAktif = 1;
  perbaruiKatalog();
});
filterTahun.addEventListener('change', () => {
  halamanAktif = 1;
  perbaruiKatalog();
});
urutkanKatalog.addEventListener('change', () => {
  halamanAktif = 1;
  perbaruiKatalog();
});

katalogTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tipeAktif = tab.dataset.tipe;
    katalogTabs.forEach((item) => {
      const aktif = item === tab;
      item.classList.toggle('aktif', aktif);
      item.setAttribute('aria-pressed', String(aktif));
    });
    halamanAktif = 1;
    perbaruiKatalog();
  });
});

document.querySelectorAll('.katalog-rekomendasi button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.kategori) {
      filterKategori.value = button.dataset.kategori;
      katalogQuery.value = '';
    } else {
      filterKategori.value = 'semua';
      katalogQuery.value = button.dataset.query;
    }
    halamanAktif = 1;
    perbaruiKatalog();
  });
});

const paginasi = document.querySelector('.katalog-paginasi');
if (paginasi) {
  const [tombolSebelumnya, , tombolBerikutnya] = paginasi.children;
  tombolSebelumnya.addEventListener('click', () => {
    if (halamanAktif > 1) {
      halamanAktif -= 1;
      perbaruiKatalog();
    }
  });
  tombolBerikutnya.addEventListener('click', () => {
    halamanAktif += 1;
    perbaruiKatalog();
  });
}

perbaruiKatalog();
