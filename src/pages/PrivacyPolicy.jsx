import React from "react";
import Layout from "../components/Layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-neutral-950 text-neutral-200 px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-400 mt-2">
              Last updated: 13 November 2025
            </p>
          </div>

          <div className="space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              Welcome to <b>Kyren Official</b>. Protecting your privacy is our
              top priority. This Privacy Policy explains how we collect, use,
              and safeguard your personal information when you use our website
              and top-up services.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              1. Information Collection
            </h2>
            <p>
              We collect personal details such as your name, email address,
              phone number, and payment information only for processing
              top-ups, ensuring order accuracy, and enhancing your user
              experience.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              2. Usage of Information
            </h2>
            <p>
              Collected data is used to process payments, deliver purchased
              credits, improve customer support, and maintain transaction
              security. We never sell or rent your personal information.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures, including SSL
              encryption and secure payment gateways, to protect your data
              against unauthorized access or misuse.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              4. Cookies
            </h2>
            <p>
              Our site uses cookies to personalize your browsing experience and
              remember your preferences. You may disable cookies in your browser
              settings if you prefer.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              5. Third-Party Services
            </h2>
            <p>
              We may use third-party services for analytics and payment
              processing. These providers have their own privacy policies that
              govern their handling of your data.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              6. Data Retention
            </h2>
            <p>
              We retain your data only as long as necessary to fulfill the
              purposes outlined here, or as required by law. Once data is no
              longer needed, it will be securely deleted.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              7. Children’s Privacy
            </h2>
            <p>
              Our services are not directed to children under the age of 13. We
              do not knowingly collect personal data from minors. Parents are
              encouraged to supervise online activity.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              8. Policy Updates
            </h2>
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Any changes will be reflected on this page with the updated
              revision date.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              9. Contact Information
            </h2>
            <p>
              For any privacy-related inquiries or assistance, feel free to
              reach us:
            </p>
            <ul className="space-y-1 text-neutral-300 mt-2">
              <li>
                📧 <b>Email:</b>{" "}
                <a
                  href="mailto:support@kyrenofficial.com"
                  className="text-purple-400 hover:text-orange-400"
                >
                  support@kyrenofficial.com
                </a>
              </li>
              <li>
                💬 <b>WhatsApp:</b>{" "}
                <a
                  href="https://wa.me/917099960475"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-orange-400"
                >
                  +91 70999 60475
                </a>
              </li>
            </ul>

            <p className="italic text-neutral-400 mt-8 border-t border-neutral-800 pt-6">
              By using our website and services, you acknowledge that you have
              read and agreed to this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
