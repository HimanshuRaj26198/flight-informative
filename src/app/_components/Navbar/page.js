"use client"
import Image from "next/image";
import Style from "./Navbar.module.css";
import { useState } from "react";
import Link from 'next/link';

const Navbar = () => {
    const [hamburgerEnabled, setHamburgerEnabled] = useState(false);

    return <div className={Style.navbar_container} >
        <div className={Style.navbar} >
            <div className={Style.left_sec} >
                <div className={Style.logo_container} >
                    <h2>WishTrips</h2>
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
                        </ul>
                    </div>
                    <div className={Style.hamburger_container} >
                        <Image onClick={() => setHamburgerEnabled(!hamburgerEnabled)} src="/assets/menus.png" width={20} height={20} />

                        <div style={{ height: hamburgerEnabled ? "fit-content" : "0%" }} className={Style.hamburger}>
                            <ul className={Style.menu_list}>
                                <li className={Style.menu_option} > <Link href="/" >Flights</Link> </li>
                                <li className={Style.menu_option} > <Link href="/fare-comparison" >Fare Comparison</Link> </li>
                                <li className={Style.menu_option} > <Link href="/search-airports" >Search Airports</Link> </li>
                                <li className={Style.menu_option} > <Link href="/search-airlines" >Search Airlines</Link> </li>
                                <li className={Style.menu_option} > <Link href="/about-us" >About Us</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default Navbar;