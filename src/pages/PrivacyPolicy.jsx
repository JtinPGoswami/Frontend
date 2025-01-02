import React from "react";
const PrivacyPolicy = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6 text-center md:text-left">
        <h2 className="text-3xl font-bold text-primary">Privacy Policy</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We value your privacy and are committed to protecting your personal
          information. Please read the following to understand how we collect,
          use, and safeguard your data.
        </p>

        <div className="mt-8 space-y-8">
          {/* Introduction */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">
              Introduction
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This privacy policy explains how we collect, use, and protect your
              information when you use our website and services. By using our
              platform, you agree to the terms outlined in this policy.
            </p>
          </div>

          {/* Data Collection */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">
              Data We Collect
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We may collect the following types of data:
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
              <li>Personal information (name, email, contact details)</li>
              <li>Usage data (IP address, browser type, device information)</li>
              <li>
                Feedback and communication data (messages, queries, feedback)
              </li>
            </ul>
          </div>

          {/* Use of Data */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">
              How We Use Your Data
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The data we collect may be used for the following purposes:
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
              <li>To provide and improve our services</li>
              <li>To communicate with you regarding inquiries and updates</li>
              <li>To process transactions and maintain your account</li>
              <li>To ensure the security and integrity of our website</li>
            </ul>
          </div>

          {/* User Rights */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">Your Rights</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You have the following rights regarding your personal data:
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
              <li>The right to access and request a copy of your data</li>
              <li>
                The right to correct any inaccurate or incomplete information
              </li>
              <li>The right to request the deletion of your personal data</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
          </div>

          {/* Data Security */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">
              Data Security
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration, or destruction.
              However, no method of data transmission is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">
              Changes to This Policy
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with the revised date. We encourage
              you to review this policy periodically to stay informed about how
              we are protecting your information.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-primary">Contact Us</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              If you have any questions or concerns about our privacy practices,
              please contact us at:
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:support@example.com"
                className="text-primary hover:underline"
              >
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
