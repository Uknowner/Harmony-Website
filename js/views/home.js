import { getGallery } from "../api.js";
import { Skeletons } from "../utils.js"
    
export function render() {
    const html = `        
        <div class="cards" id="container">
            <div class="card">
                <h2>Your Home Away From Home</h2>
                <p>Experience comfort, community, and convenience designed for students. Whether you're moving out for the first time or looking for a better place to stay, Harmony Private Home is built around your needs.</p>
                <p>We provide a safe, sanitized environment maintained year-round, so you can focus on your studies without worrying about your living situation. Our dedicated team is always on hand to ensure everything runs smoothly.</p>
                <p>More than just a place to sleep — it's a community. Meet fellow students, share spaces, and feel at home from day one.</p>
            </div>

            <div class="card">
                <div class="card-text-media">
                    <div class="card-content-container">
                        <h2>Rooms & Pricing</h2>
                        <p>We offer comfortable single and shared rooms, each furnished with new furniture upon moving in and maintained year-round by our dedicated maintenance team.</p>
                    </div>
                    <div class="card-image-container">
                        <img src="assets/images/single-rooms/room1.webp" alt="">
                    </div>
                </div>
                <a href="#rooms" class="btn">Read more</a>
            </div>

            <div class="card">
                <h2>Facilities</h2>
                <p><strong>Study Areas:</strong> Quiet, spacious areas for focused study outside your room.</p>
                <p><strong>Laundry Services:</strong> Washing machines and dryers in each building — no need to hang clothes.</p>
                <p><strong>Security:</strong> 24/7 security patrols and monitoring for peace of mind.</p>
                <p><strong>Gym:</strong> On-site gym to help students stay fit and healthy.</p>
                
                <a href="#facilities" class="btn">Read more</a>
            </div>

            <div class="card">
                <h2>Gallery</h2>
                <div class="gallery"></div>
            </div>

            <div class="card">
                <h2>What Our Students Say</h2>
                <p>We value the feedback from our tenants as they help us build a better environment for the next. See our reviews and what students had to say about Harmony.</p>
                <blockquote>
                    "Harmony Private Home gave me the perfect balance of study and social life."
                    <cite>— Thabo, 2nd Year Engineering</cite>
                </blockquote>
                <blockquote>
                    "Affordable, safe, and close to campus. Highly recommend!"
                    <cite>— Lerato, 3rd Year Law</cite>
                </blockquote>
                
                <a href="#testimonials" class="btn">Read more</a>
            </div>

            <div class="card">
                <h2>Find Us</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.472574614503!2d28.20146999999999!3d-25.754949899999986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956221ea9c0e29%3A0xe31c30d0688e6e30!2sHarmoniehof%20Private%20Home!5e0!3m2!1sen!2sza!4v1775727772368!5m2!1sen!2sza"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Google Maps location of Harmony Private Home">
                </iframe>
                <p>Physical Address: 127 Steve Biko St, Sunnyside, Pretoria, 0007</p>
                <div class="important">
                    <strong>Note:</strong> The map view reflects 2024 imagery and may not show recent updates. For the latest visuals, please see the <a id="inline-anchor" href="#gallery?scroll=building">building and entrance<a/> photos in our gallery.
                </div>
            </div>

            <div class="card">
                <h2>Visit Our:</h2>
                <div class="contact-buttons">
                    <a href="https://www.tiktok.com/@tkcpropertiesstudent" target="_blank" rel="noopener noreferrer" aria-label="Visit TKC Properties Student Res on TikTok" class="btn contact-btn">TikTok Page</a>
                    <a href="https://www.instagram.com/p/DVhILmOCDpq/" target="_blank" rel="noopener noreferrer" aria-label="Visit TKC Properties on Instagram" class="btn contact-btn">Instagram Page</a>
                    <a href="https://www.facebook.com/TKCProperties/" target="_blank" rel="noopener noreferrer" aria-label="Visit TKC Properties on Facebook" class="btn contact-btn">Facebook Page</a>
                    <a href="#contact" class="btn contact-btn">Contact Page</a>
                </div>
            </div>

            <div class="card special-card">
                <h2>Apply</h2>
                <p>Spaces are limited — secure your room today!</p>
                <a href="#apply" class="btn">Application Process</a>
            </div>
        </div>
        
        <script async src="https://www.tiktok.com/embed.js"><\/script>
    `;
    
    return html;
}

export async function init() {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;

    const skeletons = new Skeletons();
    skeletons.create(gallery, 3, {
        height: "200px",
        width: "100%",
        gap: "12px",
        gridTemplateColumns: "repeat(3, 1fr)"
    });

    try {
        const data = await getGallery();
        const isEmpty =
            !data ||
            Object.keys(data).length === 0 ||
            Object.values(data).every(arr => !Array.isArray(arr) || arr.length === 0);

        if (isEmpty) {
            gallery.innerHTML = `
                <div class="gallery-empty">
                    <p>Our gallery is currently empty.</p>
                    <p>Come back later to see updates from us.</p>
                </div>`;
            return;
        }

        const previews = [
            { src: "assets/images/gym/wide-view1.webp", alt: "Wide view of gym and its equipments" },
            { src: "assets/images/single-rooms/room2.webp", alt: "Single room with clean bed and tiny desk near the window" },
            { src: "assets/images/other/braii_area.webp", alt: "Open space with braai stands" }
        ];

        previews.forEach(({ src, alt }) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = alt;
            img.loading = "lazy";
            gallery.appendChild(img);
        });

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("gallery-btn-container");

        const btn = document.createElement("a");
        btn.href = "#gallery";
        btn.classList.add("btn");
        btn.textContent = "Open Gallery";

        btnContainer.appendChild(btn);
        gallery.appendChild(btnContainer);

    } catch (err) {
        gallery.innerHTML = `<div class="gallery-empty"><p>Gallery could not be loaded.</p><p>${err.message}</p></div>`;
    } finally {
        skeletons.remove();
    }
}