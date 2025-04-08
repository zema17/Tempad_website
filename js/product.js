document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();

    document.querySelectorAll(".category, .brand").forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const category = this.getAttribute("data-category");
            const brand = this.getAttribute("data-brand") || null;
            fetchProducts(category, brand);
        });
    });
});

function fetchProducts(category = null, brand = null) {
    fetch("php/get_products.php")
        .then(response => response.json())
        .then(products => {
            let filteredProducts = products;

            if (category) {
                filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
            }
            if (brand) {
                filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
            }

            displayProducts(filteredProducts);
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu: ", error));
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = "<p>Không có sản phẩm nào.</p>";
        return;
    }

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-item">
                <img src="php/${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">Giá: ${product.price} USD</p>
                    <p>Còn lại: ${product.stock}</p>
                    <div class="actions">
                        <a href="product_detail.html?id=${product.id}" class="detail-btn">📌 Xem chi tiết</a>
                        <button class="buy-btn" onclick="addToCart(${product.id}, ${product.stock})">🛒 Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        `;
    });
}

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

