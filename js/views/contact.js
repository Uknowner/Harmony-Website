import { sendEmail, registerEventListener } from "../utils.js";

export function render() {
    return `
    <div class="cards">
        <section class="card">
            <h2>Email Harmony</h2>

            <form id="contact-form" class="contact-form">

                <input type="text" id="name" placeholder="Full name" required>
                <input type="email" id="email" placeholder="Email address" required>
                <input type="text" id="subject" placeholder="Subject">

                <textarea id="body" rows="5" placeholder="Message" required></textarea>

                <button type="submit" class="btn">
                    Send Message
                </button>

            </form>
        </section>
    </div>
    `;
}

export function init() {
    const form = document.getElementById("contact-form");

    if (!form) return;
    
    registerEventListener(form, "submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const body = document.getElementById("body").value;

        sendEmail(name, email, subject, body);
    });
}