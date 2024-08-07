import Style from "./Fare-comparison.module.css";
import Image from "next/image";
import img from "../../../public/coming-soon.png"
const FareComparison = () => {
    return <div className={Style.coming_soon_container} >
        <div className={Style.coming_soon} >
            <Image className={Style.coming_img} src={img} fill={true} />
        </div>
    </div>
}


export default FareComparison;