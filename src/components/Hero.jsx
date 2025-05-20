import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-background w-full">
      <div className="container mx-auto flex flex-col-reverse lg:items-center lg:justify-between gap-8 px-6 lg:py-16 lg:flex-row lg:gap-12 w-full">
        {/* Text Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-bold text-primary lg:text-5xl">
            Welcome to Room On Rent
          </h1>
          <p className="mt-4 text-lg text-muted-foreground lg:mt-6">
            Discover your perfect space from our wide selection of affordable
            and comfortable rooms. Begin your journey with us today!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              to={"/rooms"}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-opacity-90"
            >
              Explore Rooms
            </Link>
            <Link
              to={"/contact"}
              className="rounded-lg border border-primary px-6 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-auto">
          <img
            src="img_8.jpg"
            alt="Room On Rent Hero"
            className="rounded-lg shadow-lg opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
