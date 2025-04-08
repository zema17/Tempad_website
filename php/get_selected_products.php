<?php
header('Content-Type: application/json');

// Gọi file kết nối database
require_once 'config.php';  // Mason đã có sẵn rồi

// Nhận mảng product_id từ phía client
$data = json_decode(file_get_contents("php://input"), true);
$product_ids = $data['product_ids'] ?? [];

if (empty($product_ids)) {
    echo json_encode(["status" => "error", "message" => "Không có product_id nào được gửi."]);
    exit();
}

// Chuyển mảng thành chuỗi ID để truy vấn
$ids_str = implode(',', array_map('intval', $product_ids));

$sql = "SELECT id AS product_id, name AS product_name, price AS product_price 
        FROM products 
        WHERE id IN ($ids_str)";

$result = mysqli_query($conn, $sql);

$products = [];
$total_price = 0;

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
        $total_price += $row['product_price'];
    }

    echo json_encode([
        "status" => "success",
        "products" => $products,
        "total_price" => $total_price
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Không tìm thấy sản phẩm."]);
}

mysqli_close($conn);
?>
