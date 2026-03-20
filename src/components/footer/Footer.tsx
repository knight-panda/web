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

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section about">
                    <h3>About CrazoWeb</h3>
                    <p>At CrazoWeb, we design high-quality mobile apps, responsive websites, and performance-focused marketing campaigns. Our team helps startups and businesses turn ideas into digital products and scale with smart online strategies.</p>
                </div>

                <div className="footer-section links">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="/courses">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/blog">Services</a></li>
                        <li><a href="/faq">Projects</a></li>
                        <li><a href="/contact">Reviews</a></li>
                    </ul>
                </div>

                <div className="footer-section categories">
                    <h3>Top Services</h3>
                    <ul>
                        <li><a href="/categories/ca">Web Development</a></li>
                        <li><a href="/categories/cs">Mobile App Development</a></li>
                        <li><a href="/categories/gate">Digital Marketing</a></li>
                        <li><a href="/categories/jee">Video Production</a></li>
                        <li><a href="/categories/neet">Logo Design</a></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><FaPhoneAlt /> +91 7064230183</p>
                    <p><FaEnvelope /> support@crazoweb.com</p>
                    <p><FaMapMarkerAlt /> Cuttack, Odisha, India</p>

                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/crazoweb_technology/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} CrazoWeb. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;