document.addEventListener("DOMContentLoaded", function () {
    const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
    const userId = localStorage.getItem("userId");

    if (!selectedProducts || selectedProducts.length === 0 || !userId) {
        console.warn("⚠️ Không có sản phẩm hoặc userId được lưu.");
        return;
    }

    const productIds = selectedProducts.map(item =>
        typeof item === 'object' ? item.product_id : item
    );

    fetch("php/get_selected_products.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_ids: productIds })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            const listEl = document.getElementById("product-list");
            const totalEl = document.getElementById("total-price");
            listEl.innerHTML = "";

            const quantities = {};
            let total = 0;

            data.products.forEach(product => {
                const { product_id, product_name, product_price } = product;
                quantities[product_id] = 1;
                total += parseFloat(product_price);

                const li = document.createElement("li");
                li.innerHTML = `
                    <span>📦 ${product_name} - 💸 <span class="price">${product_price}</span> $</span><br>
                    <button class="decrease">➖</button>
                    <span class="qty" data-id="${product_id}">1</span>
                    <button class="increase">➕</button>
                `;

                listEl.appendChild(li);
            });

            totalEl.textContent = `💰 Tổng tiền: ${total} $`;

            listEl.addEventListener("click", function (e) {
                const btn = e.target;
                const parentLi = btn.closest("li");
                if (!parentLi) return;

                const qtySpan = parentLi.querySelector(".qty");
                const price = parseFloat(parentLi.querySelector(".price").textContent);
                const id = qtySpan.dataset.id;

                if (btn.classList.contains("increase")) {
                    quantities[id]++;
                } else if (btn.classList.contains("decrease") && quantities[id] > 1) {
                    quantities[id]--;
                }

                qtySpan.textContent = quantities[id];

                // Tính lại tổng tiền
                let newTotal = 0;
                data.products.forEach(p => {
                    newTotal += quantities[p.product_id] * parseFloat(p.product_price);
                });
                totalEl.textContent = `💰 Tổng tiền: ${newTotal} VNĐ`;
            });

        } else {
            alert("Lỗi khi lấy thông tin sản phẩm từ server.");
            console.warn("Phản hồi từ server:", data);
        }
    })
    .catch(error => {
        console.error("❌ Lỗi kết nối đến máy chủ:", error);
    });
});
