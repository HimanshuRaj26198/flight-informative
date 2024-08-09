"use client"
import Style from "./Popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const PopUp = () => {
    const [popupEnabled, setPopupEnabled] = useState(true);

    useEffect(() => {
        setInterval(() => {
            if (!popupEnabled) {
                setPopupEnabled(true);
            }
        }, 30000)
    }, [])
    return <div>{
        popupEnabled && <div className={Style.main_popup_container} >
            <div className={Style.popup_container} >
                <div className={Style.popup} >
                    <div className={Style.close} >
                        <FontAwesomeIcon onClick={() => setPopupEnabled(false)} icon={faXmark} />
                    </div>
                    <div className={Style.message_container} >
                        <h2>Still Looking For Cheaper Price?</h2>
                        <h3> Call: <a href="tel:+19725856351" >+1 (972) 585-6351</a> </h3>
                        <h3>Let's search for the cheapest ticket prices on call.</h3>
                        <p>No need to worry, we can do more maket research and valuation and can find even more cheaper ticket prices over call.</p>
                    </div>
                </div>
            </div>
        </div>
    }</div>
}

export default PopUp;