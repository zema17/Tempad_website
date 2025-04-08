function saleSelected(selectedProducts, user_id) {
    if (!selectedProducts || selectedProducts.length === 0) {
        alert("Bạn chưa chọn sản phẩm nào để hiển thị!");
        return;
    }

    // ✅ Lưu vào localStorage (dưới dạng chuỗi JSON)
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    localStorage.setItem("userId", user_id);

    console.log("🛒 Danh sách ID sản phẩm đã lưu:");
    selectedProducts.forEach((id, index) => {
        console.log(`${index + 1}. Product ID: ${id}`);
    });

    console.log(`👤 User ID đã lưu: ${user_id}`);

    // ✅ Chuyển trang
    window.open("sale.html", "_blank");

}
