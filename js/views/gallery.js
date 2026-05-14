import { getGallery } from "../api.js";
import { titleCase, registerEventListener, createSkeletons } from "../utils.js";

export function render() {
    return `
    <div class="cards">
        <div class="lightbox" id="lightbox">
            <button id="lightbox-close" class="close-btn">✕</button>
            <img id="lightboxImg" alt="">
        </div>
        <div class="gallery"></div>
    </div>`;
}

export async function init() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const gallery = document.querySelector(".gallery");
    
    const skeletons = createSkeletons(gallery, 6, {
        height: "250px",
        gap: "20px",
        gridTemplateColumns: "repeat(3, 1fr)"
    });

    if (!lightbox || !lightboxImg || !gallery) return;

    // Lightbox controls
    registerEventListener(document.getElementById("lightbox-close"), "click", (e) => {
        e.stopPropagation();
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", () => lightbox.classList.remove("active"));
    lightboxImg.addEventListener("click", (e) => e.stopPropagation());

    registerEventListener(document, "keydown", (e) => {
        if (e.key === "Escape") lightbox.classList.remove("active");
    });

    // Load gallery
    try {
        const data = await getGallery();

        Object.entries(data).forEach(([category, images]) => {
            const card = document.createElement("div");
            card.classList.add("card");
            
            const header = document.createElement("h2");
            header.textContent = titleCase(category);
            card.appendChild(header);

            const imageGrid = document.createElement("div");
            imageGrid.classList.add("image-grid");

            images.forEach(image => {
                const img = document.createElement("img");
                img.src = `assets/images/${category}/${image.src}`;
                img.alt = image.alt;
                img.loading = "lazy";

                registerEventListener(img, "click", () => {
                    lightbox.classList.add("active");
                    lightboxImg.src = img.src;
                });

                imageGrid.appendChild(img);
            });

            card.appendChild(imageGrid);
            gallery.appendChild(card);
        });
        
        skeletons.remove();
        
        const galleryLoading = document.getElementById("gallery-loading");
        if (galleryLoading) galleryLoading.remove();

    } catch (err) {
        console.error("Failed to load gallery:", err);
        const galleryLoading = document.getElementById("gallery-loading");
        if (galleryLoading) galleryLoading.innerHTML = "<p>Failed to load gallery.</p>";
    }
}