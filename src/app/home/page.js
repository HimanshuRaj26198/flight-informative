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