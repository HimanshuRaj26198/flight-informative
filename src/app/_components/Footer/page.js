import Style from "../../home/Home.module.css";
import Image from "next/image";
const Footer = () => {
    return <div className={Style.footer_container} >
        <div className={Style.footer} >
            <div className={Style.left_sec} >
                <span>Travel with SkyFly</span>
                <span>About SkyFly</span>
                <span>Legal</span>
                <span>Travel Tools</span>
                <span>Connect with SkyFly</span>
                <span>SkyFly Reviews</span>
            </div>
            <div className={Style.right_sec} >
                <div className={Style.additional_links} >
                    <span>Flights</span>
                    <span>Hotels</span>
                    <span>Cars</span>
                    <span>Go India</span>
                </div>
                <div className={Style.additional_links} >
                    <span>About Us</span>
                    <span>Testimonials</span>
                    <span>Customer Feedback</span>
                    <span>Sitemap</span>
                </div>
                <div className={Style.additional_links} >
                    <span>Privacy Policy</span>
                    <span>Terms and Conditions</span>
                    <span>Accessibility Policy</span>
                    <span>Taxes and Fees</span>
                </div>
                <div className={Style.additional_links} >
                    <span>Airline Baggage Policy</span>
                    <span>Online Check-In</span>
                    <span>Airline Telephone Numbers</span>
                    <span>World Airlines</span>
                    <span>Contact Us</span>
                    <span>FAQs</span>
                </div>
                <div className={Style.additional_links} >
                    <span><Image alt="SkyFly Facebook" src="/facebook (1).png" width={25} height={25} /></span>
                    <span><Image alt="SkyFly LinkedIn" src="/linkedin.png" width={25} height={25} /></span>
                    <span><Image alt="SkyFly Twitter" src="/twitter.png" width={25} height={25} /></span>
                    <span><Image alt="SkyFly Instagram" src="/instagram.png" width={25} height={25} /></span>
                </div>
            </div>
        </div>
    </div>

}

export default Footer;