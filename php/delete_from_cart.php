<?php
include 'config.php'; // Giả sử bạn đã có file config.php kết nối cơ sở dữ liệu

// Lấy dữ liệu từ request
$data = json_decode(file_get_contents('php://input'), true);
$product_ids = $data['product_ids']; // Danh sách product_id
$user_id = $data['user_id'];

// Kiểm tra dữ liệu hợp lệ
if (empty($product_ids) || empty($user_id)) {
    echo "Thiếu thông tin sản phẩm hoặc người dùng.";
    exit;
}

// Tạo câu lệnh SQL để xóa nhiều sản phẩm
$sql = "DELETE FROM cart WHERE product_id IN (" . implode(',', array_fill(0, count($product_ids), '?')) . ") AND user_id = ?";

// Chuẩn bị câu lệnh
$stmt = $conn->prepare($sql);

// Liên kết các tham số và thực thi câu lệnh
$params = array_merge($product_ids, [$user_id]);
$stmt->bind_param(str_repeat('i', count($product_ids)) . 'i', ...$params); // Lặp qua các sản phẩm và người dùng

if ($stmt->execute()) {
    echo "Các sản phẩm đã được xóa khỏi giỏ hàng.";
} else {
    echo "Có lỗi xảy ra khi xóa sản phẩm.";
}

// Đóng kết nối
$stmt->close();
$conn->close();
?>
