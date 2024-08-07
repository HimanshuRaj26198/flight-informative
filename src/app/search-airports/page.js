import Style from "./SearchAirport.module.css";
import Image from "next/image";
import img from "../../../public/coming-soon.png"

const SearchAirports = () => {
    return <div className={Style.coming_soon_container} >
        <div className={Style.coming_soon} >
            <Image className={Style.coming_img} src={img} fill={true} />
        </div>
    </div>
}

export default SearchAirports;