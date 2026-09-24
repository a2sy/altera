---
{"dg-publish":true,"permalink":"/garden/tech/yt-dlp/","tags":["linux","cli","software"],"dg-note-properties":{"created":"2024-07-22","modified":"2026-09-25","tags":["linux","cli","software"]}}
---

Mendownload video dari internet kini menjadi lebih mudah, apalagi dengan adanya tools yang dapat dengan mudah membantu kita melakukannya. Misalnya dengan bantuan situs web yang banyak beredar di internet. Video yang diunduh dari situs-situs tersebut mungkin saja disisipi malware berbahaya, atau anda terpaksa menonton iklan yang mengganggu sebelum bisa menikmati video yang diinginkan. Belum lagi, kualitas video yang didownload seringkali tidak optimal.
Untungnya, ada solusi yang lebih aman,nyaman dan berkualitas: yt-dlp.

# Apa itu yt-dlp?
[yt-dlp](https://github.com/yt-dlp/yt-dlp/) adalah sebuah fork dari [youtube-dl](https://github.com/ytdl-org/youtube-dl). program command-line yang bisa digunakan untuk mengunduh video dan audio dari lebih ratusan website, seperti youtube, bilibili, instagram, tiktok dan [banyak lagi web lainnya](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md). 

dan... gimana cara menggunakannya?

# Install yt-dlp
Anda dapat menginstal yt-dlp menggunakan official [realease binary](https://github.com/yt-dlp/yt-dlp/wiki/Installation#using-the-release-binary) ,[pip](https://github.com/yt-dlp/yt-dlp/wiki/Installation#with-pip), atau dengan [package manager](https://github.com/yt-dlp/yt-dlp/wiki/Installation#third-party-package-managers) favorit anda.
## Install dengan binary file

| File             | Deskription                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| [yt-dlp.exe]()   | Windows (Win7 SP1+) standalone x64 binary (recommended for **Windows**)    |
| [yt-dlp_macos]() | Universal MacOS (10.15+) standalone executable (recommended for **MacOS**) |
|                  |                                                                            |
## Install yt-dlp di OS *unix
- install dengan wget
```sh
wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O ~/.local/bin/yt-dlp
chmod a+rx ~/.local/bin/yt-dlp  # Make executable
```

- update
```sh
yt-dlp -U
```

## Install yt-dlp di Windows
selain menginstall yt-dlp melalui binary file yang ada diatas, bisa juga menginstall yt-dlp melalui chocolatey
```
choco install ffmpeg
choco install yt-dlp
```

---

[dan banyak lagi](https://github.com/yt-dlp/yt-dlp#release-files).

Selain itu kamu juga bisa menginstallnya di [android](https://github.com/yt-dlp/yt-dlp/wiki/Installation#android), atau jika kamu kurang familiar dengan command line, tersedia banyak [GUI Apps](https://www.reddit.com/r/youtubedl/wiki/info-guis/) yang bisa digunakan.
## Install FFMPEG
Sebelum bisa menggunakan yt-dlp diperlukan ffmpeg untuk terinstall di perangkat terlebih dahulu

```
sudo apt install ffmpeg
```

# Unduh video
okee ayok kita mulai, untuk mendownload video bisa dengan memasukkan perintah berikut ke terminal

```sh
yt-dlp 'URL_VIDEO'
```
ganti `URL_VIDEO` dengan url video yang mau anda download. Misal :
```sh
yt-dlp https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

![yt-dlp 1.png](/img/user/Store/Images/yt-dlp%201.png)
masukkan perintah diatas, tekan enter, tunggu proses selesai.. dan selamat video sudah tersedia untuk ditonton

![yt-dlp 2.png](/img/user/Store/Images/yt-dlp%202.png)

- Memilih format Video
yt-dlp memungkinkan Anda untuk memilih format video yang ingin didownload. Gunakan perintah berikut untuk melihat format yang tersedia:
```sh
yt-dlp -F 'URL_VIDEO'
```
misal:
```sh
yt-dlp -F https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

![yt-dlp 3.png](/img/user/Store/Images/yt-dlp%203.png)
Setelah melihat daftar format, Anda bisa memilih format yang diinginkan dengan menambahkan opsi `-f` diikuti oleh ID.
```
yt-dlp -f ID_AUDIO+ID_VIDEO URL_VIDEO
```
misal :
```sh
yt-dlp -f 140+136 https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

![yt-dlp 4.png](/img/user/Store/Images/yt-dlp%204.png)

### download dengan kualitas terbaik
Selain memilih format secara manual anda juga bisa untuk mendownload video dengan kualitas terbaik menggunakan yt-dlp, caranya bisa dengan menggunakan perintah berikut:
```sh
yt-dlp -f bestvideo+bestaudio/best URL_VIDEO
```

misal
```sh
yt-dlp -f bestvideo+bestaudio/best --embed-metadata --embed-thumbnail --embed-chapters 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
```

keterangan:
- `--embed-metadata` : untuk menyertakan metadata file yang didownload
- `--embed-thumbnail` : unduh dan langsung menyertakan thumbnail dari file
- `--embed-chapters` : unduh dan memasukkan chapter yang ada di video langsung kedalam file.

- Download seluruh video di playlist
```sh
yt-dlp URL_PLAYLIST
```

## menyimpan video di folder tertentu
tambahkan opsi `-o` untuk menyimpan video ke dalam folder tertentu
```sh
yt-dlp -f bestvideo+bestaudio/best -o "~/Downloads/Playlist/%(playlist)s/%(title)s.%(ext)s" URL_PLAYLIST
```

## download dari bilibili
``` bash
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]"  https://www.bilibili.tv/id/video/4791222210003456
````

- lihat seluruh subtitle yang tersedia
```bash
yt-dlp --list-subs 'URL_VIDEO'
```
- To download a video with selected subtitles (comma separated):
```sh
$ yt-dlp --write-sub --sub-lang _LANG_ _URL_
```

- For auto-generated subtitles:
```sh
$ yt-dlp --write-auto-sub --sub-lang _LANG_ _URL_
```

- embed-sub, untuk memasukkan sub title kedalam video (sukses)
```sh
yt-dlp --embed-subs Grave\ of\ the\ firefiles\ \(1080p\)\ sub\ indo\ \[4788471671691776\].mp4 --sub-langs id "https://www.bilibili.tv/id/vid
eo/4788471671691776"
```

## Download Subtitle
direkomendasikan ikutin yang ini daripada diatas
```bash
yt-dlp --embed-thumbnail --embed-metadata --embed-chapter --write-sub --sub-lang en -f 399+251 "https://www.youtube.com/watch?v=A-oxDZ3AO74"
```

Tambahkan `--skip-download` to get only subtitles.

- Apabila terjadi error, tambahkan opsi -vU untuk mengetahui apa masalah error yang didapat

## Unduh audio
jika anda ingin hanya mendownload audio saja dari youtube, misalnya dalam format MP3:
```sh
yt-dlp -x -f bestaudio https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

direkomendasikan untuk mendownload audio dari youtube music
```sh
yt-dlp --embed-metadata --embed-thumbnail  -f 140 "https://music.youtube.com/watch?v=4JwAauR2pwU&si=3ivVTq0zLv-I6FC2"
```

# Opsi lebih lanjut

## Mengunduh dengan input
- perintah mendownload, tambahkan `-a` diikuti dengan file .txt yang berisi list link yang ingin di unduh
``` bash
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]"  -a download.txt
```
- isi file download.txt
``` sh
https://www.bilibili.tv/id/video/4791375131968000
https://www.bilibili.tv/video/4791454825710080
https://www.bilibili.tv/video/4791537588634112
https://www.bilibili.tv/video/4791617180926464
```

```bash
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" -o "%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" 'https://youtube.com/playlist?list=PLCnD2jU_siVqL0uTAXDfPunGepfVIF_59&si=48uSrTz6MCi7wFSx'
```

## Lihat manual atau bantuan
tambahkan opsi `--help` atau `-h` untuk melihat opsi apa saja yang bisa digunakan
```sh
yt-dlp -h
```

atau jika kesulitan bisa juga dilihat [disini](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#usage-and-options) 

---
# Referensi dan bacaan menarik
- [Github repository yt-dlp](https://github.com/yt-dlp/yt-dlp) dan [wiki](https://github.com/yt-dlp/yt-dlp/wiki)
- [Supported sites](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)
- [Github repository youtube-dl](https://github.com/ytdl-org/youtube-dl)
- [yt-dlp - ArchWiki](https://wiki.archlinux.org/title/Yt-dlp)
- [GUI's for yt-dlp/youtube-dl - r/youtubedl](https://www.reddit.com/r/youtubedl/wiki/info-guis)
- https://blog.devinschumacher.com/how-to-download-udemy-videos