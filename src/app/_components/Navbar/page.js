"use client"
import Image from "next/image";
import Style from "./Navbar.module.css";
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';

const Navbar = () => {
    const [hamburgerEnabled, setHamburgerEnabled] = useState(false);
    const hamburgerMenuRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside the div
        const handleClickOutside = (event) => {
            if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target)) {
                setHamburgerEnabled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    return <div className={Style.navbar_container} >
        <div className={Style.navbar} >
            <div className={Style.left_sec} >
                <div className={Style.logo_container} >
                    <img style={{ width: "65px", height: "auto" }} src="/logo.png" />
                </div>
            </div>
            <div className={Style.right_sec} >
                <div className={Style.menu_container} >
                    <div className={Style.menu} >
                        <ul className={Style.menu_list}>
                            <li className={Style.menu_option} > <Link href="/" >Flights</Link> </li>
                            <li className={Style.menu_option} > <Link href="/fare-comparison" >Fare Comparison</Link> </li>
                            <li className={Style.menu_option} > <Link href="/search-airports" >Search Airports</Link> </li>
                            <li className={Style.menu_option} > <Link href="/search-airlines" >Search Airlines</Link> </li>
                            <li className={Style.menu_option} > <Link href="/about-us" >About Us</Link> </li>
                            <li><div className={Style.contact_call_section} >
                                <p>Call 24/7 for our best deals</p>
                                <div> <h2><a href="tel:+19725856351" >+1 (972) 585-6351</a></h2> </div>
                            </div></li>
                        </ul>
                    </div>
                    <div className={Style.hamburger_container} >
                        <Image onClick={() => setHamburgerEnabled(!hamburgerEnabled)} src="/assets/menus.png" width={20} height={20} />

                        <div ref={hamburgerMenuRef} style={{ height: hamburgerEnabled ? "fit-content" : "0%" }} className={Style.hamburger}>
                            <ul className={Style.menu_list}>
                                <li className={Style.menu_option} > <Link onClick={() => setHamburgerEnabled(false)} href="/" >Flights</Link> </li>
                                <li className={Style.menu_option} > <Link onClick={() => setHamburgerEnabled(false)} href="/fare-comparison" >Fare Comparison</Link> </li>
                                <li className={Style.menu_option} > <Link onClick={() => setHamburgerEnabled(false)} href="/search-airports" >Search Airports</Link> </li>
                                <li className={Style.menu_option} > <Link onClick={() => setHamburgerEnabled(false)} href="/search-airlines" >Search Airlines</Link> </li>
                                <li className={Style.menu_option} > <Link onClick={() => setHamburgerEnabled(false)} href="/about-us" >About Us</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}


export default Navbar;