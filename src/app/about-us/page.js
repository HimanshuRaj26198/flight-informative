"use client"
import Link from "next/link";
import Style from "./About.module.css"
import Image from "next/image";
import { useEffect } from "react";
const AboutUs = () => {

    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');

        // Set the async attribute
        script.async = true;

        // Set the script source (e.g., Google Ads)
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16665917801';

        // Append the script to the document head
        document.head.appendChild(script);

        // Add the inline script for gtag configuration
        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16665917801');
    `;

        // Append the inline script to the document head
        document.head.appendChild(inlineScript);

        // Cleanup: remove the scripts when the component is unmounted
        return () => {
            document.head.removeChild(script);
            document.head.removeChild(inlineScript);
        };
    }, [])

    return <>
        <header className={Style.page_header} >
            <div className={Style.container}>
                <h1>About Us</h1>
            </div>
        </header>

        <main className={Style.main} >
            <div className={Style.container}>
                <section className={Style.intro}>
                    <h2>Welcome to SkyFly!</h2>
                    <p>At SkyFly, our mission is to transform the way you search for flight tickets. Based in the bustling city of Las Vegas, we are a forward-thinking US-based company committed to delivering the best flight deals tailored just for you.</p>
                    <p>With a team of experienced data scientists at the helm, we use sophisticated algorithms and cutting-edge technology to analyze vast amounts of data. This allows us to provide you with unmatched pricing and travel options, ensuring your journey begins with a great deal.</p>
                </section>

                <section className={Style.mission}>
                    <h2>Our Mission</h2>
                    <p>We are driven by a simple goal: to find you the most affordable flight tickets available. By partnering with top platforms like Trip.com and conducting comprehensive market research, we guarantee that you receive the best possible prices.</p>
                    <p>Our team is dedicated to transparency and accuracy, ensuring that you have all the information you need to make informed decisions. We understand that every traveler has unique needs, and we strive to cater to those needs with precision and care.</p>
                </section>

                {/* <section className={Style.team}>
                    <h2>Meet Our Team</h2>
                    <div className="{Style.teammembe}">
                        <Image height={200} width={300} src="/data_scientist.jpg" alt="Data Scientist" className="{Style.teamphot}" />
                        <div className="{Style.teaminf}">
                            <h3>John Doe</h3>
                            <p><strong>Chief Data Scientist</strong></p>
                            <p>John is the mastermind behind our data analysis algorithms. With over 10 years of experience in data science, he ensures that our flight deals are not only the best but also reliable and accurate.</p>
                        </div>
                    </div>
                    <div className="{Style.teammembe}">
                        <Image height={200} width={300} src="/data_scientist.jpg" alt="Data Analyst" className="{Style.teamphot}" />
                        <div className="{Style.teaminf}">
                            <h3>Jane Smith</h3>
                            <p><strong>Senior Data Analyst</strong></p>
                            <p>Jane's expertise in analyzing market trends helps us stay ahead of the curve. Her insights are crucial in finding the best deals and ensuring that our users get the most value for their money.</p>
                        </div>
                    </div>
                </section> */}

                <section className={Style.values}>
                    <h2>Our Core Values</h2>
                    <ul>
                        <li><strong>Integrity:</strong> We believe in honest and transparent operations, providing you with accurate information and fair pricing.</li>
                        <li><strong>Customer-Centricity:</strong> Your satisfaction is our priority. We go the extra mile to ensure your travel planning experience is seamless and enjoyable.</li>
                        <li><strong>Innovation:</strong> We continuously update our technology and methods to stay ahead in the industry and provide you with the best possible service.</li>
                    </ul>
                </section>

                <section className={Style.contact}>
                    <h2>Get in Touch</h2>
                    <p>Have questions or need support? Our team is here to assist you. Feel free to <Link className={Style.link} href="/contact.html">contact us</Link> for any inquiries or assistance you may need.</p>
                </section>

                <section className={Style.address_container}>
                    <h2>Our offices across the globe</h2>
                    <div className={Style.addresses} >
                        <div className={Style.address} >
                            <div className={Style.flag} >
                                <Image className={Style.flg_img} src={"/flag.png"} width={100} height={100} />
                            </div>
                            <p>   Building No. 43, 1st Floor, Andand Prime Building, near by Haldi ghati Gate, Sanganer, Pratap Nagar, Jaipur, Rajasthan, 302033
                            </p>
                        </div>
                        <div className={Style.address} >
                            <div className={Style.flag} >
                                <Image className={Style.flag_img} src={"/united-states.png"} width={100} height={100} />

                            </div>
                            <p>12888 S Textas 6, Sugar Land, TX 77498, United States</p>
                        </div>
                    </div>
                </section>
            </div>
        </main></>
}


export default AboutUs;