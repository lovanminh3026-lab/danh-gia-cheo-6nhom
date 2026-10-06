# Hướng dẫn cài hệ thống đánh giá 6 nhóm

Phiên bản này có các chức năng:

- Mỗi nhóm chỉ được tự chấm **1 lần** và chấm từng nhóm khác **1 lần**.
- Mỗi nhóm có **mã PIN riêng** để chống giả danh.
- Giáo viên có nút **Cấp lại quyền chấm** nếu cần cho chấm lại.
- Lượt cũ được đánh dấu **Đã thu hồi**, không xóa mất lịch sử.
- Bấm ô **Chấm chéo ⓘ** để xem rõ: “Nhóm X chấm Nhóm Y: 8 điểm”.
- Ô chấm chéo hiển thị tiến độ `0/5` đến `5/5`.
- Nút **TỔNG** chỉ xuất hiện khi nhóm đã có đủ 1 lượt tự chấm, đủ 5 nhóm khác chấm và 1 lượt giáo viên chấm.
- Điểm tự chấm, chấm chéo và giáo viên chấm có ba màu khác nhau.
- Trang vẫn hiển thị đủ 6 nhóm; ảnh thu nhỏ, bấm để xem toàn màn hình và xoay ảnh.
- `index.html` trong gói này đã được gắn sẵn URL Apps Script `/exec` do giáo viên cung cấp.

## Phần A — Cài máy chủ Google Apps Script

### Bước 1: Mở Apps Script

1. Mở dự án Apps Script **Đánh giá chéo 6 nhóm - Tạo tự động**.
2. Ở mục **Tệp**, bấm dấu **+ → Script**.
3. Đặt tên tệp mới là `BaoMatChamDiem`.
4. Mở tệp `Code.gs` trong gói này, sao chép toàn bộ và dán vào tệp mới.
5. Bấm **Lưu**. Không xóa tệp `Mã.gs` cũ.

> Không tải `Code.gs` lên GitHub công khai. GitHub Pages chỉ cần tệp `index.html`.

### Bước 2: Tạo mã PIN

1. Trên thanh chọn hàm, chọn `secureSetupSystem` (không chọn `setupSystem` của bản cũ).
2. Bấm **Chạy** và cho phép quyền truy cập khi Google hỏi.
3. Mở **Nhật ký thực thi** ở cuối màn hình.
4. Ghi lại 6 mã nhóm và mã giáo viên.
5. Phát riêng cho mỗi nhóm đúng một mã; không chiếu tất cả mã lên màn hình.

Mã PIN chỉ được lưu trên máy chủ dưới dạng mã hóa một chiều. Nếu quên mã, chạy hàm `secureRotateAllPins` để tạo bộ mã mới.

### Bước 3: Triển khai ứng dụng web

1. Bấm **Triển khai → Lần triển khai mới**.
2. Chọn loại **Ứng dụng web**.
3. **Thực thi với tư cách:** Tôi.
4. **Ai có quyền truy cập:** Bất kỳ ai.
5. Bấm **Triển khai**.
6. Sao chép URL kết thúc bằng `/exec`.

Mỗi lần sửa `Code.gs`, vào **Triển khai → Quản lý các lần triển khai → Chỉnh sửa → Phiên bản mới → Triển khai**.

### Bước 4: Kiểm tra URL trong trang web

URL đã được điền sẵn. Khi triển khai lại bằng một URL khác, mở `index.html` và tìm dòng:

```js
const API_URL='PASTE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Thay phần trong dấu nháy bằng URL `/exec` vừa sao chép, ví dụ:

```js
const API_URL='https://script.google.com/macros/s/MA_CUA_BAN/exec';
```

## Phần B — Đưa lên GitHub Pages

1. Mở repository GitHub đang sử dụng.
2. Tải đè tệp `index.html` mới vào thư mục ngoài cùng.
3. Bấm **Commit changes**.
4. Chờ khoảng 1–3 phút rồi nhấn `Ctrl + F5` để tải lại trang.

Chỉ tải `index.html` lên GitHub; không tải `Code.gs` và không tải README nếu không cần.

Nếu tạo GitHub Pages lần đầu:

1. Vào **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: **main**, thư mục: **/(root)**.
4. Bấm **Save**.

## Cách sử dụng

### Học sinh chấm điểm

1. Bấm **CHẤM ĐIỂM**.
2. Chọn đúng **Người chấm** và **Nhóm được chấm**.
3. Nhập điểm, nhận xét và mã PIN của nhóm mình.
4. Bấm **GỬI ĐIỂM**.

Nếu cặp này đã chấm rồi, hệ thống từ chối và yêu cầu giáo viên cấp lại quyền.

### Giáo viên cấp lại quyền

1. Bấm **CHẤM ĐIỂM → GV: Cấp lại quyền chấm**.
2. Chọn người chấm và nhóm được chấm.
3. Nhập mã quản trị giáo viên.
4. Bấm **CẤP LẠI QUYỀN**.

Hệ thống đánh dấu lượt cũ là **Đã thu hồi**. Người chấm được gửi lại đúng một lần.

### Xem từng nhóm đã chấm bao nhiêu

Bấm trực tiếp vào ô màu cam **Chấm chéo ⓘ** trên thẻ nhóm. Trang sẽ liệt kê từng lượt, ví dụ:

`Nhóm 2 chấm Nhóm 5: 8,00 điểm`

## Chống giả danh và spam

- Đổi tên nhóm trên giao diện không đủ để gửi điểm; mã PIN phải đúng.
- Máy chủ kiểm tra trùng trong lúc khóa dữ liệu, nên bấm liên tục cũng không tạo nhiều lượt.
- Không đặt mã PIN trong `index.html`, Google Form hoặc Google Sheet công khai.
- Nếu nghi ngờ một nhóm làm lộ mã: mở `Code.gs`, sửa tên nhóm trong hàm `secureRotateOneGroupPin`, chạy hàm và phát mã mới cho nhóm đó.
- Trang **Nhật ký quyền** ghi lại mọi lần giáo viên cấp lại quyền.

Lưu ý thực tế: không có hệ thống nào ngăn được hoàn toàn việc học sinh tự đưa mã PIN cho nhóm khác. Biện pháp phù hợp trong lớp học là phát mã riêng, yêu cầu không chia sẻ, và đổi ngay mã của nhóm khi nghi ngờ bị lộ.

## Dữ liệu cần giữ nguyên

- Google Sheet ID hiện tại: `1Ga7dLZHSaSkYFB8FDvCfvvZ0QMYe3hwLZo_sjT0Rkys`
- Không đổi tên các trang tính **Tổng hợp**, **Ảnh sản phẩm**, **Dữ liệu chấm** và **Nhật ký quyền**.
- Trang tính **Dữ liệu chấm** sử dụng cột A:G: Thời gian, Người chấm, Nhóm được chấm, Loại điểm, Điểm, Nhận xét, Trạng thái.
- Google Sheet vẫn cần đặt quyền **Bất kỳ ai có đường liên kết – Người xem** để trang tổng hợp đọc dữ liệu.
