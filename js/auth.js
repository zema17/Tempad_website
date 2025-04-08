document.addEventListener("DOMContentLoaded", function () {
    let loginBtn = document.getElementById("loginButton");

    fetch("php/get_user.php")
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                loginBtn.innerHTML = `👤 ${data.username}`;
                loginBtn.href = "profile.html"; 
            }
        })
        .catch(error => console.error("Lỗi:", error));
});
