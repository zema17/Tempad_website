document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn chặn reload trang

        // Lấy giá trị từ form
        let name = document.querySelector('input[type="text"]').value;
        let phone = document.querySelector('input[type="tel"]').value;
        let service = document.querySelector('select').value;

        // Kiểm tra nếu chưa điền đủ thông tin
        if (!name || !phone || service === "--Services--") {
            alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Khởi tạo jsPDF
        const { jsPDF } = window.jspdf;
        let doc = new jsPDF();

        // Thiết kế nội dung PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("🔹 Đơn Hàng Dịch Vụ 🔹", 20, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`👤 Họ Tên: ${name}`, 20, 40);
        doc.text(`📞 Số Điện Thoại: ${phone}`, 20, 50);

        let serviceText = "";
        switch (service) {
            case "1": serviceText = "IOT"; break;
            case "2": serviceText = "WEBSITE"; break;
            case "3": serviceText = "SOFTWARE"; break;
            case "4": serviceText = "HARDWARE"; break;
        }
        doc.text(`📦 Gói Dịch Vụ: ${serviceText}`, 20, 60);

        doc.text("📅 Ngày đặt hàng: " + new Date().toLocaleDateString(), 20, 80);

        // Xuất file PDF và tự động tải xuống
        doc.save(`Don_Hang_${name}.pdf`);
    });
});
