# WordPress trên Docker

Setup WordPress + MySQL chạy bằng Docker Compose.

## Yêu cầu

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) đã cài và đang chạy.

## Cách dùng

1. (Khuyến nghị) Mở file `.env` và đổi các mật khẩu mặc định.

2. Khởi động:

   ```powershell
   docker compose up -d
   ```

3. Mở trình duyệt vào: http://localhost:8080 và làm theo trình cài đặt WordPress.

## Các lệnh thường dùng

| Việc cần làm | Lệnh |
|---|---|
| Khởi động (chạy nền) | `docker compose up -d` |
| Xem trạng thái | `docker compose ps` |
| Xem log | `docker compose logs -f` |
| Dừng (giữ dữ liệu) | `docker compose stop` |
| Dừng + xóa container (giữ dữ liệu) | `docker compose down` |
| Xóa tất cả kể cả dữ liệu | `docker compose down -v` |

## Lưu ý

- Dữ liệu được lưu trong Docker volumes (`db_data`, `wp_data`) nên không mất khi `docker compose down`.
- Đổi cổng truy cập bằng biến `WORDPRESS_PORT` trong `.env`.
- File `.env` chứa mật khẩu — đã được thêm vào `.gitignore`.
