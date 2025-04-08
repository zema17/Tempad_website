<?php
session_start();
header('Content-Type: application/json');

$response = [
    "username" => null,
    "email" => null,
    "user_id" => null  // Thêm trường user_id vào mảng phản hồi
];

if (isset($_SESSION["username"])) {
    $response["username"] = $_SESSION["username"];

    // Kết nối CSDL từ file config
    require_once 'config.php'; // 👉 file này nên có $conn

    // Truy vấn email và id (ở đây là user_id) theo username
    $stmt = $conn->prepare("SELECT id, email FROM users WHERE username = ?");
    $stmt->bind_param("s", $_SESSION["username"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $response["email"] = $row["email"];
        $response["user_id"] = $row["id"];  // Lấy id từ cơ sở dữ liệu và gán vào user_id
    }

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
?>
