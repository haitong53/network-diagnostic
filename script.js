// script.js
function parseIPConfig() {
  const input = document.getElementById("ipconfigResult").value;
  const output = document.getElementById("parsedOutput");
  const dnsOutput = document.getElementById("dnsResult");
  const gatewayOutput = document.getElementById("gatewayResult");

  let result = {};
  let dnsServers = [];
  let gateway = "Không tìm thấy";

  // Phân tích cho Windows (ipconfig)
  if (input.includes("IPv4")) {
    const ipLine = input.match(/IPv4 Address[\. ]+: ([\d\.]+)/i);
    const subnetLine = input.match(/Subnet Mask[\. ]+: ([\d\.]+)/i);
    const gatewayLine = input.match(/Default Gateway[\. ]+: ([\d\.]+)/i);
    const dnsLine = input.match(/DNS Servers[\. ]+: ([\d\.\s]+)/i);

    result.ipv4 = ipLine ? ipLine[1] : "Không tìm thấy";
    result.subnet = subnetLine ? subnetLine[1] : "Không tìm thấy";
    gateway = gatewayLine ? gatewayLine[1] : "Không tìm thấy";
    dnsServers = dnsLine ? dnsLine[1].trim().split(/\s+/) : ["Không tìm thấy"];
  }

  // Phân tích cho Linux/Mac (ifconfig)
  else if (input.includes("inet ")) {
    const ipLine = input.match(/inet ([\d\.]+)/);
    const subnetLine = input.match(/netmask ([\d\.a-fx]+)/i);
    result.ipv4 = ipLine ? ipLine[1] : "Không tìm thấy";
    result.subnet = subnetLine ? subnetLine[1] : "Không tìm thấy";
  }

  // Hiển thị kết quả
  output.textContent = `
IPv4: ${result.ipv4}
Subnet Mask: ${result.subnet}
`;

  dnsOutput.textContent = dnsServers.join("\n");

  gatewayOutput.textContent = gateway;
}

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
