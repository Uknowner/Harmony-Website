export function render() {
    const html = `
<div class="cards">
  <div id="gallery-loading" class="gallery-loading">
    <div class="gallery-skeleton"></div>
    <div class="gallery-skeleton"></div>
    <div class="gallery-skeleton"></div>
  </div>
  <div class="lightbox" id="lightbox">
    <img id="lightboxImg" src="" alt="">
  </div>
  <div class="gallery"></div>
</div>
`;
 
    return html;
}

export function init() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    fetch("../data/gallery.json")
        .then(res => res.json())
        .then(data => {
            const gallery = document.querySelector(".gallery");

            Object.entries(data).forEach(([category, images]) => {
                let card = document.createElement("div");
                card.classList.add("card");
                
                let formattedCategory = category
                    .replaceAll("-", " ")
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                
                let header = document.createElement("h2");
                header.textContent = formattedCategory;
                card.appendChild(header);
                
                let imageGrid = document.createElement("div");
                imageGrid.classList.add("image-grid");
                card.appendChild(imageGrid);      

                images.forEach(image => {
                    let img = document.createElement("img");
                    img.src = `../assets/images/${category}/${image.src}`;
                    img.alt = image.alt;

                    img.addEventListener("click", () => {
                        lightbox.classList.add("active");
                        lightboxImg.src = img.src;
                    });

                    imageGrid.appendChild(img);
                });

                gallery.appendChild(card);
            });

            // Hide loading after gallery is built
            const galleryLoading = document.getElementById("gallery-loading");
            if (galleryLoading) galleryLoading.style.display = "none";
        })
        .catch(err => {
    console.error('Failed to load gallery:', err);
    const galleryLoading = document.getElementById("gallery-loading");
    if (galleryLoading) {
        galleryLoading.innerHTML = "<p>Failed to load gallery.</p>";
    }
});

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightboxImg.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}