"use client"
import Style from "./Marketing.module.css";
import { useState, useEffect } from "react";
const Marketing = () => {
    const [mobileIframe, setMobileIframe] = useState(true);
    useEffect(() => {
        const updateIframeSrc = () => {
            if (window.innerWidth < 890) {
                setMobileIframe(true);
            } else {
                setMobileIframe(false);
            }
        };
        updateIframeSrc();

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', updateIframeSrc);

        window.addEventListener('resize', updateIframeSrc);
    }, [])
    return <div className={Style.third_sec} >
        <h2>Search A Flight Now with</h2>
        <div className={Style.marketing_container} >
            <div className={Style.dest_left_sec} >
                <iframe border="0" src="https://www.trip.com/partners/ad/SB513942?Allianceid=5161241&SID=104412939&trip_sub1=" style={{ width: "300px", height: "250px", border: "none" }} frameBorder="0" id="SB513942"></iframe>
            </div>
            <div className={Style.widget_container} >
                {mobileIframe ? <iframe border="0" src="https://www.trip.com/partners/ad/S513935?Allianceid=5161241&SID=104412939&trip_sub1=" style={{ width: "320px", height: "480px", border: "none" }} frameBorder="0" id="S513935"></iframe> : <iframe border="0" src="https://www.trip.com/partners/ad/S513935?Allianceid=5161241&SID=104412939&trip_sub1=" style={{ width: "900px", height: "200px", border: "none" }} frameBorder="0" id="S513935"></iframe>}
            </div>
            <div className={Style.dest_right_sec} >
                <iframe border="0" src="https://www.trip.com/partners/ad/SB513942?Allianceid=5161241&SID=104412939&trip_sub1=" style={{ width: "300px", height: "250px", border: "none" }} frameBorder="0" id="SB513942"></iframe>
            </div>
        </div>
    </div>
}

export default Marketing;