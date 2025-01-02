import React from "react";

const About = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6 text-center md:text-left">
        <h2 className="text-3xl font-bold text-primary">About Us</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Welcome to our platform! We’re a dedicated team of BCA students,
          passionate about making the process of finding the perfect room easier
          and more affordable for everyone. Whether you’re a student, a working
          professional, or someone looking for a temporary place to stay, we’re
          here to simplify your search.
        </p>

        <div className="mt-8 flex flex-col items-center md:flex-row md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-primary">Our Story</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              When I began my college life in Mandsaur, I faced the same
              challenges many students and professionals encounter – the
              struggle to find a room that fit my requirements. Along with my
              friends, we spent days looking for a place that was not only
              affordable but also comfortable enough to study and live in.
              Realizing that this was a common problem, we decided to create a
              solution – a website where users can easily find rooms that meet
              their specific needs.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-primary">Our Mission</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our mission is simple: to provide accessible, affordable, and
              comfortable living spaces for everyone. Whether you’re looking for
              a study-friendly environment or a place to call home temporarily,
              we aim to make the room-finding process as easy and stress-free as
              possible.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center md:flex-row md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-primary">Key Features</h3>
            <ul className="mt-2 text-sm text-muted-foreground">
              <li>Room Previews: See the room before you make a decision.</li>
              <li>
                Room Listings: Room owners can easily list their properties and
                update the details.
              </li>
              <li>
                Location Access: Get details about the exact location of the
                room for easy navigation.
              </li>
              <li>
                Admin Control: Admins have the ability to ensure all listings
                are accurate and up-to-date, maintaining a trustworthy
                environment for all users.
              </li>
              <li>
                Future Updates: We are working on new features such as room
                comparisons, advanced search filters, and more!
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-primary">Our Journey</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This project is the result of my lifelong interest in technology
              and computers. Growing up, I’ve always been fascinated by the tech
              field, which led me to pursue a Bachelor of Computer Applications
              (BCA). The journey to build this website has been a challenging
              yet rewarding experience. I turned to YouTube for tutorials, and
              my college teacher has been instrumental in guiding me through the
              necessary programming languages to bring this project to life.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center md:flex-row md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-primary">
              Looking Ahead
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              While the platform is functional and growing, I am committed to
              adding more features and improving the user experience. In the
              future, I hope to incorporate social responsibility aspects, such
              as promoting affordable housing and creating a network that
              supports students in finding accommodation that fits their needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
