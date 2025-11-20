import React from "react";
import { Link} from "react-router";
import { useSelector } from "react-redux";
// import "../Footer/Footer.css";

const Footer = () => {
    return (
        <div class="p-4 pt-10 pb-20 text-xs text-center text-white/30 ">
            <footer class="">
                <div class="container-top">
                    <section class="footer-icons">
                        <a href="">
                            {/* <Facebook /> */}
                        </a>
                        <a href="">
                            {/* <YouTube /> */}
                        </a>
                        <a href="">
                            {/* <InstagramIcon /> */}
                        </a>
                        <a href="">
                            {/* <WhatsAppIcon /> */}
                        </a>
                        <a href="">
                            {/* <Email /> */}
                        </a>
                    </section>

                    <section class="flex justify-center gap-4">
                        <Link to="/contact-us">Contact Us</Link>
                        <Link to="/terms-and-conditions">Terms & Conditions</Link>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/refund-policy">Refund Policy</Link>
                        <Link to="/copyright">Copyright</Link>
                    </section>
                </div>

                <hr class="my-3" />

                <div class="mt-10">
                    © 2025
                    <a href=""> Kyren Official Store </a>
                </div>

                <section class="footer-info">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <p>
                                First Floor, Divine Complex, Guwahati, Assam,
                                7656556
                            </p>
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    );
};

export default Footer;