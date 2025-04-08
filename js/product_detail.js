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

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
}
