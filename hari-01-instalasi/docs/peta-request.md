# Peta Perjalanan Request Web

Berikut adalah jalur lengkap proses komunikasi web saat membuka `http://localhost/hari-01/tes.php`, digambarkan berdasarkan konsep Arsitektur Client-Server (T2-T6):

## Diagram Alir Sederhana

```text
[Klien / Browser] --(1) Ketik URL (T4)---> [DNS Lokal (T3) localhost -> 127.0.0.1]
       ^                                            |
       |                                        (2) Port 80 (T3)
  (6) Render (T2)                                   |
       |                                        (3) HTTP GET (T5)
       |                                            v
       +------- (5) HTTP Response 200 OK (T5) ------+ [Web Server Apache (T6)]
                                                            |       ^
                                                      (4) Serahkan file .php
                                                          Kembalikan HTML (T6)
                                                            v       |
                                                      [Interpreter PHP (T6)]