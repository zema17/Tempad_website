document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById("category");
    const brandGroup = document.getElementById("brand-group");
    const brandSelect = document.getElementById("brand");

    categorySelect.addEventListener("change", function () {
        const category = categorySelect.value;
        
        // Xóa danh sách cũ
        brandSelect.innerHTML = "";

        // Danh sách các hãng theo danh mục
        const brands = {
            "Smartphone": ["Apple", "Samsung", "Xiaomi"],
            "Laptop": ["Apple", "Dell", "Asus", "HP", "Lenovo"],
            "Accessories": ["Mouse", "Screen", "Gamepad", "Speaker", "Headphone"],
            "Computer": ["CPU", "Mainboard", "Case", "Ram", "VGA", "SDD", "PSU"]
        };

        if (brands[category]) {
            brandGroup.style.display = "block";
            brands[category].forEach(brand => {
                const option = document.createElement("option");
                option.value = brand;
                option.textContent = brand;
                brandSelect.appendChild(option);
            });
        } else {
            brandGroup.style.display = "none";
        }
    });
});
