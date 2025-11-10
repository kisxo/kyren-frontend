import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import "../Footer/Footer.css";
import { Email, Facebook, Phone, Twitter, YouTube } from "@mui/icons-material";

const FooterOld = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    return (
        // <React.Fragment>
            <div className="container-fluid footer-container bg-red-500">
                <div className="wa-icon">
                    <Link to="https://wa.me/916003251677" target="_blank">
                        <WhatsAppIcon className="icon" />
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 mb-4">
                        <div className="footer-logo">
                            <span className="blue">Kyren</span> Official Store
                        </div>
                        <span>
                            Made with <FavoriteIcon className="text-danger" />{" "}
                            in India
                        </span>
                        <br />
                        <span>+91 6003251677</span>
                        <br />
                        <span>ignkyren@gmail.com</span>
                        <br />
                        <span>Assam India</span>
                    </div>
                    <div className="px-lg-5 quick-links col-6 col-sm-6 col-md-3 col-lg-3 mb-4">
                        <h6>Quick Links</h6>
                        <ul>
                            {!user ? (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/user-dashboard">Dashboard</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 mb-4">
                        <h6>Connect here</h6>
                        <div className="social-media-links">
                            <Link target="_blank" to="">
                                <InstagramIcon className="icon" />
                            </Link>
                            <Link target="_blank" to="">
                                <FacebookIcon className="icon" />
                            </Link>
                            <Link
                                target="_blank"
                                to="https://wa.me/916003251677"
                            >
                                <WhatsAppIcon className="icon" />
                            </Link>
                            <Link
                                target="_blank"
                                to="mailto:ignkyren@gmail.com"
                            >
                                <EmailIcon className="icon" />
                            </Link>
                        </div>
                    </div>

                    <hr />
                    <span className="text-center pb-5">
                        <small>
                            All Rights Reserved © 2025 | KYREN OFFICIAL STORE
                        </small>
                    </span>
                </div>
            </div>
        // </React.Fragment>
    );
};

const Footera = () => {
    return (
      <React.Fragment>
        <footer className="footer container-fluid footer-container">
          <div class="footer-top" >
            <a>Contact Us</a>
            <a>Terms & Conditions</a>
            <a>Privacy Policy</a>
          </div>

          <div class="footer-top" >
            <a>Refund Policy</a>
            <a>Copyright</a>
          </div>

          <div class="footer-bottom" >
            <span> Copyright © 2025 Kyren Official Store </span>
            <span>
              First Floor, Desi Complex, Panbazar
              Guwahati, Assam - 700000
            </span>
          </div>
        </footer>
      </React.Fragment>
    )
    return (
        <footer className="footer mt-4">
            <div class="d-width py-3 d-flex flex-column gap-3">
                <div class="footer-section-cta f-14 gap-3" >
                    <div class="d-flex flex-column" >
                        <span _ngcontent-ng-c3609394919="">
                            Copyright © 2018-2025 Dab Arcade
                        </span>
                        <span>
                            First Flooe, House No 57, Street No 5, Lohara,
                            Ludhiana, Punjab - 141016
                        </span>
                    </div>
                    <div class="d-flex align-items-center gap-3 pointer footer-section-cta-sub" >
                        <div class="d-flex align-items-center gap-3" >
                            <span _ngcontent-ng-c3609394919="">Contact Us</span>
                            <span _ngcontent-ng-c3609394919="">
                                Terms &amp; Conditions
                            </span>
                            <span _ngcontent-ng-c3609394919="">
                                Privacy Policy
                            </span>
                        </div>
                        <div class="d-flex align-items-center gap-3" >
                            <span _ngcontent-ng-c3609394919="">
                                Refund Policy
                            </span>
                            <span>Copyright</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Footer = () => {
  return (
  <div class="footer">
    <footer class="text-center text-white" >
      <div class="container-top">

        <section class="footer-icons">
          <a href="">
            <Facebook/>
          </a>
          <a href="">
            <YouTube/>
          </a>
          <a href="">
            <InstagramIcon/>
          </a>
          <a href="">
            <WhatsAppIcon/>
          </a>
          <a href="">
            <Email/>
          </a>
        </section>
        
        <section class="footer-links">
            <a href="#!" >Contact Us</a>
            <a href="#!" >Terms & Conditions</a>
            <a href="#!" >Privacy Policy</a>
            <a href="#!" >Refund Policy</a>
            <a href="#!" >Copyright</a>
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
                First Floor, Divine Complex, Guwahati, Assam, 7656556
              </p>
            </div>
          </div>
        </section>
    </footer>

  </div>
  )
}
export default Footer;
