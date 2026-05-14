export function render() {
    const html = `
    <div class="cards">
    <section class="card">
      <h2>Email Harmony</h2>
      <form id="contact-form" class="contact-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Your full name" required>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="your@email.com" required>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="What's this about?">
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Your message..." required></textarea>
        </div>

        <button type="submit" class="btn">Send Message</button>
      </form>
    </section>
    
    <section class="card">
      <h1>Contact TKC Properties</h1>
      <p>Use the link below to directly contact TKC Properties using the contact page on their website</p>
     
      <a href="https://www.tkcgroup.co.za/contact.html" target="_blank" class="btn">Visit Official Contact Page</a>
    </section>
  </div>`;
  
  return html;
}