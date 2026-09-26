---
{"dg-publish":true,"permalink":"/garden/tech/termux/","title":"Termux 101","tags":["android","linux","software"],"created":"2026-09-25","dg-note-properties":{"created":"2024-08-01","modified":"2026-09-25","title":"Termux 101","tags":["android","linux","software"]}}
---

Termux adalah emulator terminal *open-source* untuk perangkat android, termux memungkinkan untuk menjalankan berbagai perintah dan program Linux langsung dari perangkat android tanpa perlu melakukan *root*.
# Kenapa Termux?
Ada banyak alasan mengapa termux menjadi populer dan banyak digunakan oleh orang
1. Termux bekerja tanpa memerlukan akses *root*. umumnya membuka akses *root* dapat membatalkan garansi perangkat dan berpotensi menimbulkan masalah keamanan.
2. Termux menyediakan lingkungan Linux yang lengkap dengan berbagai *tools*, seperti Bash, Vim, Git, dan banyak lagi. 
3. Termux dapat digunakan untuk mengakses komputer pribadi atau mengelola server web dari jarak jauh.
# Unduh Termux

Disarankan untuk tidak mengunduh termux melalui google playstore, termux dapat diunduh langsung melalui melalui [github](https://github.com/termux/termux-app/releases) atau [F-Droid](https://f-droid.org/en/packages/com.termux/).

![download_termux_github.png](/img/user/Store/Images/download_termux_github.png)

![download_termux_fdroid.png](/img/user/Store/Images/download_termux_fdroid.png)
# Hal yang dapat dilakukan setelah memasang Termux

![homescreen_termux.png](/img/user/Store/Images/homescreen_termux.png)
Ada beberapa hal yang mungkin dibutuhkan setelah memasang Termux, beberapa diantaranya yaitu: 
## Memperbarui repositori dan packages

Perintah ini akan memperbarui daftar packages dari repositori Termux
```bash
pkg update
```

Kemudian jalankan perintah berikut untuk upgrade packages yang sudah terpasang ke versi terbaru
```bash
pkg upgrade -y
```

Opsi -y secara otomatis menjawab "yes" untuk semua pertanyaan konfirmasi, sehingga proses upgrade berjalan tanpa interupsi.

![update_upgrade_termux.png](/img/user/Store/Images/update_upgrade_termux.png)

## Memasang packages pada Termux
Untuk memasang packages (software) pada termux, cukup mengetik `pkg install <nama-packages>` pada terminal termux

Contoh, untuk memasang `neofetch`, ketikkan:
```bash
pkg install neofetch
```

Untuk menghapus `neofetch`, ketikkan:
```bash
pkg remove neofetch
```

Untuk mencari nama packages di repository termux, gunakan:
```bash
pkg search <nama-packages>
```
## Memberikan izin akses ke penyimpanan

Secara default, Termux memiliki akses terbatas ke penyimpanan internal. Untuk memberikan akses penuh, jalankan perintah berikut:

```bash
termux-setup-storage
```

Ini akan meminta izin akses penyimpanan. Setelah diberikan, Anda dapat mengakses penyimpanan internal melalui direktori `/storage`.

## Memberikan izin akses ke penyimpanan

Secara default, Termux memiliki akses terbatas ke penyimpanan internal. Untuk memberikan akses penuh, jalankan perintah berikut:

```bash
termux-setup-storage
```

Ini akan meminta izin akses penyimpanan. Setelah diberikan, Anda dapat mengakses penyimpanan internal melalui direktori /storage.

  
## Melakukan remote access ke komputer lain dengan SSH

Secara default SSH belum terpasang di Termux, untuk melakukan remote access dengan SSH perlu untuk memasang packages `openssh` terlebih dahulu
```bash
pkg install openssh
```

setelah `openssh` berhasil terpasang, sekarang Anda sudah bisa terhubung dengan komputer lain dengan SSH
```bash
ssh -p 22 <username>@<host/ip_address>
```

# Perintah Dasar Termux
Umumnya perintah-perintah yang digunakan di linux dapat juga digunakan di termux, berikut beberapa perintah dasar yang perlu diketahui untuk berinteraksi dengan termux:
- `pkg update` atau `apt update`: Memperbarui daftar packages yang tersedia
- `pkg upgrade` atau `apt upgrade`: Mengupgrade packages yang sudah terpasang ke versi terbaru
- `ls`: Menampilkan daftar file dan direktori di direktori saat ini
- `cd <direktori>`: Berpindah ke direktori lain, Contoh: `cd /storage` untuk berpindah ke penyimpanan internal.
- `cd ..`: Kembali ke direktori sebelumnya
- `pwd`: Menampilkan lokasi direktori saat ini
- `mkdir <nama-direktori>`: Membuat direktori baru
- `rm <nama-file>`: Menghapus file
- `rmdir <nama-direktori>`: Menghapus direktori
- `clear`: Membersihkan layar terminal
- `exit`: Keluar dari termux

--- 
# Referensi dan bacaan lebih lanjut
- [A simple Termux tutorial for beginners - Ivon's Blog](https://ivonblog.com/en-us/posts/how-to-use-termux/)
- [Termux Wiki](https://wiki.termux.com/wiki/)
- [Termux Github Repository](https://github.com/termux/termux-app)