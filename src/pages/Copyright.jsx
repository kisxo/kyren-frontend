import React from "react";
import Layout from "../components/Layout/Layout";

const Copyright = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-neutral-950 text-neutral-200 px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
              Copyright Policy
            </h1>
            <p className="text-sm text-neutral-400 mt-2">
              Last updated: 13 November 2025
            </p>
          </div>

          {/* CONTENT */}
          <div className="space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              The content, design, graphics, logos, and all materials displayed
              on <b>Kyren Official</b> are the exclusive intellectual property of
              Kyren Official unless otherwise stated. Unauthorized copying,
              reproduction, modification, distribution, or commercial use of any
              site content is strictly prohibited.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              1. Ownership of Content
            </h2>
            <p>
              All images, artwork, text content, UI elements, product data,
              website design, branding, and digital assets belong solely to{" "}
              <b>Kyren Official</b>. Any use without written permission may lead to
              legal action under applicable copyright laws.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              2. Restrictions on Use
            </h2>
            <p>You are not allowed to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Republish our site content on other websites</li>
              <li>Use our brand name, logo, or designs without permission</li>
              <li>Copy product descriptions or service listings</li>
              <li>Download or extract data for commercial use</li>
            </ul>

            <h2 className="text-xl font-semibold text-purple-400">
              3. Trademark Notice
            </h2>
            <p>
              The name <b>Kyren Official</b>, including its logo and brand styling,
              is protected as a trademark. Any misuse or impersonation will be
              subject to strict legal action.
            </p>

            <h2 className="text-xl font-semibold text-orange-400">
              4. User-Generated Content
            </h2>
            <p>
              Any content you upload (messages, screenshots, etc.) must not
              violate the rights of others. You are responsible for any legal
              issues arising from the content you submit.
            </p>

            <h2 className="text-xl font-semibold text-purple-400">
              5. Reporting Copyright Violations
            </h2>
            <p>
              If you believe your copyrighted material has been used on our
              platform without authorization, please contact us for immediate
              assistance.
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
              By accessing or using our website, you acknowledge that you have
              read, understood, and agreed to this Copyright Policy.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Copyright;
