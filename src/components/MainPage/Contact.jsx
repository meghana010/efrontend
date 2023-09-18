import React from "react"
import "./contact.css"


const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Share your queries/thoughts..</h2>
      <br />
      <form className="contact-form" method="POST">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name.." required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email.." required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Write something.." style={{ height: '200px' }} required></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Contact;
