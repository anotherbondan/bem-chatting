# 🚀 Panduan Menjalankan Proyek di Lokal

## 📌 Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (disarankan versi terbaru LTS)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## 📂 Struktur Proyek
```
bem-chatting/
│── backend/     # Folder untuk backend (Express.js)
│── frontend/    # Folder untuk frontend (Next.js)
│── README.md    # Panduan ini
```

---

## 🔥 Menjalankan Backend (Express.js)

1. **Masuk ke folder backend**
   ```sh
   cd backend
   ```
2. **Install dependencies**
   ```sh
   npm install @prisma/client cors dotenv express prisma nodemon
   ```
4. **Tambahkan PORT pada file .env**
   ```sh
   PORT=3001
   ```
5. **Jalankan server**
   ```sh
   nodemon ./src
   ```
6. **Cek apakah server berjalan**
   Buka browser atau gunakan Postman untuk mengakses:
   ```
   http://localhost:3001
   ```

---

## 🌟 Menjalankan Frontend (Next.js)

1. **Masuk ke folder frontend**
   ```sh
   cd ../frontend
   ```
2. **Install dependencies**
   ```sh
   npm install @hookform/resolvers@^5.2.0 @radix-ui/react-slot@^1.2.3 @radix-ui/react-tabs@^1.1.12 @tanstack/react-query@^5.83.0 class-variance-authority@^0.7.1 clsx@^2.1.1 framer-motion@^12.23.9 lucide-react@^0.525.0 motion@^12.23.9 next@15.4.3 react@19.1.0 react-dom@19.1.0 react-hook-form@^7.61.1 sonner@^2.0.6 tailwind-merge@^3.3.1 zod@^4.0.10


   ```
3. **Jalankan Next.js**
   ```sh
   npm run dev
   ```
4. **Buka di browser**
   ```
   http://localhost:3000
   ```
---
## 📌 Setup Database

1. **Buat database kosong dengan nama yang sama (`bem-chatting`)**
   ```sh
   CREATE DATABASE "bem-chatting";
   ```
2. **Buat file `.env` dan pastikan koneksi database sudah sesuai** 
   ```
   DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/bem-chatting
   ```
   *(Ganti `yourpassword` dengan password PostgreSQL di komputer Anda)*

3. **Jalankan migrasi Prisma**
   ```sh
   npx prisma migrate dev
   ```

4. **Jalankan backend**
   ```sh
   nodemon ./src
   ```
---
## 🎉 Selesai!
Sekarang proyek berjalan di lokal. Happy coding! 🚀

