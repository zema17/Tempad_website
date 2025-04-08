<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Gọi file config để sử dụng biến $conn
require_once 'config.php';

// Kiểm tra kết nối
if (!$conn) {
    die(json_encode(["error" => "Không thể kết nối database"]));
}

// Truy vấn dữ liệu từ bảng 'products'
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Trả về dữ liệu dạng JSON
echo json_encode($products);
$conn->close();
?>