const kunciPenyimpananPeminjaman = 'perpustakaanKotaMadiun.peminjaman.v1';

function dataPeminjamanValid(data) {
  return data
    && typeof data.id === 'string'
    && typeof data.bookId === 'string'
    && typeof data.tanggalAmbil === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(data.tanggalAmbil)
    && typeof data.jatuhTempo === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(data.jatuhTempo)
    && Number.isInteger(data.durasi)
    && data.durasi > 0
    && typeof data.metode === 'string'
    && Number.isInteger(data.sisaPerpanjangan)
    && data.sisaPerpanjangan >= 0;
}

window.penyimpananPeminjaman = {
  baca() {
    const isi = window.localStorage.getItem(kunciPenyimpananPeminjaman);
    if (!isi) {
      return [];
    }

    const daftar = JSON.parse(isi);
    if (!Array.isArray(daftar) || !daftar.every(dataPeminjamanValid)) {
      throw new Error('Data peminjaman tersimpan tidak valid.');
    }
    return daftar;
  },

  simpan(daftar) {
    if (!Array.isArray(daftar) || !daftar.every(dataPeminjamanValid)) {
      throw new Error('Data peminjaman tidak dapat disimpan karena formatnya tidak valid.');
    }
    window.localStorage.setItem(kunciPenyimpananPeminjaman, JSON.stringify(daftar));
  }
};
