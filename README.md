# Hướng dẫn hệ thống đánh giá sản phẩm 2–12 nhóm

Phiên bản này có các chức năng:

- Mỗi nhóm chỉ được tự chấm **1 lần** và chấm từng nhóm khác **1 lần**.
- Mỗi nhóm có **mã PIN riêng** để chống giả danh.
- Giáo viên có nút **Cấp lại quyền chấm** nếu cần cho chấm lại.
- Lượt cũ được đánh dấu **Đã thu hồi**, không xóa mất lịch sử.
- Bấm ô **Chấm chéo ⓘ** để xem rõ: “Nhóm X chấm Nhóm Y: 8 điểm”.
- Ô chấm chéo hiển thị số lượt thực tế, ví dụ `Chấm chéo 2 lượt`.
- **TỔNG TẠM TÍNH** xuất hiện khi có điểm tự chấm, điểm giáo viên và ít nhất 1 lượt chấm chéo; điểm tự cập nhật khi có thêm lượt chấm.
- Điểm tự chấm, chấm chéo và giáo viên chấm có ba màu khác nhau.
- Có thể chọn từ **2 đến 12 nhóm**. Tối đa 6 nhóm trên mỗi trang; trên 6 nhóm hệ thống tự phân trang.
- Hỗ trợ ảnh đại diện kèm liên kết PDF, PowerPoint, video hoặc liên kết khác. Liên kết Drive được tự chuyển sang chế độ `/preview` để xem trực tiếp.
- `index.html` trong gói này đã được gắn sẵn URL Apps Script `/exec` do giáo viên cung cấp.
- Nút **⚙ QUẢN LÝ** cho phép đổi tên đội/sản phẩm và đặt lại dữ liệu thử nghiệm bằng mã giáo viên.
- Ảnh được ghép theo tên nhóm trong từng dòng, không còn phụ thuộc thứ tự nhóm gửi.
- Mã nhóm gồm **3 chữ số**; mã giáo viên gồm **4 chữ số**.

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

Mã PIN chỉ được lưu trên máy chủ dưới dạng mã hóa một chiều. Nếu đang dùng bộ mã dài của bản cũ hoặc quên mã, chạy hàm `secureRotateAllPins` để tạo bộ mã mới gồm 3 số cho nhóm và 4 số cho giáo viên.

### Bước 3: Triển khai ứng dụng web

1. Bấm **Triển khai → Lần triển khai mới**.
2. Chọn loại **Ứng dụng web**.
3. **Thực thi với tư cách:** Tôi.
4. **Ai có quyền truy cập:** Bất kỳ ai.
5. Bấm **Triển khai**.
6. Sao chép URL kết thúc bằng `/exec`.

Mỗi lần sửa `Code.gs`, vào **Triển khai → Quản lý các lần triển khai → Chỉnh sửa → Phiên bản mới → Triển khai**.

Nếu trang báo `Apps Script chưa được triển khai đúng` hoặc trước đây hiện `Unexpected token '<'`, kiểm tra lại đúng hai lựa chọn: **Thực thi với tư cách: Tôi** và **Ai có quyền truy cập: Bất kỳ ai**; sau đó bắt buộc chọn **Phiên bản mới** rồi triển khai.

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

### Đổi tên đội/sản phẩm khi dùng cho lớp khác

1. Bấm **⚙ QUẢN LÝ**.
2. Chọn số nhóm từ **2 đến 12**.
3. Nhập tên đội/sản phẩm cho từng nhóm.
4. Nhập mã giáo viên.
5. Bấm **LƯU SỐ NHÓM VÀ TÊN ĐỘI**.

Nếu tăng thêm nhóm, trang sẽ báo các mã PIN 3 số mới. Giáo viên cần ghi lại và phát riêng cho đúng nhóm. Nếu có trên 6 nhóm, dùng nút chuyển trang ở phía dưới màn hình.

### Cấu hình biểu mẫu gửi sản phẩm

#### Cách tự động bằng Apps Script (khuyên dùng)

1. Sau khi dán `Code.gs` mới, bấm **Lưu**.
2. Trên danh sách hàm, chọn `secureUpgradeProductForm`.
3. Bấm **Chạy** và cấp thêm quyền chỉnh sửa Google Forms khi được hỏi.
4. Mở lại đường link biểu mẫu dành cho học sinh.

Hàm sẽ tự tìm Google Form **NỘP ẢNH SẢN PHẨM NHÓM** trong Drive, đổi thành **NỘP SẢN PHẨM NHÓM**, đổi câu hỏi ảnh thành **Ảnh đại diện** và tự thêm **Loại sản phẩm**, **Liên kết sản phẩm**, **Ghi chú**. Có thể chạy lại mà không tạo câu hỏi trùng.

Nếu lần chạy cũ từng dừng ở lỗi `asListItem is not a function`, hãy dán đè `Code.gs` bản mới rồi chạy lại đúng hàm `secureUpgradeProductForm`. Hàm mới tự xử lý câu **Loại sản phẩm** đã được tạo dở; không cần xóa Form và không làm mất ảnh đã nộp.

Sau đó chạy tiếp `secureInstallPhotoSync` một lần để đồng bộ dữ liệu và trình kích hoạt.

#### Cách thủ công nếu không tìm thấy Form

Trong Google Form đang mở từ nút **GỬI SẢN PHẨM**, giữ hai câu hỏi hiện có và bổ sung các câu hỏi sau. Tên câu hỏi nên viết đúng để hệ thống tự nhận cột:

1. **Nhóm nộp sản phẩm** — danh sách Nhóm 1, Nhóm 2… theo số nhóm đang sử dụng.
2. **Loại sản phẩm** — các lựa chọn: Ảnh, PDF, PowerPoint, Video, Liên kết khác.
3. **Ảnh đại diện** — tải một ảnh nhẹ hoặc ảnh chụp màn hình sản phẩm.
4. **Liên kết sản phẩm** — câu trả lời ngắn; học sinh dán liên kết Drive, Google Slides, YouTube…
5. **Ghi chú** — không bắt buộc.

Không yêu cầu học sinh tải video hoặc PowerPoint nặng trong giờ học. Các em chỉ gửi ảnh đại diện và dán liên kết đã chuẩn bị. Khi bấm **XEM SẢN PHẨM**, trang tự mở chế độ xem trước; không bắt tải tệp xuống.

Tệp trên Google Drive phải có quyền **Bất kỳ ai có đường liên kết – Người xem**. Apps Script sẽ cố gắng tự cấp quyền này với các tệp thuộc Drive của chủ biểu mẫu.

Sau khi sửa biểu mẫu hoặc thay `Code.gs`, chọn hàm `secureInstallPhotoSync`, bấm **Chạy** một lần để đồng bộ lại sản phẩm và trình kích hoạt.

### Đặt lại buổi chấm

1. Bấm **⚙ QUẢN LÝ**.
2. Chọn dữ liệu cần đặt lại:
   - Xóa toàn bộ điểm và nhận xét.
   - Xóa liên kết ảnh đang hiển thị.
   - Xóa tên đội/sản phẩm nếu muốn dùng lại cho lớp hoàn toàn mới.
3. Nhập mã giáo viên và bấm **ĐẶT LẠI BUỔI CHẤM**.
4. Xác nhận lần cuối.

Thao tác đặt lại chỉ xóa liên kết ảnh khỏi bảng hiển thị; tệp ảnh gốc trong Google Drive không bị xóa.

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
- Trang phản hồi sản phẩm phải có tên **Câu trả lời biểu mẫu 2**. Mã tự tìm cột theo tên câu hỏi, vì vậy có thể dùng dữ liệu ảnh cũ và các cột mới nêu trên.
- Sau khi dán `Code.gs`, chạy `secureInstallPhotoSync()` một lần để sửa dữ liệu cũ, cấp quyền xem và bật tự động đồng bộ cho các lần nộp sau.
- Trang tính **Dữ liệu chấm** sử dụng cột A:G: Thời gian, Người chấm, Nhóm được chấm, Loại điểm, Điểm, Nhận xét, Trạng thái.
- Google Sheet vẫn cần đặt quyền **Bất kỳ ai có đường liên kết – Người xem** để trang tổng hợp đọc dữ liệu.
