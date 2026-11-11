# Kunci Jawaban antre-web

Baca kunci ini setelah kamu mencoba sendiri. Kunci menunjukkan satu jalan yang lolos pemeriksaan.
Jawabanmu boleh berbeda dan tetap benar, selama tanda selesainya terpenuhi.

## Latihan DESIGN.md dan Keadaan Gagal di Antre

Branch `answer/board-error-state`, dibangun dari `main`.

Tugasnya mencatat sistem desain antre-web ke `DESIGN.md` dari kode yang ada, memotret papan saat
server mati, lalu memberi papan itu keadaan gagal dan keadaan kosong, dengan tangkapan layar
sebagai bukti.

### Yang Berubah

| File | Perubahan |
| --- | --- |
| `DESIGN.md` | Sistem desain yang dicatat dari kode, ditambah pola keadaan Stale, Empty, dan Take failed. Ditulis sebelum kodenya. |
| `lib/api.ts` | Satu fungsi `readJson` yang melempar galat saat jawaban bukan 2xx. Sebelumnya isi jawaban galat ikut dibaca sebagai data. |
| `app/board.tsx` | State `offline` dan `takeFailed`. Pembaruan yang gagal menyalakan `offline`, menyimpan nomor terakhir, dan padam pada jawaban baik berikutnya. Pesan dengan `role="alert"` di atas kartu. Keadaan kosong, serta satu baris di bawah tombol saat mengambil nomor gagal. |
| `app/globals.css` | Empat token baru, yaitu `--on-accent`, `--danger`, `--danger-surface`, dan `--stale`. |
| `app/page.module.css` | Gaya untuk pesan, keadaan kosong, dan galat. Teks tombol memakai `var(--on-accent)` sebagai ganti nilai mentah `#ffffff`. |
| `shots/` | Tangkapan layar sebelum dan sesudah, pada 390x844 dan 1440x900. |

### Cara Memeriksa

```sh
bun run build
bunx tsc --noEmit
grep -rnE "#[0-9a-fA-F]{3,8}\b" app --include="*.css" --include="*.tsx" | grep -v "app/globals.css"
```

Perintah pertama dan kedua harus selesai tanpa galat. Perintah ketiga tidak boleh mencetak apa pun,
karena semua nilai warna tinggal di `app/globals.css`.

Lalu periksa dengan mata.

1. Jalankan antre-api dan antre-web, lalu ambil empat nomor.
2. Hentikan antre-api dan tunggu sepuluh detik. Pesan muncul di atas kartu dan nomor terakhir
   berubah ke warna stale.
3. Jalankan antre-api lagi. Pesan hilang dalam beberapa detik.

### Tabel Bukti

| Tanda selesai | Bukti | Status |
| --- | --- | --- |
| Sistem desain tercatat | `DESIGN.md` di root, dan pencari nilai mentah tidak mencetak apa pun | Terukur |
| Build dan tipe lolos | `bun run build` dan `bunx tsc --noEmit` pada Next.js 16.4.6 | Terukur |
| Keadaan gagal tampil | `shots/board-error-light-mobile.png` dan versi desktop | Terukur lewat tangkapan layar |
| Keadaan kosong tampil | `shots/board-empty-light-mobile.png` dan versi desktop | Terukur lewat tangkapan layar |
| Pesan hilang saat server kembali | Dibaca dari kode di `app/board.tsx` | Diperkirakan. Belum diperiksa ulang dengan tangan |
| Kontras warna baru | danger di atas surface 6,57, danger di atas danger-surface 5,75, stale di atas surface 5,14, stale di atas background 4,92 | Terukur dengan skrip kontras kelas |

### Yang Perlu Diperhatikan

- `DESIGN.md` berubah lebih dulu daripada kode. Polanya ditulis, warnanya diukur, baru agen
  membangun.
- Papan tetap menampilkan nomor terakhir saat server mati, tetapi menandainya. Menghapus nomor
  akan membuat ruang tunggu kehilangan satu-satunya informasi yang masih berguna.
- Belum ada tes otomatis untuk keadaan gagal, jadi cacat ini bisa kembali tanpa ada yang tahu.
- Tema gelap belum ada. `DESIGN.md` menuliskannya sebagai keputusan, bukan sebagai kelalaian.
