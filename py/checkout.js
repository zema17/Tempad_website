document.getElementById("confirm-btn").addEventListener("click", function () {
    const products = JSON.parse(localStorage.getItem("selectedProductsData")); // chứa name, price, quantity
    const userId = localStorage.getItem("userId");

    fetch("http://localhost:5000/generate-invoice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ products: products, userId: userId })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "hoa_don.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(err => {
        console.error("Lỗi:", err);
        alert("Không thể tạo hóa đơn.");
    });
});
