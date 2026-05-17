import { getGallery } from "../api.js";
import { titleCase, registerEventListener, scrollToTarget, Skeletons } from "../utils.js";

export function render() {
    return `
    <div class="cards">
        <div class="lightbox" id="lightbox">
            <button id="lightbox-close" class="close-btn">✕</button>
            <img id="lightboxImg" alt="">
        </div>
        <div id="skeleton-container"></div>
        <div class="gallery"></div>
    </div>`;
}

export async function init(scrollTarget) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const gallery = document.querySelector(".gallery");
    const skeletonContainer = document.getElementById("skeleton-container");

    if (!lightbox || !lightboxImg || !gallery || !skeletonContainer) return;

    // Lightbox controls
    registerEventListener(document.getElementById("lightbox-close"), "click", (e) => {
    e.stopPropagation();
    lightbox.classList.remove("active");
    document.body.classList.remove("no-scroll");
});

    registerEventListener(lightbox, "click", () => {
    lightbox.classList.remove("active");
    document.body.classList.remove("no-scroll");
});
    
    registerEventListener(lightboxImg, "click", (e) => e.stopPropagation());

    registerEventListener(document, "keydown", (e) => {
    if (e.key === "Escape") {
        lightbox.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
});

    // Create skeletons
    const skeletons = new Skeletons();

    const skeletonWrapper = document.createElement("div");
    skeletonWrapper.className = "skeleton-wrapper";

    for (let i = 0; i < 3; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const headerSkeleton = document.createElement("div");
        headerSkeleton.className = "skeleton";
        headerSkeleton.style.height = "28px";
        headerSkeleton.style.width = "160px";
        headerSkeleton.style.marginBottom = "12px";
        card.appendChild(headerSkeleton);

        const grid = document.createElement("div");
        grid.classList.add("image-grid");
        grid.style.gap = "8px";

        for (let j = 0; j < 6; j++) {
            const imgSkeleton = document.createElement("div");
            imgSkeleton.className = "skeleton";
            imgSkeleton.style.height = "200px";
            imgSkeleton.style.width = "100%";
            grid.appendChild(imgSkeleton);
        }

        card.appendChild(grid);
        skeletonWrapper.appendChild(card);
    }

    skeletonContainer.appendChild(skeletonWrapper);
    skeletons.wrapper = skeletonWrapper;

    // Load gallery
    try {
        const data = await getGallery();

        Object.entries(data).forEach(([category, images]) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = category;

            const header = document.createElement("h2");
            header.textContent = titleCase(category);
            card.appendChild(header);

            const imageGrid = document.createElement("div");
            imageGrid.classList.add("image-grid");

            images.forEach(image => {
                const ext = image.src.split(".").pop().toLowerCase();

                if (ext === "mp4") {
                    const video = document.createElement("video");
                    video.src = `assets/images/${category}/${image.src}`;
                    video.alt = image.alt;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    registerEventListener(video, "mouseenter", () => video.play());
                    registerEventListener(video, "mouseleave", () => video.pause());
                    
                    registerEventListener(video, "click", () => video.play());
                    registerEventListener(video, "click", () => video.pause());

                    imageGrid.appendChild(video);
                } else {
                    const img = document.createElement("img");
                    img.src = `assets/images/${category}/${image.src}`;
                    img.alt = image.alt;
                    img.loading = "eager";

                    registerEventListener(img, "click", () => {
                        document.body.classList.add("no-scroll");
                        lightbox.classList.add("active");
                        lightboxImg.src = img.src;
                    });

                    imageGrid.appendChild(img);
                }
            });

            card.appendChild(imageGrid);
            gallery.appendChild(card);
        });

        if (scrollTarget) scrollToTarget(scrollTarget);

    } catch (err) {
        console.error("Failed to load gallery:", err);
        skeletonContainer.innerHTML = "<p>Failed to load gallery.</p>";
    } finally {
        skeletons.remove();
    }
}