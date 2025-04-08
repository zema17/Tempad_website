document.addEventListener("DOMContentLoaded", function() {
    // Lấy thông tin user
    fetch("php/get_user.php")
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                document.getElementById("username").innerText = data.username;
                document.getElementById("email").innerText = data.email;
                document.getElementById("user_id").innerText = `ID người dùng: ${data.user_id}`;
                // Lưu user_id để sử dụng cho các hành động khác
            }
        })
        .catch(error => console.error("Lỗi:", error));

    // Gắn sự kiện đăng xuất
    document.getElementById("logoutBtn").addEventListener("click", function() {
        fetch("php/logout.php")
            .then(() => {
                localStorage.removeItem("loggedIn");
                window.location.href = "index.html";
            });
    });

    // Lấy sản phẩm trong giỏ hàng
    fetch("php/get_cart_products.php")
        .then(res => res.json())
        .then(products => displayCartProducts(products))
        .catch(err => console.error("Lỗi khi tải giỏ hàng:", err));
});
