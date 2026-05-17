import { getTestimonials } from "../api.js";
import { Skeletons } from "../utils.js";

export function render() {
    return `
    <div class="cards">
        <div class="testimonials-container"></div>
    </div>`;
}

export async function init() {
    const container = document.querySelector(".testimonials-container");
    
    const skeletons = new Skeletons();
    skeletons.create(container, 6, {
        height: "130px",
        width: "100%",
        gap: "12px",
        gridTemplateColumns: "1fr"
    });

    try {
        const data = await getTestimonials();

        data.forEach(testimonial => {
            const card = document.createElement("div");
            card.classList.add("card");

            const blockquote = document.createElement("blockquote");

            const quote = document.createElement("p");
            quote.textContent = `"${testimonial.quote}"`;
            blockquote.appendChild(quote);

            const cite = document.createElement("cite");
            cite.textContent = `— ${testimonial.name}`;
            blockquote.appendChild(cite);

            if (testimonial.detail) {
                const detail = document.createElement("p");
                detail.textContent = testimonial.detail;
                detail.style.fontSize = "0.85rem";
                detail.style.color = "var(--text-faint)";
                detail.style.marginTop = "0.25rem";
                blockquote.appendChild(detail);
            }

            card.appendChild(blockquote);
            container.appendChild(card);
        });

    } catch (err) {
        console.error("Failed to load testimonials:", err);
        container.textContent = "Failed to load testimonials.";
    } finally {
        skeletons.remove();
    }
}