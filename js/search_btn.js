document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector(".search-btn");
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("search-results");

    let allProducts = [];

    // Lấy danh sách sản phẩm từ PHP
    fetch("php/get_products.php")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
        });

    searchBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        searchBox.style.display = "block";
        searchBtn.style.display = "none";
    });

    document.addEventListener("click", function (event) {
        if (!searchBox.contains(event.target)) {
            searchBox.style.display = "none";
            searchBtn.style.display = "block";
            searchResults.innerHTML = "";
        }
    });

    searchBox.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";
    
        if (query.trim() === "") return;
    
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(query)
        );
    
        filtered.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p.name;
    
            // 👉 Gắn sự kiện click để chuyển hướng tới trang chi tiết
            li.addEventListener("click", () => {
                window.location.href = `product_detail.html?id=${p.id}`;
            });
    
            searchResults.appendChild(li);
        });
    });
    
});
