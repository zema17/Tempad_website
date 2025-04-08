const button = document.getElementById("draggable");

let offsetX = 0, offsetY = 0, isDragging = false;

button.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - button.offsetLeft;
    offsetY = e.clientY - button.offsetTop;
    button.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    button.style.left = `${e.clientX - offsetX}px`;
    button.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    button.style.cursor = "grab";
});
