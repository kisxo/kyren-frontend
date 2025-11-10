import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../Footer/Footer.css";
import { Email, Facebook, Phone, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
    return (
        <div class="footer">
            <footer class="text-center text-white">
                <div class="container-top">
                    <section class="footer-icons">
                        <a href="">
                            <Facebook />
                        </a>
                        <a href="">
                            <YouTube />
                        </a>
                        <a href="">
                            <InstagramIcon />
                        </a>
                        <a href="">
                            <WhatsAppIcon />
                        </a>
                        <a href="">
                            <Email />
                        </a>
                    </section>

                    <section class="footer-links">
                        <a href="#!">Contact Us</a>
                        <a href="#!">Terms & Conditions</a>
                        <a href="#!">Privacy Policy</a>
                        <a href="#!">Refund Policy</a>
                        <a href="#!">Copyright</a>
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