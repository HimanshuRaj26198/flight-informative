"use client"
import Style from "./Searchorm.module.css";
import AirportsList from "../../../../lib/data/airports.json";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../LoadingComponent/page";

const SearchForm = () => {
    const [filteredToAirports, setFilteredToAirports] = useState([]);
    const [filteredFromAirports, setFilteredFromAirports] = useState([]);
    const [toAirportValue, setToAirportValue] = useState(null);
    const [fromAirportValue, setFromAirportValue] = useState(null);
    const [toSuggestionVisible, setToSuggestionVisible] = useState(false);
    const [fromSuggestionVisible, setFromSuggestionVisible] = useState(false);
    const fromDivRef = useRef(null);
    const toDivRef = useRef(null);
    const fromDate = useRef("");
    const toDate = useRef("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("One-Way");
    const [tripTypes, setTypes] = useState([{ name: "One-Way", active: true }, { name: "Round Trip", active: false }])


    const handleSelection = (action, value) => {
        if (action === "from") {
            setFromAirportValue(value)
            setToSuggestionVisible(false);
        }
        if (action === "to") {
            setToAirportValue(value);
            setToSuggestionVisible(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let journeyDetail = {
            source: fromAirportValue,
            destination: toAirportValue,
            departureDate: fromDate.current.value,
            arrivalDate: toDate.current.value
        }
        let token = await fetchToken()
        router.push(`/home/flights-search?token=${token}&source=${journeyDetail.source.iata}&destination=${journeyDetail.destination.iata}&departureDate=${journeyDetail.departureDate}&arrivalDate=${journeyDetail.arrivalDate}`);

    }
    const fetchToken = async () => {
        let body = new URLSearchParams();
        body.append("grant_type", "client_credentials");
        body.append("client_id", "ASnlGo1J2j0yZOqmXmctS0sidtQ70vuR");
        body.append("client_secret", "dJz4MtaWjbPoTpKC");
        try {
            const data = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: body.toString()
                });
            const json = await data.json();
            return json.access_token;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // Function to handle clicks outside the div
        const handleClickOutside = (event) => {
            if (toDivRef.current && !toDivRef.current.contains(event.target)) {
                setToSuggestionVisible(false);
            }
            if (fromDivRef.current && !fromDivRef.current.contains(event.target)) {
                setFromSuggestionVisible(false); // Hide the div if click is outside
            }

        };

        //setting today Dtae
        let newDate = new Date();
        fromDate.current.value = newDate.toISOString().split('T')[0];
        console.log(newDate, "Current Date");



        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFilter = (e, item) => {
        if (item === "to") {
            if (e.target.value === "") {
                setToAirportValue(null);
            } else {
                let filteredObj = Object.values(AirportsList).filter(a => {
                    if (a.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                    if (a.iata.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                    if (a.city.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                    if (a.country.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                });
                setToSuggestionVisible(true);
                setFilteredToAirports(filteredObj);
            }

        } else if (item === "from") {
            if (e.target.value === "") {
                setFromAirportValue(null);
            } else {
                let filteredObj = Object.values(AirportsList).filter(a => {
                    if (a.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                    if (a.iata.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                    if (a.city.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a
                    }
                    if (a.country.toLowerCase().includes(e.target.value.toLowerCase())) {
                        return a;
                    }
                });
                setFromSuggestionVisible(true);
                setFilteredFromAirports(filteredObj);
            }
        }
    }

    const toggleType = (index) => {
        let arr = tripTypes.map((a, i) => {
            if (index === i) {
                a.active = true;
                setSelectedType(a.name)
            } else {
                a.active = false;
            };
            return a;
        });
        setTypes(arr);
    }

    return <div className={Style.searchform_container} >
        {loading && <Loading />}
        <div className={Style.toggle_type} >
            <div className={Style.toggle_button} >
                {
                    tripTypes.map((a, i) => {
                        return <div onClick={() => toggleType(i)} style={{ boxShadow: a.active ? "inset 0px 0px 3px 2px rgba(0, 0, 0, 0.3)" : "" }} className={Style.toggle_btn} > <p>{a.name}</p> </div>
                    })
                }
            </div>
        </div>
        <div className={Style.searchForm} >
            <form onSubmit={handleSubmit} >
                <div className={Style.input_container} >
                    <input value={fromAirportValue && `${fromAirportValue.iata}, ${fromAirportValue.city}, ${fromAirportValue.country}`} onChange={(e) => handleFilter(e, "from")} type="search" placeholder="Origin" />
                    {fromSuggestionVisible && <div ref={fromDivRef} className={Style.filtered_list_container} >
                        <ul className={Style.list_container}>
                            {
                                filteredFromAirports && filteredFromAirports.map(a => {
                                    return <li onClick={() => handleSelection("from", a)} >
                                        <div className={Style.suggestion_item} >
                                            <span className={Style.airport_code} > {a.iata}  </span>
                                            <span className={Style.airport_loc} >
                                                <p className={Style.airport_name} >
                                                    {a.name.slice(0, 10)}
                                                </p>
                                                <p className={Style.airport_city} >
                                                    {a.city}, {a.country}
                                                </p>
                                            </span>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>}
                </div>
                <div className={Style.input_container} >
                    <input value={toAirportValue && `${toAirportValue.iata}, ${toAirportValue.city}, ${toAirportValue.country}`} onChange={(e) => handleFilter(e, "to")} type="search" placeholder="Destination" />
                    {toSuggestionVisible && <div ref={toDivRef} className={Style.filtered_list_container} >
                        <ul className={Style.list_container}>
                            {
                                filteredToAirports && filteredToAirports.map(a => {
                                    return <li onClick={() => handleSelection("to", a)} >
                                        <div className={Style.suggestion_item} >
                                            <span className={Style.airport_code} >
                                                {a.iata}
                                            </span>
                                            <div className={Style.airport_loc} >
                                                <p className={Style.airport_name} >
                                                    {a.name.slice(0, 25)}
                                                </p>
                                                <p className={Style.airport_city} >
                                                    {a.city}, {a.country}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>}
                </div>
                <div className={Style.input_container} >
                    <input ref={fromDate} type="date" />
                </div>
                {selectedType === "Round Trip" && <div className={Style.input_container} >
                    <input ref={toDate} type="date" />
                </div>}
                <div className={Style.action_container} >
                    <button type="submit" > Search </button>
                </div>
            </form>
        </div>
    </div>
}


export default SearchForm;