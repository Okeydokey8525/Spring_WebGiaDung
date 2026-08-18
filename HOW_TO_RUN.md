# Hướng dẫn chạy dự án HomeStore

Dự án này bao gồm 3 phần chính cần được khởi chạy:
1. **Infrastructure (Cơ sở dữ liệu)**: SQL Server qua Docker
2. **Backend API (`homestore-api`)**: Spring Boot
3. **Frontend Web (`homestore-web`)**: Next.js

## Yêu cầu hệ thống (Prerequisites)
- **Docker & Docker Compose** (để chạy database)
- **Java 17+** (để chạy Spring Boot)
- **Node.js 18+** (để chạy Next.js)

---

## 1. Khởi động Cơ sở dữ liệu (Database)

Dự án sử dụng SQL Server chạy trên Docker.

1. Mở terminal và di chuyển vào thư mục `infrastructure`:
   ```bash
   cd infrastructure
   ```
2. Copy file `.env.example` thành `.env` (có thể cần đổi mật khẩu nếu cần thiết):
   ```bash
   cp .env.example .env
   ```
3. Khởi động container SQL Server:
   ```bash
   docker-compose up -d
   ```
   *(Database sẽ chạy ở port 1433 của máy)*

---

## 2. Khởi động Backend API (`homestore-api`)

Backend là một ứng dụng Spring Boot.

1. Mở một terminal **mới** và di chuyển vào thư mục `homestore-api`:
   ```bash
   cd homestore-api
   ```
2. Chạy ứng dụng bằng Maven wrapper:
   - Trên **Windows**:
     ```bash
     mvnw.cmd spring-boot:run
     ```
   - Trên **macOS/Linux**:
     ```bash
     ./mvnw spring-boot:run
     ```
   *(API sẽ chạy mặc định tại http://localhost:8080)*

---

## 3. Khởi động Frontend Web (`homestore-web`)

Frontend được xây dựng bằng Next.js.

1. Mở một terminal **mới** và di chuyển vào thư mục `homestore-web`:
   ```bash
   cd homestore-web
   ```
2. Copy file cấu hình môi trường `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```
3. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
4. Khởi chạy ứng dụng môi trường dev:
   ```bash
   npm run dev
   ```
   *(Giao diện web sẽ chạy tại http://localhost:3000)*

---

## Tóm tắt luồng hoạt động
- **Database** chạy ngầm qua Docker (`localhost:1433`).
- **Backend API** cung cấp dữ liệu qua cổng `8080`.
- **Frontend** kết nối tới API và phục vụ giao diện người dùng qua cổng `3000`. 

Bạn có thể truy cập **http://localhost:3000** trên trình duyệt để sử dụng trang web.
