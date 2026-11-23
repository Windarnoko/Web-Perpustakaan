const katalogForm = document.querySelector('.katalog-form-cari');
const katalogQuery = document.querySelector('#katalog-query');
const katalogGrid = document.querySelector('.katalog-grid');
const katalogItems = Array.from(katalogGrid.querySelectorAll('.item-katalog'));
const katalogTabs = Array.from(document.querySelectorAll('.katalog-tabs button'));
const filterKategori = document.querySelector('#filter-kategori');
const filterTahun = document.querySelector('#filter-tahun');
const urutkanKatalog = document.querySelector('#urutkan-katalog');
const katalogJumlah = document.querySelector('.katalog-jumlah');
const katalogKosong = document.querySelector('.katalog-kosong');
const jenisAwal = new URLSearchParams(window.location.search).get('jenis');
let tipeAktif = 'semua';

if (katalogTabs.some((tab) => tab.dataset.tipe === jenisAwal)) {
  tipeAktif = jenisAwal;
}

katalogTabs.forEach((tab) => {
  const aktif = tab.dataset.tipe === tipeAktif;
  tab.classList.toggle('aktif', aktif);
  tab.setAttribute('aria-pressed', String(aktif));
});

// Gandakan data buku yang tersedia agar grid terisi 6 kolom selama 5 baris.
const katalogItemsAwal = katalogItems.slice();
for (let index = katalogItems.length; index < 30; index += 1) {
  const sumber = katalogItemsAwal[index % katalogItemsAwal.length];
  const duplikat = sumber.cloneNode(true);
  katalogGrid.append(duplikat);
  katalogItems.push(duplikat);
}

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

  katalogItems.forEach((item) => {
    item.hidden = !hasil.includes(item);
  });
  hasil.forEach((item) => katalogGrid.append(item));
  katalogJumlah.textContent = `${hasil.length} hasil ditemukan`;
  katalogKosong.hidden = hasil.length > 0;
}

katalogForm.addEventListener('submit', (event) => {
  event.preventDefault();
  perbaruiKatalog();
});

katalogQuery.addEventListener('input', perbaruiKatalog);
filterKategori.addEventListener('change', perbaruiKatalog);
filterTahun.addEventListener('change', perbaruiKatalog);
urutkanKatalog.addEventListener('change', perbaruiKatalog);

katalogTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tipeAktif = tab.dataset.tipe;
    katalogTabs.forEach((item) => {
      const aktif = item === tab;
      item.classList.toggle('aktif', aktif);
      item.setAttribute('aria-pressed', String(aktif));
    });
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
    perbaruiKatalog();
  });
});

perbaruiKatalog();
