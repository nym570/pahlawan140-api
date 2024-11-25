# Pahlawan140

backend yang digunakan oleh web pahlawan140 BPS Kabupaten Sidoarjo.

## Tentang Sistem

- **Node & Express JS** : Framework untuk membangun API.
- **JSON Web Token (JWT)**: Digunakan untuk autentikasi dan pengiriman informasi dengan aman.
- **Nodemailer**: Digunakan untuk mengirim email secara otomatis
- **MySQL**: Database yang digunakan API.

## Cara Penggunaan?

**Clone / download repository**

```shell
# Clone Repository
$ git clone https://github.com/nym570/pahlawan140-api.git
```

**Masuk ke folder proyek dan install dependensi**

```shell
# install dependency
$ npm install
```

**Jalankan proyek**

```shell
# Pengembangan lokal
$ nodemon npm start
```
```shell
# Pengembangan produksi
$ npm pm2 start index.js --watch
```

## Struktur Proyek

```shell
pahlawan140-api/
├── config/              # Konfigurasi aplikasi
├── controllers/         # Logic handler untuk setiap route
├── middleware/          # Middleware membantu untuk keamanan route
├── models/              # Model data sequelize MySQL
├── routes/              # Definisi route API
├── migrations/          # Migrasi untuk membangun tabel model
├── seeders/             # Seed untuk mengisi tabel otomatis
├── utils/               # Utility functions
├── views/               # Template email
├── index.js             # Konfigurasi Express dan entry point aplikasi
├── package-lock.json    # File penguncian dependensi
├── package.json         # File yang berisi metadata proyek dan daftar dependensi
└── README.md
```
