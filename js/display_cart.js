function displayCartProducts(products) {
    const container = document.getElementById("cart-products");
    if (!products.length) {
        container.innerHTML = "<p>Giỏ hàng trống.</p>";
        return;
    }

    container.innerHTML = products.map(p => `
        <div class="product-item">
            <img src="php/${p.image}" alt="${p.name}" style="width: 100px;">
            <div class="product-info">
                <h4>${p.name}</h4>
                <p>Mã sản phẩm: ${p.product_id}</p>
                <p>Giá: ${p.price} USD</p>
                <p>Số lượng: ${p.quantity}</p>
            </div>
            <button 
                class="chooseBtn" 
                data-product-id="${p.product_id}"
                data-product-name="${p.name}"
                data-product-price="${p.price}"
                data-user-id="${user_id}">
                Chọn sản phẩm
            </button>
        </div>
    `).join("");
    attachChooseButtonEvents(user_id);
}
function attachChooseButtonEvents(user_id) {
    document.querySelectorAll(".chooseBtn").forEach(button => {
        button.addEventListener("click", function (event) {
            toggleSelection(event,user_id);
        });
    });
}
// Mảng để lưu các product_id đã chọn
let selectedProducts = [];

function toggleSelection(event) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = button.getAttribute('data-product-price');

    // Lấy user_id từ get_user.php
    fetch("php/get_user.php")
        .then(response => response.json())
        .then(data => {
            const user_id = data.user_id;

            if (button.classList.contains('selected')) {
                // Bỏ chọn sản phẩm
                button.textContent = 'Chọn sản phẩm';
                button.classList.remove('selected');
                
                // Xóa productId khỏi mảng selectedProducts
                selectedProducts = selectedProducts.filter(id => id !== productId);
            } else {
                // Chọn sản phẩm
                button.textContent = 'Đã chọn';
                button.classList.add('selected');
                
                // Thêm productId vào mảng selectedProducts
                selectedProducts.push(productId);
            }

            // Cập nhật sự kiện cho nút xóa để xóa tất cả sản phẩm đã chọn
            const deleteButton = document.getElementById('delete-btn');
            deleteButton.onclick = function() {
                deleteSelected(selectedProducts, user_id); // Gửi danh sách sản phẩm đã chọn
            };
        })
        .catch(error => {
            console.error("Lỗi khi lấy user_id:", error);
        });
}




