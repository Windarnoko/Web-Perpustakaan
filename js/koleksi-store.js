const kunciKoleksi = 'perpustakaanKotaMadiun.koleksi.v1';

function dataKoleksiValid(data) {
  return data
    && Array.isArray(data.favorit)
    && data.favorit.every((id) => typeof id === 'string')
    && Array.isArray(data.koleksi)
    && data.koleksi.every((koleksi) =>
      koleksi
      && typeof koleksi.id === 'string'
      && typeof koleksi.nama === 'string'
      && Array.isArray(koleksi.buku)
      && koleksi.buku.every((id) => typeof id === 'string'));
}

function buatIdKoleksi() {
  return `koleksi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

window.koleksiStore = {
  baca() {
    const isi = window.localStorage.getItem(kunciKoleksi);
    if (!isi) {
      return { favorit: [], koleksi: [] };
    }

    const data = JSON.parse(isi);
    if (!dataKoleksiValid(data)) {
      throw new Error('Data koleksi tersimpan tidak valid.');
    }
    return data;
  },

  simpan(data) {
    if (!dataKoleksiValid(data)) {
      throw new Error('Data koleksi tidak dapat disimpan karena formatnya tidak valid.');
    }
    window.localStorage.setItem(kunciKoleksi, JSON.stringify(data));
  },

  tambahFavorit(idBuku) {
    const data = this.baca();
    if (!data.favorit.includes(idBuku)) {
      data.favorit.push(idBuku);
      this.simpan(data);
    }
    return data;
  },

  toggleFavorit(idBuku) {
    const data = this.baca();
    const posisi = data.favorit.indexOf(idBuku);
    if (posisi >= 0) {
      data.favorit.splice(posisi, 1);
    } else {
      data.favorit.push(idBuku);
    }
    this.simpan(data);
    return data;
  },

  hapusFavorit(idBuku) {
    const data = this.baca();
    data.favorit = data.favorit.filter((id) => id !== idBuku);
    this.simpan(data);
    return data;
  },

  tambahKeKoleksi(idBuku, idKoleksi) {
    const data = this.baca();
    const koleksi = data.koleksi.find((item) => item.id === idKoleksi);
    if (!koleksi) {
      throw new Error('Koleksi tujuan tidak ditemukan.');
    }
    if (!koleksi.buku.includes(idBuku)) {
      koleksi.buku.push(idBuku);
      this.simpan(data);
    }
    return data;
  },

  buatKoleksi(nama, idBuku) {
    const namaBersih = nama.trim();
    if (!namaBersih) {
      throw new Error('Nama koleksi tidak boleh kosong.');
    }

    const data = this.baca();
    const namaAda = data.koleksi.some((item) =>
      item.nama.toLocaleLowerCase('id') === namaBersih.toLocaleLowerCase('id'));
    if (namaAda) {
      throw new Error('Nama koleksi tersebut sudah digunakan.');
    }

    const koleksi = {
      id: buatIdKoleksi(),
      nama: namaBersih,
      buku: idBuku ? [idBuku] : []
    };
    data.koleksi.push(koleksi);
    this.simpan(data);
    return koleksi;
  },

  hapusDariKoleksi(idBuku, idKoleksi) {
    const data = this.baca();
    const koleksi = data.koleksi.find((item) => item.id === idKoleksi);
    if (!koleksi) {
      throw new Error('Koleksi tujuan tidak ditemukan.');
    }
    koleksi.buku = koleksi.buku.filter((id) => id !== idBuku);
    this.simpan(data);
    return data;
  },

  hapusKoleksi(idKoleksi) {
    const data = this.baca();
    data.koleksi = data.koleksi.filter((item) => item.id !== idKoleksi);
    this.simpan(data);
    return data;
  }
};
