"use client"
import Style from "./SearchAirline.module.css";
import Image from "next/image";
import img from "../../../public/coming-soon.png"
import { useEffect } from "react";

const SearchAirlines = () => {
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
    return <div className={Style.coming_soon_container} >
        <div className={Style.coming_soon} >
            <Image className={Style.coming_img} src={img} fill={true} />
        </div>
    </div>
}

export default SearchAirlines;