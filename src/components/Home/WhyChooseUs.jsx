const WhyChooseUs = () => {
    return (
        <section className="relative py-24 bg-gradient-to-b from-black via-neutral-950 to-black text-gray-100 overflow-hidden">
            {/* Background Glow (no animation → no layout shift) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-fuchsia-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                        Why Choose Us
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                        The next generation of digital top-up — lightning-fast,
                        secure, and rewarding.
                    </p>
                </div>

                {/* Stable Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <div className="bg-neutral-950/95 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center text-center">
                        {/* Icon Box (fixed size → no shift) */}
                        <div className="flex items-center justify-center w-20 h-20 min-h-[80px] bg-blue-600/20 rounded-2xl mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                            Instant Delivery
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Credits appear in your account in seconds. Ultra-low
                            latency processing.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-neutral-950/95 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-20 h-20 min-h-[80px] bg-emerald-600/20 rounded-2xl mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-emerald-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 11h14v10H5z"
                                />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                            Secure Transactions
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            End-to-end encrypted payments with real-time fraud
                            detection.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-neutral-950/95 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-20 h-20 min-h-[80px] bg-fuchsia-600/20 rounded-2xl mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-fuchsia-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7l4 10h10l4-10-5 3-4-5-4 5-5-3zM5 19h14"
                                />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                            Exclusive Rewards
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Earn cashback, loyalty points and event bonuses on
                            every recharge.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <a
                        href="#top"
                        className="inline-block bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:opacity-90 text-white font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300"
                    >
                        Boost Your Gaming Journey 🚀
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
