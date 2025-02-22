import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background py-8 border-t border-muted mt-16">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold text-primary">Room On Rent</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Find your perfect room at affordable prices. Your comfort is our
              priority. Explore listings and make your search easy.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/rooms"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Rooms
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center items-center gap-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            By using our website, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Room On Rent. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
