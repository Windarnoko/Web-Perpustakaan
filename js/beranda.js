const jalurPopuler = document.querySelector('#jalur-populer');
const indikatorPopuler = document.querySelector('#indikator-populer');
const panahPopuler = document.querySelector('#panah-populer');
const panahPopulerSebelumnya = document.querySelector('#panah-populer-sebelumnya');

if (jalurPopuler && indikatorPopuler && panahPopuler && panahPopulerSebelumnya) {
  const semuaBukuPopuler = Object.entries(window.dataBukuPerpustakaan).map(([idBuku, buku]) => {
    const tautan = document.createElement('a');
    tautan.className = 'sampul-populer tautan-detail-buku';
    tautan.href = `html/detail-buku.html?id=${encodeURIComponent(idBuku)}`;
    tautan.setAttribute('aria-label', `Buka detail ${buku.judul}`);

    const gambar = document.createElement('img');
    gambar.src = buku.sampul;
    gambar.alt = `Sampul ${buku.judul}`;

    const label = document.createElement('span');
    label.className = 'buka-buku';
    label.textContent = 'Buka';

    tautan.append(gambar, label);
    return tautan;
  });
  let halamanPopuler = [];
  let jumlahBukuPerHalaman = 6;
  let halamanAktif = 0;
  let timerResize;

  function dapatkanJumlahBukuPerHalaman() {
    if (window.innerWidth <= 600) {
      return 2;
    }
    if (window.innerWidth <= 900) {
      return 3;
    }
    return 6;
  }

  function tampilkanHalamanPopuler(index) {
    halamanAktif = (index + halamanPopuler.length) % halamanPopuler.length;
    jalurPopuler.style.transform = `translateX(-${halamanAktif * 100}%)`;
    halamanPopuler.forEach((halaman, posisi) => {
      const aktif = posisi === halamanAktif;
      halaman.setAttribute('aria-hidden', String(!aktif));
      halaman.querySelectorAll('a').forEach((tautan) => {
        tautan.tabIndex = aktif ? 0 : -1;
      });
      const indikator = indikatorPopuler.children[posisi];
      indikator.classList.toggle('aktif', aktif);
      indikator.setAttribute('aria-current', String(aktif));
    });
  }

  function bangunHalamanPopuler() {
    const halamanSebelumnya = halamanAktif;
    const posisiBukuPertama = halamanSebelumnya * jumlahBukuPerHalaman;
    jumlahBukuPerHalaman = dapatkanJumlahBukuPerHalaman();
    halamanAktif = Math.floor(posisiBukuPertama / jumlahBukuPerHalaman);
    halamanPopuler = [];
    jalurPopuler.replaceChildren();
    indikatorPopuler.replaceChildren();

    for (let mulai = 0; mulai < semuaBukuPopuler.length; mulai += jumlahBukuPerHalaman) {
      const halaman = document.createElement('div');
      halaman.className = 'halaman-populer';
      semuaBukuPopuler.slice(mulai, mulai + jumlahBukuPerHalaman).forEach((buku) => {
        halaman.append(buku);
      });
      jalurPopuler.append(halaman);
      halamanPopuler.push(halaman);

      const tombolIndikator = document.createElement('button');
      tombolIndikator.type = 'button';
      tombolIndikator.className = 'titik-populer';
      tombolIndikator.setAttribute('aria-label', `Tampilkan halaman ${halamanPopuler.length}`);
      tombolIndikator.addEventListener('click', () => {
        tampilkanHalamanPopuler(halamanPopuler.indexOf(halaman));
      });
      indikatorPopuler.append(tombolIndikator);
    }

    tampilkanHalamanPopuler(halamanAktif);
  }

  panahPopuler.addEventListener('click', () => {
    tampilkanHalamanPopuler(halamanAktif + 1);
  });

  panahPopulerSebelumnya.addEventListener('click', () => {
    tampilkanHalamanPopuler(halamanAktif - 1);
  });

  window.addEventListener('resize', () => {
    window.clearTimeout(timerResize);
    timerResize = window.setTimeout(bangunHalamanPopuler, 120);
  });

  bangunHalamanPopuler();
}
