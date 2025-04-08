<?php
session_start();
require 'config.php'; // file kết nối CSDL

// Giả sử người dùng đã đăng nhập và có user_id trong session
$user_id = $_SESSION['user_id'] ?? null;
$product_id = $_POST['product_id'] ?? null;
$quantity = $_POST['quantity'] ?? 1;

if (!$user_id) {
    echo "❌ Vui lòng đăng nhập!";
    exit;
}

if (!$product_id) {
    echo "❌ Thiếu thông tin sản phẩm!";
    exit;
}

// Kiểm tra xem đã có trong giỏ chưa
$stmt = $conn->prepare("SELECT * FROM cart WHERE user_id = ? AND product_id = ?");
$stmt->bind_param("ii", $user_id, $product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Nếu đã có → cập nhật số lượng
    $stmt = $conn->prepare("UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("iii", $quantity, $user_id, $product_id);
    $stmt->execute();
    echo "✅ Đã cập nhật giỏ hàng!";
} else {
    // Nếu chưa có → thêm mới
    $stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $user_id, $product_id, $quantity);
    $stmt->execute();
    echo "✅ Đã thêm vào giỏ hàng!";
}
?>
