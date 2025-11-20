import React from "react";
import Layout from "../components/Layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-neutral-950 text-neutral-200 px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              Refund Policy
            </h1>
            <p className="text-sm text-neutral-400 mt-2">
              Last updated: 13 November 2025
            </p>
          </div>

          {/* Body */}
          <div className="space-y-8 text-sm md:text-base leading-relaxed">

            <p>
              At <b>Kyren Official</b>, customer satisfaction is important to us.
              This Refund Policy explains the conditions under which refunds may
              be issued for purchases made through our platform.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              1. Refund Eligibility
            </h2>
            <ul className="space-y-2">
              <li>• Refunds apply only to in-game purchases made on our website.</li>
              <li>• Refund requests must be submitted within <b>24 hours</b> of purchase.</li>
              <li>• Refunds are <b>not</b> processed if incorrect player/game details were submitted by the user.</li>
            </ul>

            <h2 className="text-xl font-semibold text-purple-400">
              2. Valid Reasons for Refunds
            </h2>
            <p>
              Refunds may be granted only for:
            </p>
            <ul className="space-y-2">
              <li>• Unauthorized transactions</li>
              <li>• Technical issues causing non-delivery of purchased items</li>
              <li>• Verifiable system or payment errors</li>
            </ul>

            <h2 className="text-xl font-semibold text-orange-400">
              3. Refund Process
            </h2>
            <p>
              To request a refund, users must contact us at:
            </p>
            <p className="text-purple-400">
              📧 <b>Email:</b> abishekroy100m@gmail.com
            </p>
            <p className="mt-2">
              Include the following details:
            </p>
            <ul className="space-y-2">
              <li>• Order number</li>
              <li>• Date and time of purchase</li>
              <li>• Screenshot of payment (if applicable)</li>
              <li>• Clear description of the issue</li>
            </ul>

            <h2 className="text-xl font-semibold text-purple-400">
              4. Refund Approval
            </h2>
            <ul className="space-y-2">
              <li>• All refund requests are subject to internal review.</li>
              <li>• Refunds may be rejected if made after the eligible time window or if bad-faith activity is detected.</li>
            </ul>

            <h2 className="text-xl font-semibold text-orange-400">
              5. Refund Methods
            </h2>
            <ul className="space-y-2">
              <li>• Approved refunds will be processed through the original payment method.</li>
              <li>• In special cases, alternative refund methods may be offered.</li>
            </ul>

            <h2 className="text-xl font-semibold text-purple-400">
              6. Non-Refundable Items
            </h2>
            <p>
              Some digital items or services may not be eligible for refunds.
              Users are advised to review product descriptions before purchasing.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              7. Chargebacks
            </h2>
            <p>
              We encourage users to reach out to our support team before
              initiating chargebacks. Unauthorized chargebacks may result in
              temporary or permanent account restrictions.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              8. Policy Updates
            </h2>
            <p>
              We may modify or update this Refund Policy at any time. Any
              changes will be posted on this page along with a revised date.
            </p>

            <p className="italic text-neutral-400 mt-8 border-t border-neutral-800 pt-6">
              By using our website and making any purchase, you acknowledge that
              you have read, understood, and agreed to this Refund Policy.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
