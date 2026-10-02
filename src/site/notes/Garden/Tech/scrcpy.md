---
{"dg-publish":true,"permalink":"/garden/tech/scrcpy/","title":"Cara Mirroring layar smartphone ke Laptop","tags":["software","cli","linux","windows"],"updated":"2026-10-03","dg-note-properties":{"created":"2024-02-02T14:06:00+07:00","modified":"2026-10-03","tags":["software","cli","linux","windows"],"title":"Cara Mirroring layar smartphone ke Laptop"}}
---

# Pendahuluan

## Kenapa melakukan mirroring ke laptop?

Layar HP kecil, dan kadang kita ingin melakukan hal-hal yang lebih nyaman di laptop, seperti:

- Mengetik dengan keyboard fisik dan menyalin teks antara HP dan laptop.
- Presentasi atau demo aplikasi Android ke orang lain.
- Merekam layar beserta audio internal tanpa aplikasi tambahan.
- Mengontrol HP dengan mouse saat HP sedang diisi daya atau diletakkan di tempat lain.
- Menjalankan aplikasi Android di jendela terpisah seperti aplikasi desktop (virtual display).
- Memakai kamera HP sebagai webcam.

untuk melakukan semua itu, ada satu software open source yang sudah terkenal dan digunakan banyak orang, yaitu scrcpy.
## Apa itu scrcpy?

scrcpy (*screen copy*) adalah aplikasi open source buatan Genymobile untuk menampilkan dan mengontrol perangkat Android dari komputer. Koneksinya lewat USB atau Wi-Fi (via `adb`), dengan latensi rendah. 

## Kenapa scrcpy?
Karena scrcpy itu gratis, open source, tidak perlu root, tidak butuh aplikasi di HP, dan tidak ada iklan.

## Bagaimana caranya?

Singkatnya, scrcpy menjalankan sebuah *server* kecil di HP melalui `adb`. Server itu meng-encode layar dan audio lalu mengirimnya ke komputer, tempat *client* scrcpy menampilkannya. Input keyboard dan mouse dari komputer dikirim balik ke HP.

Alurnya:
1. Aktifkan **USB debugging** di HP.
2. Pasang `adb` dan `scrcpy` di komputer.
3. Hubungkan HP (USB atau Wi-Fi).
4. Jalankan `scrcpy`.

---

# Persyaratan

- HP Android (minimal Android 5.0 untuk mirroring, Android 11+ untuk audio).
- **USB debugging** aktif: *Settings → Developer options → USB debugging*.
  - Opsi Pengembang muncul setelah mengetuk **Build number** 7 kali di *Settings → About phone*.
  - Di beberapa HP (misalnya Xiaomi), aktifkan juga **USB debugging (Security settings)** agar kontrol keyboard/mouse bisa dipakai.
- Komputer dengan `adb` dan `scrcpy`.

## Install adb dan scrcpy

Install `adb` melalui halaman berikut: https://developer.android.com/tools/adb

### Linux

**Rilis resmi:** unduh build statis `scrcpy-linux-x86_64-xxx.tar.gz` dari halaman [rilis terbaru](https://github.com/Genymobile/scrcpy/releases/latest), lalu ekstrak.

**Package manager:**

- Arch Linux: `pacman -S scrcpy`
- Fedora: `dnf copr enable zeno/scrcpy && dnf install scrcpy`

untuk lebih lengkap, [lihat disini](https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md).

### Windows

**Rilis resmi:** unduh `scrcpy-win64-xxx.zip` dari halaman [rilis terbaru](https://github.com/Genymobile/scrcpy/releases/latest), lalu ekstrak.

**Package manager** (adb ikut terpasang):

```bash
winget install --exact Genymobile.scrcpy
```

Alternatif: `choco install scrcpy` + `choco install adb`, atau `scoop install scrcpy` + `scoop install adb`.

### Menjalankan

Buka terminal, lalu:

```bash
scrcpy
```

---

# Terhubung dengan smartphone

Ada dua cara untuk terhubung dengan perangkat.
## Koneksi dengan USB

1. Colokkan HP ke laptop dengan kabel USB (pakai kabel data, bukan kabel khusus pengisi daya).
2. Saat muncul dialog **Allow USB debugging?** di HP, pilih **Allow**.
3. Cek koneksi:

```bash
adb devices
```

4. Jalankan:

```bash
scrcpy
```

## Koneksi dengan WIFI

### Opsi 1: Menggunakan Fitur Auto-Pairing (scrcpy Versi Baru / Android 11+)

Jika menggunakan Android 11 ke atas, kamu bisa langsung menyambungkan tanpa kabel sama sekali sejak awal:

* Aktifkan Opsi Pengembang (Developer Options) di HP, lalu masuk ke menu tersebut.

* Cari dan aktifkan Nirkabel debugging (Wireless debugging).

* Ketuk menu Wireless debugging tersebut, lalu pilih Pasangkan perangkat dengan kode pemasangan (Pair device with pairing code). HP akan menampilkan IP address, Port, dan Kode Pairing.

* Buka terminal/command prompt di laptop, lalu jalankan perintah berikut (sesuaikan port dan kodenya):

```bash

adb pair <IP_HP>:<PORT_PAIRING>

```

Masukan kode pairing yang tertera di HP saat diminta.

* Setelah sukses paired, lihat angka Port di halaman utama Wireless debugging (port ini berbeda dari port pairing), lalu hubungkan dengan perintah:

```bash

adb connect <IP_HP>:<PORT_UTAMA>

```

* Jalankan scrcpy seperti biasa:

```bash

scrcpy

```

### Opsi 2: Metode Kabel Pertama (Semua Versi Android)

Metode ini paling mudah dan stabil jika HP menggunakan Android versi lama:

* Colokkan HP ke laptop menggunakan kabel USB terlebih dahulu.

* Buka terminal/command prompt di laptop dan jalankan perintah untuk mengaktifkan mode jaringan:

```bash

scrcpy --tcpip

```

(Atau jalankan perintah adb tcpip 5555).

* Cabut kabel USB dari HP.

* Hubungkan scrcpy ke IP HP kamu (bisa dicheck di Settings > About Phone > Status atau di pengaturan Wi-Fi):

```bash

adb connect <IP_HP>:5555

```

* Jalankan scrcpy.

```bash

scrcpy

```

## Pertimbangan Menggunakan Wi-Fi vs Kabel

* Latensi & Baterai: Koneksi Wi-Fi akan memiliki sedikit delay tambahan dibanding kabel USB, serta menguras baterai HP lebih cepat karena transceiver Wi-Fi bekerja terus-menerus.

* Audio: Transfer audio (scrcpy v2.0+) tetap berjalan via Wi-Fi, namun pastikan sinyal Wi-Fi stabil (disarankan jaringan Wi-Fi 5 GHz) agar suara dan gambar tidak stuttering atau patah-patah.

* Tips Performa: Jika tampilan terasa patah-patah di Wi-Fi, jalankan scrcpy dengan menurunkan bitrate dan resolusi:

```bash

scrcpy -m 1024 -b 4M

```

---

## Virtual Display

Alih-alih mirroring layar HP, scrcpy bisa membuat **layar virtual** baru sehingga aplikasi berjalan di jendela terpisah dan layar fisik HP tidak terganggu.

```bash
scrcpy --new-display=1920x1080          # resolusi 1920x1080
scrcpy --new-display=1920x1080/420      # paksa 420 dpi
scrcpy --new-display                    # ukuran dan dpi layar utama
```

Layar virtual dihancurkan saat scrcpy ditutup. Untuk memindahkan aplikasi yang sedang berjalan ke layar utama alih-alih menutupnya, tambahkan `--no-vd-destroy-content`.

### Lihat daftar aplikasi

Di layar virtual, kadang tidak ada launcher, jadi kamu harus menentukan aplikasi yang dijalankan lewat *package name*:

```bash
scrcpy --list-apps
```

```bash
scrcpy --new-display=1920x1080 --start-app=org.videolan.vlc
```

Tips `--start-app`:

- Awalan `+` memaksa aplikasi berhenti dulu sebelum dijalankan: `--start-app=+org.mozilla.firefox`
- Awalan `?` mencari berdasarkan nama (lebih lambat): `--start-app=?firefox`

### Memakai launcher sendiri

Kalau ingin tampilan seperti desktop, pakai launcher open source seperti [Fossify Launcher](https://f-droid.org/en/packages/org.fossify.home/):

```bash
scrcpy --new-display=1920x1080 --no-vd-system-decorations --start-app=org.fossify.home
```

### Flex display

Ukuran layar virtual menyesuaikan ukuran jendela secara dinamis:

```bash
scrcpy --new-display --start-app=com.android.settings --flex-display
```

Naikkan bit rate (atau pakai h265) supaya kualitas tetap bagus di jendela besar: `-b16M --video-codec=h265`.

---

## Rekomendasi konfigurasi

### Mirroring + recording

```bash
scrcpy \
  --fullscreen \
  --max-fps 30 \
  --audio-bit-rate 320K \
  --stay-awake \
  --record rekaman_scrcpy.mkv
```

### Mirroring sederhana

```bash
scrcpy --fullscreen --stay-awake
```

### Mirroring penuh (jendela tetap di atas)

```bash
scrcpy \
  --window-width 1080 --window-height 1920 \
  --start-app=org.fossify.home \
  --window-title 'Wizudex' \
  --always-on-top \
  --window-x 100 --window-y 100 \
  --max-fps 90 \
  --video-bit-rate 16M --video-codec=h264 \
  --audio-bit-rate=256K --audio-buffer=40 \
  --turn-screen-off --stay-awake --disable-screensaver \
  --keyboard=uhid
```

### Mode game

```bash
scrcpy --turn-screen-off --disable-screensaver --show-touches --stay-awake \
  --video-codec=h265 --video-bit-rate=16M --audio-bit-rate=256K --max-fps=144
```

### Buka display baru

```bash
scrcpy --new-display=1920x1080/160 --start-app=org.fossify.home \
  --window-title 'Wizudex' \
  --always-on-top \
  --window-x 100 --window-y 100 \
  --max-fps 90 \
  --video-bit-rate 16M --video-codec=h264 \
  --audio-bit-rate=256K --audio-buffer=40 \
  --turn-screen-off --stay-awake --disable-screensaver \
  --keyboard=uhid
```

### Buka display baru + rekam

Sama seperti di atas, tambahkan `--record rekaman_scrcpy.mkv`.

### Penjelasan opsi penting

| Opsi | Fungsi |
|---|---|
| `--max-fps` | Batas frame rate capture |
| `--video-bit-rate` / `-b` | Bit rate video (default 8M) |
| `--video-codec` | `h264` (latensi rendah), `h265` (kualitas lebih baik) |
| `--max-size` / `-m` | Batas lebar/tinggi video |
| `--turn-screen-off` / `-S` | Matikan layar HP saat mirroring |
| `--stay-awake` / `-w` | Cegah HP tidur (hanya saat dicolok daya) |
| `--keyboard=uhid` / `-K` | Simulasi keyboard fisik, mendukung semua karakter dan IME |
| `--audio-buffer` | Buffer audio (ms) untuk mengurangi patah-patah |
| `--always-on-top` | Jendela selalu di atas |
| `--window-title` | Judul jendela |
| `--show-touches` / `-t` | Tampilkan sentuhan fisik |

### Rekaman

- Rekam video + audio: `scrcpy --record=file.mp4` (atau `-r file.mkv`)
- Hanya video: `scrcpy --no-audio --record=file.mp4`
- Hanya audio: `scrcpy --no-video --record=file.opus`
- Rekam tanpa jendela: `scrcpy --no-window --record=file.mp4` (hentikan dengan `Ctrl+C`)
- Batasi durasi: `scrcpy --record=file.mkv --time-limit=20`

Rekaman memakai timestamp dari HP, jadi hasilnya bersih walau jaringan Wi-Fi tersendat.

## Shortcut berguna

`MOD` secara default adalah `Alt` kiri atau `Super` kiri.

| Aksi              | Shortcut                   |
| ----------------- | -------------------------- |
| Layar penuh       | `MOD`+`f` atau `F11`       |
| Tombol Home       | `MOD`+`h` atau klik tengah |
| Tombol Back       | `MOD`+`b` atau klik kanan  |
| App switch        | `MOD`+`s`                  |
| Matikan layar HP  | `MOD`+`o`                  |
| Nyalakan layar HP | `MOD`+`Shift`+`o`          |
| Panel notifikasi  | `MOD`+`n`                  |
| Ukuran 1:1        | `MOD`+`g`                  |
| Tampilkan FPS     | `MOD`+`i`                  |
| Keluar            | `MOD`+`q`                  |
|                   |                            |

Seret file `.apk` ke jendela untuk memasangnya, atau file lain untuk mengirimnya ke HP.

---

# References

- [Repositori scrcpy (Genymobile)](https://github.com/Genymobile/scrcpy)
- [Rilis terbaru](https://github.com/Genymobile/scrcpy/releases/latest)