import './Footer.css';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { useEffect } from 'react';
import { usePublicStoreInfo } from '../../hooks/user/usePublicStoreInfo';

type Props = {
    storeId: string;
};

const Footer = ({ storeId }: Props) => {

    const { fetchCarousel, data } = usePublicStoreInfo();

    //    FETCH STORE INFO
    useEffect(() => {

        if (storeId) {
            fetchCarousel(storeId);
        }

    }, [storeId]);

    const info = data?.data;

    return (

        <footer className="footer">

            <div className="footer-container">

                {/* ABOUT */}
                <div className="footer-section about">

                    <h3>About Store</h3>

                    <p>
                        {
                            info?.footerDescription ||
                            "Welcome to our store. We provide high quality products and best customer experience."
                        }
                    </p>

                </div>

                {/* COMPANY */}
                <div className="footer-section links">

                    <h3>Company</h3>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>

                        <li>
                            <a href="/about">About Us</a>
                        </li>

                        <li>
                            <a href="/contact">Contact</a>
                        </li>

                        <li>
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>

                        <li>
                            <a href="/terms">Terms</a>
                        </li>

                    </ul>

                </div>

                {/* POLICIES */}
                <div className="footer-section categories">

                    <h3>Policies</h3>

                    <ul>
                        <li>
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/refund-policy">Refund Policy</a>
                        </li>
                        <li>
                            <a href="/shipping-policy">Shipping Policy</a>
                        </li>
                        <li>
                            <a href="/terms">Terms & Conditions</a>
                        </li>
                    </ul>

                </div>

                {/* CONTACT */}
                <div className="footer-section contact">

                    <h3>Contact Us</h3>

                    <p>
                        <FaPhoneAlt />
                        {
                            info?.supportPhone ||
                            "+91 0000000000"
                        }
                    </p>

                    <p>
                        <FaEnvelope />
                        {
                            info?.supportEmail ||
                            "support@example.com"
                        }
                    </p>

                    <p>
                        <FaMapMarkerAlt />
                        {
                            `${info?.storeAddress || ""}
                             ${info?.storeCity || ""}
                             ${info?.storeState || ""}
                             ${info?.storeCountry || ""}`
                        }
                    </p>

                    {/* SOCIAL ICONS */}
                    <div className="social-icons">
                        {
                            info?.facebookUrl && (
                                <a
                                    href={info.facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebookF />
                                </a>
                            )
                        }

                        {
                            info?.instagramUrl && (
                                <a
                                    href={info.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram />
                                </a>
                            )
                        }

                        {
                            info?.twitterUrl && (
                                <a
                                    href={info.twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter />
                                </a>
                            )
                        }

                        {
                            info?.linkedinUrl && (
                                <a
                                    href={info.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedinIn />
                                </a>
                            )
                        }

                        {
                            info?.youtubeUrl && (
                                <a
                                    href={info.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaYoutube />
                                </a>
                            )
                        }

                    </div>

                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()}
                    {" "}
                    All rights reserved.
                </p>
            </div>

        </footer>
    );
};

export default Footer;