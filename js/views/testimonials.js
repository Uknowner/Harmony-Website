export function render() {
    const html = `
    <div class="cards">
        <div id="testimonials-loading" class="testimonials-loading">Loading Testimonials...</div>
        <div class="testimonials-container"></div>
    </div>
    `;
 
    return html;
}

export function init() {
    fetch("data/testimonials.json")
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector(".testimonials-container");

            data.forEach(testimonial => {
                let card = document.createElement("div");
                card.classList.add("card");

                let blockquote = document.createElement("blockquote");
                
                let quote = document.createElement("p");
                quote.textContent = `"${testimonial.quote}"`;
                blockquote.appendChild(quote);

                let cite = document.createElement("cite");
                cite.textContent = `— ${testimonial.name}`;
                blockquote.appendChild(cite);

                if (testimonial.detail) {
                    let detail = document.createElement("p");
                    detail.textContent = testimonial.detail;
                    detail.style.fontSize = "0.85rem";
                    detail.style.color = "var(--text-faint)";
                    detail.style.marginTop = "0.25rem";
                    blockquote.appendChild(detail);
                }

                card.appendChild(blockquote);
                container.appendChild(card);
            });

            const loading = document.getElementById("testimonials-loading");
            if (loading) loading.style.display = "none";
        })
        .catch(err => {
            console.error('Failed to load testimonials:', err);
            const loading = document.getElementById("testimonials-loading");
            if (loading) loading.textContent = "Failed to load testimonials.";
        });
}