<?php
$host = "localhost";
$user = "root";
$pass = "123456";
$db = "user_db";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error){
    die("Ket noi that bai: " . $conn->connect_error);
}
?>