"use client"
import Style from "./FlightSearch.module.css";
import airlines from "../../../../lib/data/airlines.json";
import airportsDB from "../../../../lib/data/airports.json";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/_components/LoadingComponent/page";
const Flights = ({ params, searchParams }) => {

    const [popularFilters, setPopularFilters] = useState([
        { name: "Non Stop", enabled: false },
        { name: "IndiGo", enabled: false },
        { name: "Morning Departures", enabled: false },
        { name: "Late Departures", enabled: false },
        { name: "Air India", enabled: false },
        { name: "AfterNoon Departures", enabled: false },
        { name: "1 Stop", enabled: false }
    ]);

    const filterContainerRef = useRef(null);
    const [priceRange, setPriceRange] = useState(0);
    const applyFilter = () => {
        popularFilters.forEach(a => {
            if (a.enabled === true && a.name === "Non Stop") {
                console.log(a, "FILTER ");
                let newFlightsArr = flightList.filter((a) => {
                    a.itineraries.forEach(b => {
                        if (b.segments.length <= 2) {
                            return a;
                        }
                    })
                });
                console.log(newFlightsArr, "Filtered Data");
                setFlightList(newFlightsArr);
            }
        });
    }

    let filterLength = 5;
    let [flightList, setFlightList] = useState([]);
    const [filterDisplay, setFilterDisplay] = useState(false);
    let query = {
        "currencyCode": "INR",
        "originDestinations": [
            {
                "id": "1",
                "originLocationCode": searchParams.source,
                "destinationLocationCode": searchParams.destination,
                "departureDateTimeRange": {
                    "date": searchParams.departureDate
                }
            }
        ],
        "travelers": [
            {
                "id": "1",
                "travelerType": "ADULT"
            }
        ],
        "sources": [
            "GDS"
        ],
        "searchCriteria": {
            "maxFlightOffers": 50,
            "flightFilters": {
                "cabinRestrictions": [
                    {
                        "cabin": "ECONOMY",
                        // "coverage": "MOST_SEGMENTS",
                        "originDestinationIds": [
                            "1"
                        ]
                    }
                ]
            }
        }
    }
    useEffect(() => {
        const script = document.createElement('script');
        const analyticsScript = document.createElement('script');

        // Set the async attribute
        script.async = true;
        analyticsScript.async = true;

        // Set the script source (e.g., Google Ads)
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16665917801';
        analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-SXSL1KRYT4"

        // Append the script to the document head
        document.head.appendChild(script);
        document.head.appendChild(analyticsScript);

        // Add the inline script for gtag configuration
        const inlineScript = document.createElement('script');
        const analyticsInlineScript = document.createElement('script');

        inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16665917801');
    `;

        analyticsInlineScript.innerHTML = `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SXSL1KRYT4');
        `

        // Append the inline script to the document head
        document.head.appendChild(inlineScript);
        document.head.appendChild(analyticsInlineScript);

        // Cleanup: remove the scripts when the component is unmounted

        try {
            fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${searchParams.token}` }, body: JSON.stringify(query) }).then(ressponse => ressponse.json()).then(json => {
                let newData = json.data.map(a => {
                    a.itineraries.forEach(b => {
                        b.segments.forEach(segment => {
                            segment.airline = airlines[segment.carrierCode];
                            segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                            segment.departure.airport = airportsDB[segment.departure.iataCode];
                        });
                    });

                    return a;
                });
                setFlightList(newData);
            })
        } catch (err) {
            console.log(err);
        };

        return () => {
            document.head.removeChild(script);
            document.head.removeChild(inlineScript);
            document.head.removeChild(analyticsScript);
            document.head.removeChild(analyticsInlineScript)
        };
        // applyFilter();
    }, []);


    // console.log(flightList, "FLIGHTLIST");

    const convertToLocalDate = (date) => {
        let newDate = new Date(date);
        return newDate.toLocaleDateString();
    }

    const getTimeFromDate = (date) => {
        let newDate = new Date(date);
        return `${newDate.getHours()}:${newDate.getMinutes()}`;
    }

    function extractTime(ptString) {
        // Define a regular expression to match hours and minutes
        const regex = /PT(\d+H)?(\d+M)?/;

        // Use the regex to extract hours and minutes
        const matches = ptString.match(regex);

        // Initialize hours and minutes
        let hours = '00';
        let minutes = '00';

        if (matches) {
            // Extract hours if present
            if (matches[1]) {
                hours = matches[1].replace('H', '');
            }

            // Extract minutes if present
            if (matches[2]) {
                minutes = matches[2].replace('M', '');
            }

            // Ensure hours and minutes are in two-digit format
            hours = hours.padStart(2, '0');
            minutes = minutes.padStart(2, '0');
        }

        // Return the formatted time in HH:MM
        return `${hours}:${minutes}`;
    }

    const toggleEnabled = (index) => {
        console.log(index, "index");
        let newArr = popularFilters.map((a, i) => {
            console.log(i, "I");
            if (i === index) {
                console.log(a);
                a.enabled = !a.enabled;
                return a;
            } else {
                return a;
            }
        });
        console.log(newArr);
        setPopularFilters(newArr);
    };

    return <div className={Style.parent_container} >
        {flightList.length <= 0 && <Loading />}
        <div className={Style.form_container} >
            <div className={Style.form_div} >
                <form>
                    <div className={Style.input_container} >

                        <select>
                            <option> One Way </option>
                            <option>Return</option>
                        </select>
                    </div>
                    <div className={Style.input_container} >
                        <input value={searchParams.source} type="text" placeholder="Origin" />
                    </div>
                    <div className={Style.input_container} >
                        <input value={searchParams.destination} type="text" placeholder="Destination" />
                    </div>
                    <div className={Style.input_container} >
                        <input value={searchParams.departureDate} type="date" placeholder="Origin" />
                    </div>
                    <div className={Style.input_container} >
                        <input type="date" placeholder="Origin" />
                    </div>
                    <div className={Style.action_container} >
                        <button className={Style.search_btn} > Search </button>
                    </div>
                </form>

            </div>
        </div>
        <div className={Style.searchpage_container} >
            <div className={Style.main_container} >
                <div className={Style.inner_container} >
                    <div onClick={() => { if (!filterDisplay) { document.getElementById("filter_container_id").style.height = "fit-content"; document.getElementById("filter_container_id").style.padding = "20px"; setFilterDisplay(true) } else { document.getElementById("filter_container_id").style.height = "0"; document.getElementById("filter_container_id").style.padding = "0"; setFilterDisplay(false) } }} className={Style.filter_action_btn} >
                        <p> Select Filters ↓</p>
                    </div>
                    <div id="filter_container_id" className={Style.filter_container} >
                        <div className={Style.filter_parent} >
                            <div className={Style.populae_filter} >
                                <p className={Style.filter_heading} >Popular Filters</p>
                                <div className={Style.filter_box} >
                                    <ul>
                                        {popularFilters.map((a, index) => {
                                            return <li>
                                                <input type="checkbox" onChange={() => toggleEnabled(index)} checked={a.enabled} /> {a.name}
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={Style.price_filter} >
                                <p className={Style.filter_heading} >One Way Price</p>
                                <div className={`${Style.filter_box} ${Style.flex_container}`} >
                                    <input type="range" max={20000} min={0} value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
                                    <div className={Style.price_value_container} >
                                        <p className={Style.small_text} >₹ 40000</p> <p className={Style.small_text} > ₹20000 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.flights_container}  >
                        <div className={Style.flights_text} ><h1  >Flights from {flightList.length > 0 && flightList[0].itineraries[0].segments[0].departure.airport.city} to  {flightList.length > 0 && flightList[0].itineraries[0].segments[0].arrival.airport.city}</h1></div>
                        {
                            flightList && flightList.map(a => {
                                return <div className={Style.flight_details_container} >
                                    {a.itineraries.map(b => {
                                        return <div className={Style.flight_container} >
                                            <div className={Style.airline_info} >
                                                <img height={40} width={40} src={b.segments[0].airline.logo} />
                                                {b.segments[0].airline && <p>{b.segments[0].airline.name}  </p>}
                                            </div>
                                            <div className={Style.flightSchedule_container} >
                                                <div className={Style.origin_info} >
                                                    <p className={Style.time_el} >{getTimeFromDate(b.segments[0].departure.at)} </p>
                                                    <p className={Style.small_text} >{b.segments[0].departure.airport ? b.segments[0].departure.airport.city : b.segments[0].departure.iataCode}</p>
                                                    {/* DATE -  {convertToLocalDate(b.segments[0].departure.at)} */}
                                                    {/* AIRPORT complete detail {b.segments[0].departure && <p> Departure: {b.segments[0].departure.airport ? b.segments[0].departure.airport["name"] : ""}, {b.segments[0].departure.airport ? b.segments[0].departure.airport.city : b.segments[0].departure.iataCode}, {b.segments[0].departure.airport ? b.segments[0].departure.airport.country : ""} </p>} */}
                                                </div>
                                                <div className={Style.duration_info} >
                                                    <p className={Style.duration_time} >{extractTime(b.duration)}</p>
                                                    {b.segments.length < 2 ? <div className={Style.stop_line} ></div> : ""}
                                                    <p className={Style.flight_stops} > {b.segments.length < 2 ? "Non Stop" : b.segments.length === 2 ? `Stops: 1` : b.segments.length === 3 ? `Stops 1` : b.segments.length === 4 ? `Stops 2` : b.segments.length === 5 ? `Stops 3` : b.segments.length === 6 ? `Stops 4` : ""} </p>
                                                    {/* Stops: {b.segments.length < 2 ? 0 : b.segments.length === 2 ? 1 : b.segments.length === 3 ? 1 : b.segments.length === 4 ? 2 : b.segments.length === 5 ? 3 : b.segments.length === 6 ? 4 : ""} */}
                                                </div>
                                                <div className={Style.destination_info} >
                                                    <p className={Style.time_el} >{getTimeFromDate(b.segments[b.segments.length - 1].arrival.at)}</p>
                                                    <p className={Style.small_text} >{b.segments[b.segments.length - 1].arrival.airport ? b.segments[b.segments.length - 1].arrival.airport.city : b.segments[b.segments.length - 1].arrival.iataCode}</p>
                                                    {/* {b.segments[b.segments.length - 1].arrival && <p> Arrival: {b.segments[b.segments.length - 1].arrival.airport ? b.segments[b.segments.length - 1].arrival.airport["name"] : ""}, {b.segments[b.segments.length - 1].arrival.airport ? b.segments[b.segments.length - 1].arrival.airport.city : b.segments[b.segments.length - 1].arrival.iataCode}, {b.segments[b.segments.length - 1].arrival.airport ? b.segments[b.segments.length - 1].arrival.airport.country : ""} </p>} */}
                                                    {/* DATE {convertToLocalDate(b.segments[b.segments.length - 1].arrival.at)} */}
                                                </div>
                                                <div className={Style.price_info} >
                                                    <strong>₹ {a.price.total.split(".")[0]}</strong>
                                                    <p className={Style.small_text} > per adult </p>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
}


export default Flights;