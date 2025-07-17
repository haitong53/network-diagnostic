// script.js
function parseIPConfig() {
  const input = document.getElementById("ipconfigResult").value;
  const resultDiv = document.getElementById("result");

  if (input.includes("IPv4")) {
    resultDiv.innerHTML = `
      <h3>Kết quả phân tích:</h3>
      <ul>
        <li>✅ Có địa chỉ IPv4</li>
        ${input.includes("Default Gateway") ? "<li>✅ Có cổng mặc định</li>" : "<li>❌ Thiếu cổng mặc định</li>"}
        ${input.includes("DHCP Enabled") ? "<li>✅ DHCP đang bật</li>" : "<li>⚠️ DHCP tắt</li>"}
      </ul>
      <p>Nếu bạn vẫn không vào được mạng, hãy thử đặt DNS thủ công.</p>
    `;
  } else {
    resultDiv.innerHTML = `<p>❌ Không tìm thấy thông tin mạng hợp lệ. Hãy chắc chắn bạn đã dán đúng kết quả từ ipconfig.</p>`;
  }
}
