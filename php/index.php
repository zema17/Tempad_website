<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Chủ</title>
</head>
<body>
    <h2>Chào mừng, <?php echo $_SESSION["username"]; ?>!</h2>
    <a href="logout.php">Đăng xuất</a>
</body>
</html>
