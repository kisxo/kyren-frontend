import React from "react";
import Layout from "../components/Layout/Layout";

const TermsConditions = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-neutral-950 text-neutral-200 px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-sm text-neutral-400 mt-2">
              Last updated: 13 November 2025
            </p>
          </div>

          <div className="space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              Welcome to <b>Kyren Official</b>! These Terms and Conditions govern your
              use of our website and services. By accessing or using our
              platform, you agree to be bound by these Terms. If you do not
              agree, please refrain from using our services.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website or making a purchase, you acknowledge that
              you have read, understood, and agree to these Terms & Conditions,
              along with our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              2. Eligibility
            </h2>
            <p>
              Users must be at least 13 years old to use our services. By using
              Kyren Official, you confirm that you meet this age requirement and
              are capable of entering into a legal agreement.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              3. Account Responsibility
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. Any activity performed under your account
              will be deemed your responsibility. Report any unauthorized use
              immediately to our support team.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              4. Services & Purchases
            </h2>
            <p>
              Our website offers digital in-game top-ups and related services.
              All transactions are final once processed. Please ensure your
              game ID and server details are correct before confirming payment.
              Refunds are only processed under exceptional verified cases.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              5. Intellectual Property
            </h2>
            <p>
              All text, logos, graphics, and designs displayed on Kyren Official
              are protected by intellectual property laws. Unauthorized
              reproduction, modification, or distribution of our content is
              strictly prohibited.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              6. Prohibited Conduct
            </h2>
            <p>
              Users agree not to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3 text-neutral-300">
              <li>Use the website for any unlawful purpose.</li>
              <li>Interfere with site functionality or attempt unauthorized access.</li>
              <li>Engage in fraudulent transactions or misrepresent identity.</li>
              <li>Exploit any bugs or vulnerabilities in our system.</li>
            </ul>

            <h2 className="text-xl font-semibold text-purple-400">
              7. Third-Party Services
            </h2>
            <p>
              We may use third-party services such as payment gateways and
              analytics tools. These providers operate under their own terms
              and privacy policies, which we recommend reviewing.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              8. Limitation of Liability
            </h2>
            <p>
              Kyren Official and its affiliates shall not be liable for any
              direct, indirect, incidental, or consequential damages arising
              from the use of our website, products, or services. Use of our
              platform is at your own risk.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              9. Modification of Terms
            </h2>
            <p>
              We reserve the right to modify, update, or replace any part of
              these Terms at our discretion. Continued use of our website after
              changes signifies acceptance of the updated Terms.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              10. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall
              be resolved in accordance with Indian jurisdiction.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              11. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms, please reach us:
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
              By using Kyren Official, you agree to these Terms & Conditions. If
              you do not agree, please discontinue use of our platform.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsConditions;
