document.addEventListener("DOMContentLoaded", function () {
    let loginBtn = document.getElementById("loginButton");
    
    if (!loginBtn) {
        console.error("Không tìm thấy phần tử có ID 'loginButton'");
        return; // Thoát sớm nếu không tìm thấy phần tử
    }

    fetch("php/get_user.php")
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                loginBtn.innerHTML = `👤 ${data.username}`;
                loginBtn.href = "profile.html"; // Chuyển đến trang profile thay vì logout
            }
        })
        .catch(error => console.error("Lỗi:", error));
});
