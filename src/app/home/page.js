"use client"
import { useState, useEffect } from "react";
import airlines from "../../../lib/data/airlines.json";
import airportsDB from "../../../lib/data/airports.json";
import SearchForm from "../_components/SearchForm/page";
import TopDestinations from "../../../lib/data/best_destinations.json";
import Style from "./Home.module.css";
import Image from "next/image";
import FlighCool from "../../../public/assets/flightcool1.png";
import Marketing from "../_components/Marketing/page";

const HomePage = () => {
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
    let destinationCount = 10;
    const handleMore = (action) => {
        if (action === "increase") {
            destinationCount += 10;
        } else {
            destinationCount = 10;
        }
    }

    return <div className={Style.HomePage} >
        <div className={Style.header_section} >
            <div className={Style.searchform_container} >
                <div className={Style.searchForm} >
                    <div className={Style.hero_text} >
                        <h2>Where you want to fly? <Image className={Style.fly_img} src={FlighCool} width={77} height={50} /> </h2>
                    </div>
                    <SearchForm />
                </div>
            </div>
        </div>
        <div className={Style.destinations_sec} >
            <h2>Top Destinations you can visit this week.</h2>
            <div className={Style.destination_list_container} >
                <div className={Style.destinations_list} >
                    {
                        TopDestinations.slice(0, destinationCount).map((a, index) => {
                            return <div key={index} className={Style.destination_card} >
                                <div className={Style.destination_img_container} >
                                    <Image className={Style.destination_img} src={a.img} fill={true} />
                                </div>
                                <div className={Style.destination_details} >
                                    <h3>{a.city}</h3>
                                    <p>{a.country}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className={Style.destination_action} >
                    <span onClick={() => handleMore("increase")} className={Style.checkmore_btn} > Check More</span>
                </div>
            </div>
        </div>
        <Marketing />
    </div >
}


export default HomePage;