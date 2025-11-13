const WhyChooseUs = () => {

    return (
        <section className="relative py-24 bg-linear-to-b from-black via-neutral-950 to-black text-gray-100 overflow-hidden">
  {/* Background glow effect */}
  <div className="absolute inset-0">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-3xl"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-white via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-lg">
        Why Choose Us
      </h2>
      <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
        The next generation of digital top-up — lightning-fast, secure, and rewarding.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-3 gap-10">
      {/* Card 1 - Instant Delivery */}
      <div className="group relative bg-linear-to-b from-neutral-900 to-neutral-950 p-px rounded-2xl shadow-2xl hover:shadow-blue-700/30 transition-all duration-300">
        <div className="bg-neutral-950/90 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center text-center group-hover:bg-neutral-900/90 transition">
          <div className="flex items-center justify-center w-20 h-20 bg-blue-600/20 rounded-2xl mb-6 group-hover:scale-105 transition">
            {/* ⚡ Lightning Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Instant Delivery</h3>
          <p className="text-gray-400 leading-relaxed">
            Credits appear in your account in seconds. We process all orders with ultra-low latency.
          </p>
        </div>
      </div>

      {/* Card 2 - Secure Transactions */}
      <div className="group relative bg-linear-to-b from-neutral-900 to-neutral-950 p-[1px] rounded-2xl shadow-2xl hover:shadow-emerald-700/30 transition-all duration-300">
        <div className="bg-neutral-950/90 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center text-center group-hover:bg-neutral-900/90 transition">
          <div className="flex items-center justify-center w-20 h-20 bg-emerald-600/20 rounded-2xl mb-6 group-hover:scale-105 transition">
            {/* 🔒 Padlock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 11h14v10H5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Secure Transactions</h3>
          <p className="text-gray-400 leading-relaxed">
            End-to-end encrypted payments with real-time fraud detection for peace of mind.
          </p>
        </div>
      </div>

      {/* Card 3 - Exclusive Rewards */}
      <div className="group relative bg-linear-to-b from-neutral-900 to-neutral-950 p-[1px] rounded-2xl shadow-2xl hover:shadow-fuchsia-700/30 transition-all duration-300">
        <div className="bg-neutral-950/90 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center text-center group-hover:bg-neutral-900/90 transition">
          <div className="flex items-center justify-center w-20 h-20 bg-fuchsia-600/20 rounded-2xl mb-6 group-hover:scale-105 transition">
            {/* 👑 Crown Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-fuchsia-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l4 10h10l4-10-5 3-4-5-4 5-5-3zM5 19h14" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Exclusive Rewards</h3>
          <p className="text-gray-400 leading-relaxed">
            Get cashback, loyalty points, and event bonuses when you recharge through us.
          </p>
        </div>
      </div>
    </div>  

    {/* CTA */}
    <div className="text-center mt-20">
      <a
        href="#top"
        className="inline-block bg-linear-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-fuchsia-600/40 transition-all duration-300"
      >
        Boost Your Gaming Journey 🚀
      </a>
    </div>
  </div>
</section>
    );
};

export default WhyChooseUs;