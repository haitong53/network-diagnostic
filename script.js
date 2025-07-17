// script.js

function openTab(evt, tabName) {
  // Ẩn tất cả tab content
  const tabs = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
    tabs[i].style.display = "none";
  }

  // Bỏ active tất cả tab link
  const links = document.getElementsByClassName("tab-link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
  }

  // Hiển thị tab được chọn
  document.getElementById(tabName).classList.add("active");
  document.getElementById(tabName).style.display = "block";

  // Thêm active cho tab link
  evt.currentTarget.classList.add("active");
}

// Hàm lấy thông tin IP từ ipapi.co
function fetchIPInfo() {
  const resultDiv = document.getElementById("ip-result");
  resultDiv.textContent = "Đang tải thông tin...";

  fetch("https://ipapi.co/json/ ")
    .then(response => response.json())
    .then(data => {
      const output = `
IP: ${data.ip}
Quốc gia: ${data.country_name}
Thành phố: ${data.city}
Vĩ độ: ${data.latitude}
Kinh độ: ${data.longitude}
ISP: ${data.org}
Khu vực: ${data.region}
Múi giờ: ${data.timezone}
ZIP Code: ${data.postal}
`;
      resultDiv.textContent = output;
    })
    .catch(error => {
      console.error("Lỗi khi lấy thông tin IP:", error);
      resultDiv.textContent = "Không thể lấy thông tin IP.\nVui lòng kiểm tra kết nối Internet.";
    });
}

// Gọi hàm tự động khi load tab
window.addEventListener("load", () => {
  // Chỉ gọi nếu tab IP đang active
  const ipTab = document.getElementById("ip-info");
  if (ipTab && ipTab.classList.contains("active")) {
    fetchIPInfo();
  }
});
