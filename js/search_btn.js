document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector(".search-btn");
    const searchBox = document.querySelector(".search-box");

    searchBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        searchBox.style.display = "block";
        searchBtn.style.display = "none"; // Ẩn nút khi mở thanh tìm kiếm
    });

    document.addEventListener("click", function (event) {
        if (!searchBox.contains(event.target)) {
            searchBox.style.display = "none";
            searchBtn.style.display = "block"; // Hiện lại nút khi đóng tìm kiếm
        }
    });

    searchBox.addEventListener("click", function (event) {
        event.stopPropagation(); // Giữ thanh tìm kiếm mở khi click vào trong
    });
});
