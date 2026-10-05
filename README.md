# Hướng dẫn đưa trang tổng hợp lên GitHub Pages

Gói này đã được cấu hình sẵn cho hệ thống đánh giá 6 nhóm hiện tại:

- Google Sheet: `1Ga7dLZHSaSkYFB8FDvCfvvZ0QMYe3hwLZo_sjT0Rkys`
- Nút **GỬI ẢNH** và **CHẤM ĐIỂM** đã gắn đúng hai Google Form.
- Trang tự đọc bảng **Tổng hợp**, **Ảnh sản phẩm** và **Dữ liệu chấm** mỗi 5 giây.
- Điểm chấm chéo được tính bằng trung bình tất cả lượt chấm của các nhóm bạn.
- Ba loại điểm có ba màu: tự chấm màu xanh lá, chấm chéo màu cam, giáo viên màu xanh dương.
- Ảnh chỉ hiển thị dạng thu nhỏ; bấm ảnh để xem toàn màn hình.
- Trong màn hình lớn có nút **Xoay trái – Đặt lại – Xoay phải**.
- Laptop hiển thị đủ 6 nhóm theo bố cục 3 × 2; điện thoại hiển thị 2 × 3, không tràn ngang.
- Nếu có nhận xét, thẻ nhóm xuất hiện nút để mở toàn bộ nhận xét.

## Bước 1 — Kiểm tra quyền Google Sheet

1. Mở Google Sheet **Đánh giá chéo sản phẩm 6 nhóm**.
2. Bấm **Chia sẻ**.
3. Tại **Quyền truy cập chung**, chọn:
   - **Bất kỳ ai có đường liên kết**
   - Quyền: **Người xem**
4. Bấm **Xong**.

Học sinh chỉ xem được dữ liệu qua trang tổng hợp, không thể sửa Google Sheet.

## Bước 2 — Tạo kho GitHub

1. Truy cập https://github.com và đăng nhập.
2. Bấm dấu **+** ở góc trên bên phải → **New repository**.
3. Đặt tên, ví dụ: `danh-gia-nhom`.
4. Chọn **Public**.
5. Bấm **Create repository**.

## Bước 3 — Tải tệp index.html lên

1. Giải nén gói đã tải.
2. Trong kho GitHub vừa tạo, bấm **Add file** → **Upload files**.
3. Kéo duy nhất tệp `index.html` vào vùng tải lên.
4. Bấm **Commit changes**.

Lưu ý: `index.html` phải nằm ngay ngoài cùng của kho, không đặt trong thư mục con.

## Bước 4 — Bật GitHub Pages

1. Trong kho GitHub, mở **Settings**.
2. Ở cột bên trái chọn **Pages**.
3. Phần **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
4. Bấm **Save**.
5. Chờ khoảng 1–3 phút rồi tải lại trang **Pages**.

GitHub sẽ cung cấp đường dẫn dạng:

`https://TEN-TAI-KHOAN.github.io/danh-gia-nhom/`

Đây là đường dẫn chính thức để tạo mã QR hoặc gửi cho học sinh. Nó không đi qua ChatGPT và không có cảnh báo Google Apps Script.

## Nếu trang chưa hiện dữ liệu

- Kiểm tra Google Sheet đã để **Bất kỳ ai có đường liên kết – Người xem**.
- Nhấn `Ctrl + F5` để tải lại trang.
- Đợi tối đa 5 giây vì trang cập nhật dữ liệu theo chu kỳ.
- Không đổi tên các trang tính **Tổng hợp**, **Ảnh sản phẩm** và **Dữ liệu chấm**.

## Cập nhật giao diện sau này

Chỉ cần sửa hoặc tải đè tệp `index.html` trong kho GitHub. GitHub Pages thường cập nhật sau 1–3 phút và đường dẫn không thay đổi.
