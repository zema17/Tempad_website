function deleteSelected(selectedProductIds, user_id) {
    // Gửi request xóa tất cả sản phẩm đã chọn
    fetch('php/delete_from_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_ids: selectedProductIds, user_id })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);  // Hiển thị phản hồi
        location.reload();  // Tải lại giỏ hàng
    })
    .catch(error => {
        console.error('Lỗi khi xóa sản phẩm:', error);
    });
}
