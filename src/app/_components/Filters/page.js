"use client"
import Style from "./Filters.module.css";

const Filters = () => {
    return <div className={Style.filter_parent} >
        <p className={Style.filter_heading} >Popular Filters</p>
        <div className={Style.filter_box} >
            <ul>
                {popularFilters.map(a => {
                    return <li>
                        <input type="checkbox" onChange={() => { a.enabled = !a.enabled }} checked={a.enabled} /> {a.name}
                    </li>
                })}
            </ul>
        </div>
    </div>
}

export default Filters;