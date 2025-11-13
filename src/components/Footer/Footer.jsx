import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "../Footer/Footer.css";

const Footer = () => {
    return (
        <div class="footer">
            <footer class="text-center text-white">
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

                    <section class="footer-links">
                        <Link href="#!">Contact Us</Link>
                        <Link href="/terms-and-conditions">Terms & Conditions</Link>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <Link href="#!">Refund Policy</Link>
                        <Link href="#!">Copyright</Link>
                    </section>
                </div>

                <hr class="my-3" />

                <div class="text-center footer-info">
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