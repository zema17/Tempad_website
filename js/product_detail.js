document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        document.getElementById("product-detail").innerHTML = "<p>Không tìm thấy sản phẩm!</p>";
        return;
    }

    fetch("php/get_products.php")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (!product) {
                document.getElementById("product-detail").innerHTML = "<p>Sản phẩm không tồn tại!</p>";
                return;
            }

            document.getElementById("product-detail").innerHTML = `
                <div class="product-container">
                    <div class="product-image">
                        <img src="php/${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h2>${product.name}</h2>
                        <p class="price">Giá: ${product.price} USD</p>
                        <p>Còn lại: ${product.stock}</p>
                        <button class="buy-btn" onclick="addToCart(${product.id}, ${product.stock})">🛒 Thêm vào giỏ hàng</button>
                        <p>${product.description.replace(/\n/g, "<br>")}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu: ", error));
});

function addToCart(id, stock) {
    if (stock < 1) {
        alert("❌ Sản phẩm này đã hết hàng!");
        return;
    }

    const quantity = 1; // hoặc cho phép người dùng chọn số lượng

    fetch("php/add_to_cart.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `product_id=${id}&quantity=${quantity}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // thông báo từ server
    })
    .catch(error => {
        console.error("❌ Lỗi khi thêm vào giỏ:", error);
        alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
    });
}
