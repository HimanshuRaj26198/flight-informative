import Image from "next/image";
import Style from "./Loading.module.css";
const Loading = () => {
    return <div className={Style.loading_container} >
        <div className={Style.spinner} >
            <Image src="/loading.png" height={50} width={50} />
        </div>
        <div> <h5>Searching Flights...</h5> </div>
    </div>
}

export default Loading;