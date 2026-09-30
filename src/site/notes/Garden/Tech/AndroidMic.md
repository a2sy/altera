---
{"dg-publish":true,"permalink":"/garden/tech/android-mic/","title":"Ubah Android menjadi microfon komputer (AndroidMic)","tags":["android","software","linux"],"created":"2026-09-27","dg-note-properties":{"created":"2026-09-27","modified":"2026-09-27","tags":["android","software","linux"],"title":"Ubah Android menjadi microfon komputer (AndroidMic)","stage":"seedling"}}
---

Ubah android jadi microphone untuk recording atau streaming.

- source / repository: https://github.com/teamclouday/AndroidMic
- Tersedia untuk Windows, Linux, dan MacOS

# Prasyarat
Komputer memerlukan **Virtual Audio Cable** terinstal agar aliran suara dari Android dapat dikenali sebagai perangkat input mikrofon.
## Konfigurasi di Linux
Pada Linux umumnya tidak perlu menginstal aplikasi tambahan karena dapat memanfaatkan audio server bawaan seperti PipeWire atau PulseAudio.

 1. Membuat virtual audio cable (PulseAudio)
 Buka terminal dan jalankan perintah berikut untuk membuat _virtual sink_ dan _source_:
```bash
pactl load-module module-null-sink sink_name=virtual_mic
pactl load-module module-remap-source master=virtual_mic.monitor source_name=virtual_mic_source
```

- contoh output terminal:
```bash
536870916
536870917
```

2. Konfigurasi firewall
Izinkan port yang digunakan oleh AndroidMic melalui `ufw` agar koneksi dari HP ke komputer tidak terblokir:
```bash
sudo ufw allow 54345/tcp
sudo ufw allow 54345/udp
```


## Tampilan Antarmuka Aplikasi
![Pasted image 20260927125816.png](/img/user/Pasted%20image%2020260927125816.png)
*Gambar 1: Tampilan utama AndroidMic (09/27/2026)*

![Pasted image 20260927125958.png](/img/user/Pasted%20image%2020260927125958.png)
*Gambar 2: Tampilan pengaturan AndroidMic (27/09/2026)*

# Referensi dan bacaan lebih lanjut
- [AndroidMic Github Repository](https://github.com/teamclouday/AndroidMic)