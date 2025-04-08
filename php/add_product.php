<?php
include 'config.php';

// Lấy dữ liệu từ form
$name = mysqli_real_escape_string($conn, $_POST['name']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$price = mysqli_real_escape_string($conn, $_POST['price']);
$category = mysqli_real_escape_string($conn, $_POST['category']);
$brand = isset($_POST['brand']) ? mysqli_real_escape_string($conn, $_POST['brand']) : '';
$image_url = "";
$stock = mysqli_real_escape_string($conn, $_POST['stock']);

// Xử lý upload ảnh
if (!empty($_FILES['image']['name'])) {
    $target_dir = "uploads/";  // Thư mục lưu ảnh
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    
    // Kiểm tra và di chuyển file vào thư mục
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $image_url = "uploads/" . basename($_FILES["image"]["name"]); // Lưu đường dẫn ảnh
    }
}

// Kiểm tra nếu có trường brand hay không
if (!empty($brand)) {
    $sql = "INSERT INTO products (name, description, price, category, brand, image) 
            VALUES ('$name', '$description', '$price', '$category', '$brand', '$image_url')";
} else {
    $sql = "INSERT INTO products (name, description, price, category, image) 
            VALUES ('$name', '$description', '$price', '$category', '$image_url')";
}

// Thực thi truy vấn
if ($conn->query($sql) === TRUE) {
    echo "✅ Thêm sản phẩm thành công!";
    header("Location: ../index.html"); 
} else {
    echo "❌ Lỗi: " . $conn->error;
}

$conn->close();
?>
