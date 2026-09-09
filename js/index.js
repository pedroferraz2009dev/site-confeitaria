let indice = 0;
const images = ["img/bolo1.png", "img/bolo2.png", "img/bolo3.png"];

function changeImage() {
    const img = document.getElementById("img");

    if (!img) {
        return;
    }

    img.src = images[indice];
    indice = (indice + 1) % images.length;
}

setInterval(changeImage, 3000);
