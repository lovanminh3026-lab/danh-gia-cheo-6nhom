const CONFIG = {
  sheetId: "1Ga7dLZHSaSkYFB8FDvCfvvZ0QMYe3hwLZo_sjT0Rkys",
  scoreForm: "https://docs.google.com/forms/d/e/1FAIpQLSdvhBTpejhyo-6QhkT2l3fZZeRBSaXDwzwSJ7yZVPZUa6p6lw/viewform?embedded=true",
  photoForm: "https://docs.google.com/forms/d/e/1FAIpQLSfCxfr6o_anyQH-GuJynQB8LQO9zdh2cB06GUTB7u2U6tr-xg/viewform?embedded=true",
  refreshMs: 10000
};

const fallbackGroups = [
  ["Nhóm 1", "Video – Đồng Bích"],
  ["Nhóm 2", "PowerPoint – Hải Nam"],
  ["Nhóm 3", "PowerPoint – Bảo An"],
  ["Nhóm 4", "Infographic – Văn Hậu"],
  ["Nhóm 5", "Infographic – Nhật Dân"],
  ["Nhóm 6", "Infographic – Kim Huệ"]
];

let scoreRows = fallbackGroups.map(([group, product]) => [group, product, "", "", "", ""]);
let photoRows = Array(6).fill("");

function text(value) {
  return value === null || value === undefined || value === "" ? "—" : String(value);
}

function directImage(url) {
  const value = String(url || "");
  const match = value.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1600` : value;
}

function render() {
  const grid = document.getElementById("groupGrid");
  grid.textContent = "";
  scoreRows.slice(0, 6).forEach((row, index) => {
    const card = document.createElement("article");
    card.className = "card";

    const photoBox = document.createElement("div");
    photoBox.className = "photo-box";
    const imageUrl = directImage(photoRows[index]);
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = `Sản phẩm ${row[0]}`;
      img.loading = "lazy";
      img.addEventListener("click", () => openImage(imageUrl));
      img.addEventListener("error", () => {
        photoBox.textContent = "ẢNH CHƯA ĐƯỢC CẤP QUYỀN XEM";
      }, { once: true });
      photoBox.appendChild(img);
    } else {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "CHƯA GỬI ẢNH";
      photoBox.appendChild(empty);
    }

    const info = document.createElement("div");
    info.className = "info";
    const nameRow = document.createElement("div");
    nameRow.className = "name-row";
    const name = document.createElement("h2");
    name.textContent = row[0] || fallbackGroups[index][0];
    const total = document.createElement("span");
    total.className = "total";
    total.textContent = text(row[5]);
    nameRow.append(name, total);

    const product = document.createElement("div");
    product.className = "product";
    product.textContent = row[1] || fallbackGroups[index][1];

    const scores = document.createElement("div");
    scores.className = "scores";
    [["Tự chấm", row[2]], ["Chấm chéo", row[3]], ["Giáo viên", row[4]]].forEach(([label, value]) => {
      const box = document.createElement("div");
      box.className = "score-box";
      box.textContent = label;
      const strong = document.createElement("b");
      strong.textContent = text(value);
      box.appendChild(strong);
      scores.appendChild(box);
    });

    info.append(nameRow, product, scores);
    card.append(photoBox, info);
    grid.appendChild(card);
  });
}

function rowsFromGoogle(response) {
  return (response.table.rows || []).map(row => (row.c || []).map(cell => cell ? (cell.f ?? cell.v ?? "") : ""));
}

window.handleSummary = response => {
  const rows = rowsFromGoogle(response);
  if (rows.length) scoreRows = rows;
  render();
  setStatus("Đã cập nhật", "ok");
};

window.handlePhotos = response => {
  const rows = rowsFromGoogle(response);
  photoRows = rows.map(row => row[0] || "");
  render();
};

function loadJsonp(sheet, range, callback) {
  const old = document.querySelector(`script[data-callback="${callback}"]`);
  if (old) old.remove();
  const script = document.createElement("script");
  script.dataset.callback = callback;
  script.onerror = () => setStatus("Chưa đọc được bảng dữ liệu", "error");
  const query = new URLSearchParams({ tqx: `responseHandler:${callback}`, sheet, range, _: Date.now() });
  script.src = `https://docs.google.com/spreadsheets/d/${CONFIG.sheetId}/gviz/tq?${query}`;
  document.body.appendChild(script);
}

function refreshData() {
  setStatus("Đang cập nhật…", "");
  loadJsonp("Tổng hợp", "A5:F10", "handleSummary");
  loadJsonp("Ảnh sản phẩm", "D2:D7", "handlePhotos");
}

function setStatus(message, state) {
  const el = document.getElementById("syncStatus");
  el.textContent = message;
  el.className = `sync ${state}`;
}

function openForm(type) {
  const modal = document.getElementById("formModal");
  document.getElementById("formTitle").textContent = type === "photo" ? "Gửi ảnh sản phẩm" : "Chấm điểm sản phẩm";
  document.getElementById("formFrame").src = type === "photo" ? CONFIG.photoForm : CONFIG.scoreForm;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeForm() {
  const modal = document.getElementById("formModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("formFrame").src = "about:blank";
  document.body.style.overflow = "";
  refreshData();
}

function openImage(src) {
  document.getElementById("fullImage").src = src;
  document.getElementById("imageModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeImage() {
  document.getElementById("imageModal").classList.remove("open");
  document.getElementById("fullImage").src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-form]").forEach(button => button.addEventListener("click", () => openForm(button.dataset.form)));
document.querySelector("[data-close]").addEventListener("click", closeForm);
document.querySelector("[data-close-image]").addEventListener("click", closeImage);
document.getElementById("formModal").addEventListener("click", event => { if (event.target.id === "formModal") closeForm(); });
document.getElementById("imageModal").addEventListener("click", event => { if (event.target.id === "imageModal") closeImage(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") { closeForm(); closeImage(); } });

render();
refreshData();
setInterval(refreshData, CONFIG.refreshMs);
