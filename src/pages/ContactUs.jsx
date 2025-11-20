import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import "./Support.css";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, email, message } = form;

    const whatsappMessage = `
*New Support Message*
----------------------
*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Message:* ${message}
    `;

    const encoded = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "917099960475"; // your support number

    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <Layout>
      <section className="min-h-screen bg-neutral-950 text-neutral-200 px-6 md:px-16 py-16 flex justify-center">
        <form
          className="w-full max-w-lg bg-neutral-900/40 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl shadow-xl support-form"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-semibold text-center bg-linear-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-8">
            Please message us if you face any problem!
          </h3>

          {/* Name */}
          <div className="mb-5">
            <label htmlFor="name" className="text-neutral-400 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              className="form-control w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-neutral-200"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label htmlFor="phone" className="text-neutral-400 mb-1 block">
              Mobile Number (WhatsApp Preferred)
            </label>
            <input
              type="text"
              className="form-control w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-neutral-200"
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="text-neutral-400 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              className="form-control w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:border-orange-500 outline-none text-neutral-200"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="text-neutral-400 mb-1 block">
              Message
            </label>
            <textarea
              className="form-control w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 h-28 focus:border-purple-500 outline-none text-neutral-200"
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn submit w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-orange-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            Submit via WhatsApp
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default ContactUs;
