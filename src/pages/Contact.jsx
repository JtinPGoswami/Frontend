import React, { useState } from "react";
import { Link, UNSAFE_useScrollRestoration } from "react-router-dom";
const Contact = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const mailtoLink = `mailto:${
    import.meta.env.VITE_WEBSITE_EMAIL
  }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "subject" ? setSubject(value) : setBody(value);
  };

  return (
    <section className="bg-background md:py-16 py-8">
      <div className="container md:w-3/5 w-[85%] mx-auto px-6 text-center md:text-left">
        <h2 className="lg:text-3xl md:text-xl text-lg font-bold text-primary">
          Contact Us
        </h2>
        <p className="mt-4 md:text-lg text-base text-muted-foreground">
          We’d love to hear from you! Whether you have a question, need support,
          or have feedback to share, feel free to reach out to us. We are here
          to assist you with any inquiries you may have!
        </p>

        <div className="mt-8 flex justify-center">
          <form className="w-full max-w-lg space-y-6">
            {/* subject */}
            <div className="flex flex-col">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-muted-foreground"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-400 rounded-lg text-base text-primary focus:ring-2 focus:ring-primary bg-background"
                placeholder="Enter subject"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-muted-foreground"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={body}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-400 rounded-lg text-base text-primary focus:ring-2 bg-background focus:ring-primary resize-none"
                rows="6"
                placeholder="Tell us what's on your mind"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Link
                to={mailtoLink}
                className="mt-4 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary"
              >
                Send Message
              </Link>
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-12">
          <h3 className="md:text-2xl text-xl font-semibold text-primary">
            Other Ways to Reach Us
          </h3>
          <ul className="mt-4 md:text-lg text-base text-muted-foreground space-y-4">
            <li className="flex items-center gap-2">
              <span className="material-icons text-primary">phone</span>
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-icons text-primary">email</span>
              <span>contact@roomrental.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-icons text-primary">location_on</span>
              <span>123 Main Street, Mandsaur</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
