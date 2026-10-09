# Hệ thống đánh giá sản phẩm nhóm đa phòng v2.3

Một website dùng chung cho nhiều giáo viên và nhiều lớp cùng lúc. Giáo viên không phải sao chép mã nguồn hay tạo ứng dụng mới.

## Điểm mới

- Mỗi giáo viên có tài khoản riêng bằng email và PIN 6 số.
- Quản trị viên cấp một mã mời 6 số để đồng nghiệp tự đăng ký.
- Mỗi tiết học tạo một mã phòng 6 ký tự và một QR riêng.
- Mỗi phòng có 2–12 nhóm; học sinh chọn nhóm rồi chờ giáo viên duyệt thiết bị, không dùng PIN nhóm.
- Ảnh, liên kết, điểm và nhận xét đều được gắn mã phòng nên không lẫn giữa các giáo viên.
- Mỗi nhóm chỉ được tự chấm một lần và chấm mỗi nhóm khác một lần.
- Giáo viên chấm một lần cho mỗi nhóm và có thể cấp lại quyền chấm.
- Giáo viên có thể khóa/mở phòng. Phòng đã khóa vẫn xem được báo cáo nhưng không nhận dữ liệu mới.
- Ảnh được tự nén trên điện thoại trước khi gửi; PDF, PowerPoint và video dùng liên kết.
- Báo cáo hiển thị tối đa 6 nhóm mỗi trang, ảnh phóng toàn màn hình và có nút xoay.
- Mã phòng hiển thị lớn ngay cạnh QR để học sinh có thể quét hoặc nhập tay.
- Học sinh chọn nhóm, gửi yêu cầu và chờ giáo viên duyệt; sau đó không phải chọn lại nhóm gửi/nhóm chấm.
- Thanh đầu phòng của học sinh chỉ còn hai nút Nộp sản phẩm/Chấm điểm và trạng thái ngắn gọn của nhóm.
- Nộp sản phẩm và gửi điểm đều có bước xác nhận bằng hai nút Xác nhận/Bỏ.
- Giáo viên có thể duyệt, từ chối hoặc thu hồi thiết bị của từng nhóm.
- Mã mời và mã quản trị giữ nguyên cho đến khi quản trị viên chủ động đổi trong giao diện.

## Các tệp

- `Code.gs`: máy chủ Apps Script. Không đưa tệp này lên GitHub công khai.
- `index.html`: giao diện đưa lên GitHub Pages.
- `README.md`: hướng dẫn này.

## A. Tạo máy chủ trung tâm – chỉ làm một lần

### Bước 1: Tạo dự án Apps Script mới

1. Mở `https://script.google.com` bằng tài khoản Google sẽ lưu dữ liệu.
2. Bấm **Dự án mới**.
3. Đổi tên dự án thành `ĐÁNH GIÁ NHÓM ĐA PHÒNG`.
4. Bấm tệp **`Code.gs`** đang có sẵn và xóa mã mẫu.
5. Mở tệp **`Code.gs` trong gói này**, sao chép toàn bộ rồi dán vào **`Code.gs` của dự án mới**.
6. Bấm **Lưu**.

**Không dán vào `Mã.gs` hoặc `BaoMatChamDiem.gs` của ứng dụng cũ.** Bản cũ được giữ nguyên để dự phòng.

### Bước 2: Khởi tạo hệ thống

1. Trên danh sách hàm, chọn `setupMultiRoomSystem`.
2. Bấm **Chạy** và cấp quyền Google Sheet/Drive.
3. Mở **Nhật ký thực thi**.
4. Ghi lại:
   - `GOOGLE SHEET TRUNG TÂM` – bấm liên kết để mở Sheet được tạo tự động;
   - `MÃ MỜI GIÁO VIÊN` – gửi cho đồng nghiệp được phép đăng ký;
   - `MÃ QUẢN TRỊ HỆ THỐNG` – chỉ chủ hệ thống giữ.

Hàm tự tạo Google Sheet `DỮ LIỆU ĐÁNH GIÁ NHÓM ĐA PHÒNG`, bảy trang tính **GV, Phòng học, Nhóm, Thiết bị, Sản phẩm, Điểm, Nhật ký** và một thư mục Drive `DANH_GIA_NHOM_DA_PHONG`.

Nếu cần hủy mã mời cũ, chạy `rotateTeacherInviteCode` và ghi lại mã mới trong Nhật ký thực thi.

### Bước 3: Triển khai Apps Script

1. Chọn **Triển khai → Lần triển khai mới**.
2. Loại: **Ứng dụng web**.
3. Thực thi với tư cách: **Tôi**.
4. Ai có quyền truy cập: **Bất kỳ ai**.
5. Bấm **Triển khai** và sao chép URL kết thúc bằng `/exec`.

Khi sửa `Code.gs`, chọn **Triển khai → Quản lý các lần triển khai → Chỉnh sửa → Phiên bản mới → Triển khai**.

## B. Cấu hình và đăng website

1. Mở `index.html` bằng trình soạn thảo.
2. Tìm dòng:

```js
const API_URL='PASTE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

3. Thay bằng URL `/exec`, ví dụ:

```js
const API_URL='https://script.google.com/macros/s/MA_TRIEN_KHAI/exec';
```

4. Tạo một repository GitHub mới, ví dụ `danh-gia-nhom-da-phong`.
5. Tải `index.html` lên thư mục gốc và commit.
6. Vào **Settings → Pages**:
   - Source: **Deploy from a branch**;
   - Branch: **main**;
   - Folder: **/(root)**.
7. Chờ 1–3 phút rồi mở đường dẫn GitHub Pages.

Chỉ cần một repository, một website, một Apps Script và một Sheet cho toàn hệ thống.

## C. Cách dùng dành cho giáo viên

### Đăng ký lần đầu

1. Mở website chung.
2. Chọn **GIÁO VIÊN → ĐĂNG KÝ**.
3. Nhập họ tên, email, tự tạo PIN giáo viên 6 số.
4. Nhập mã mời do quản trị viên cung cấp.
5. Sau khi đăng ký, hệ thống mở trang phòng học của giáo viên.

PIN giáo viên không được lưu dưới dạng văn bản; máy chủ chỉ lưu mã băm SHA-256.

### Tạo một buổi đánh giá

1. Bấm **+ TẠO PHÒNG**.
2. Nhập tên hoạt động, lớp và số nhóm.
3. Chọn tỉ lệ điểm; tổng phải bằng 100%.
4. Có thể nhập tên nhóm, mỗi dòng một tên.
5. Bấm **TẠO PHÒNG VÀ SINH MÃ**.
6. Chiếu QR hoặc đọc mã phòng cho học sinh.
7. Mở **DUYỆT THIẾT BỊ** và duyệt đúng một thiết bị cho mỗi nhóm.

Mỗi buổi học nên tạo một phòng mới. Không cần xóa dữ liệu của tiết trước.

### Quản lý trong giờ học

- **GV CHẤM**: nhập điểm giáo viên cho từng nhóm.
- **DUYỆT THIẾT BỊ**: duyệt, từ chối hoặc thu hồi thiết bị của nhóm.
- **CẤP LẠI LƯỢT**: thu hồi lượt chấm cũ để nhóm/GV được chấm lại một lần.
- **KHÓA PHÒNG**: dừng nhận sản phẩm và điểm.
- **MỞ PHÒNG**: cho phép tiếp tục gửi.
- **QR & LINK**: mở lại mã QR dành cho học sinh.

## D. Cách dùng dành cho học sinh

1. Quét QR hoặc nhập mã phòng 6 ký tự.
2. Chọn nhóm, xác nhận và bấm **XIN VÀO NHÓM**.
3. Chờ giáo viên duyệt thiết bị.
4. Bấm **NỘP SẢN PHẨM**:
   - tải ảnh đại diện và/hoặc dán liên kết;
   - bấm gửi và xác nhận.
5. Bấm **CHẤM ĐIỂM**:
   - chọn nhóm được chấm;
   - nhập điểm, nhận xét;
   - bấm gửi và xác nhận.

Học sinh không cần tạo tài khoản. Mã phòng xác định buổi học; thiết bị được giáo viên duyệt xác định nhóm.

## Cập nhật trực tiếp từ v2.1

1. Dán đè `Code.gs` v2.3 vào **`Code.gs` của dự án Apps Script đa phòng mới**; không dán vào dự án cũ có `Mã.gs`/`BaoMatChamDiem.gs`.
2. Chạy lại `setupMultiRoomSystem` đúng một lần để tạo trang **Thiết bị**. Dữ liệu cũ không bị xóa; mã mời và mã quản trị không tự đổi.
3. Tạo phiên bản triển khai mới trong cùng lần triển khai Apps Script để giữ nguyên URL `/exec`.
4. Tải đè `index.html` lên repository GitHub đang dùng và commit.

## E. Dữ liệu và thư mục ảnh

Mọi dữ liệu có cấu trúc:

`Mã giáo viên → Mã phòng → Mã nhóm`

Ảnh được lưu trong Drive:

`DANH_GIA_NHOM_DA_PHONG / Mã giáo viên / Mã phòng`

Video, PDF và PowerPoint nặng không tải trực tiếp lên hệ thống; học sinh dán liên kết Drive/Slides/YouTube đã bật quyền xem.

## F. Lưu ý bảo mật và vận hành

- Không đăng `Code.gs` lên GitHub công khai.
- Không gửi mã quản trị hệ thống cho giáo viên hoặc học sinh.
- Chỉ phát mã mời giáo viên cho người được phép sử dụng; đổi mã khi bị lộ.
- Chỉ duyệt thiết bị khi nhóm trên màn hình học sinh khớp với nhóm thực tế; nếu đổi máy, thu hồi thiết bị cũ trước.
- Dữ liệu và ảnh nằm trong tài khoản Google của người triển khai máy chủ trung tâm.
- Sao lưu Google Sheet định kỳ bằng **Tệp → Tạo bản sao**.
- Apps Script có hạn mức theo tài khoản. Bản này phù hợp thí điểm trong trường; nếu triển khai quy mô lớn nhiều trường, nên chuyển phần máy chủ sang Firebase/Cloud Run.
- Một ảnh sau nén tối đa 2 MB. Ảnh gốc trên điện thoại tối đa 15 MB.
- Nếu chính sách Google Workspace không cho chia sẻ tệp bằng liên kết, ảnh có thể lưu lên Drive nhưng không hiện công khai; khi đó cần quản trị viên miền điều chỉnh chính sách hoặc dùng kho ảnh khác.

## G. Kiểm tra trước khi sử dụng thật

1. Đăng ký hai tài khoản giáo viên khác nhau.
2. Mỗi giáo viên tạo một phòng.
3. Mở hai phòng trên hai thiết bị hoặc hai cửa sổ ẩn danh.
4. Nộp sản phẩm và điểm cho Nhóm 1 ở cả hai phòng.
5. Xác nhận dữ liệu không xuất hiện lẫn nhau.
6. Thử chấm cùng một cặp hai lần để kiểm tra chống trùng.
7. Khóa phòng và thử gửi lại để kiểm tra máy chủ từ chối.

## H. Những chức năng có thể bổ sung ở bản sau

- Quản trị viên xem danh sách toàn bộ giáo viên/phòng.
- Xuất báo cáo Excel/PDF theo từng phòng.
- Đổi PIN giáo viên khi quên.
- Sao chép cấu hình một phòng cũ để dùng cho lớp mới.
- Hẹn giờ tự khóa phòng.
- Chuyển quyền sở hữu phòng cho giáo viên khác.
