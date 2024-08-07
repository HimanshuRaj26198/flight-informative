import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/page";
import Head from "next/head";
import Footer from "./_components/Footer/page";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import PopUp from "./_components/Popup/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkyFly | The way to fly.",
  description: "Find the cheapest flight tickets with our advanced price comparison algorithm. Partnered with Trip.com, we bring you unbeatable deals on flights from all over the internet. Book your next flight with us and save big!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+NG+Modern:wght@100..400&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Playwrite+NG+Modern:wght@100..400&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16665917801"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16665917801');
          `,
          }}
        />
      </Head>
      <body>
        <div style={{ width: "100%" }} >
          <PopUp />
        </div>
        <div className="contact_call_section" >
          <div> <h2>Call: <a href="tel:+19725856351" >+1 (972) 585-6351</a></h2> </div>
        </div>
        <Navbar />
        {children}
        <Footer />
        <div className="main_info_ad" >
          <div className="info_container" >
            <div className="call_icon" >
              <FontAwesomeIcon icon={faPhoneVolume} />
            </div>
            <div className="number_container" >
              <p>Call & get unpublished flight deals.</p>
              <h2><a href="tel:+19725856351" >+1 (972) 585-6351</a></h2>
            </div>
          </div>
        </div>
      </body>

    </html>
  );
}
