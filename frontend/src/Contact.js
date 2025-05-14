
import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">Have a question or need assistance? Get in touch with us using the form below.</p>
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5" placeholder="Type your message here..." required></textarea>

        <button type="submit" className="btn">Send Message</button>
      </form>
    </section>
  );
}
