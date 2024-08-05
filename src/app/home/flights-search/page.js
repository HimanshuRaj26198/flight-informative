import Style from "./FlightSearch.module.css";
import airlines from "../../../../lib/data/airlines.json";
import airportsDB from "../../../../lib/data/airports.json";
const Flights = async ({ params, searchParams }) => {

    let flightList;
    // let departureDate = searchParams.departureDate.split("-").reverse().join("-");
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
    // console.log(query, "QUERY");
    try {
        let response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${searchParams.token}` }, body: JSON.stringify(query) });
        // console.log(response)
        let json = await response.json();
        json = await json.data.map(a => {
            a.itineraries.forEach(b => {
                b.segments.forEach(segment => {
                    segment.airline = airlines[segment.carrierCode];
                    segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                    segment.departure.airport = airportsDB[segment.departure.iataCode];
                });
            });

            return a;
        });
        // console.log(json);
        flightList = json;

    } catch (err) {
        console.log(err);
    }


    // console.log(flightList, "FLIGHTLIST");

    const convertToLocalDate = (date) => {
        let newDate = new Date(date);
        return newDate.toLocaleDateString();
    }

    const getTimeFromDate = (date) => {
        let newDate = new Date(date);
        return newDate.toLocaleTimeString();
    }

    return <div className={Style.searchpage_container} >
        <h1>Available Flights</h1>
        <div className={Style.filter_container} >
        </div>
        <div className={Style.flights_container}  >
            {
                flightList && flightList.map(a => {
                    return <div className={Style.flight_details_container} >
                        <div className={Style.name_section} >
                            <p>Duration : {a.duration}</p>
                            {a.itineraries.map(b => {
                                return <div>
                                    {
                                        b.segments.map(segment => {
                                            return <div>
                                                <p>Departure Time : {getTimeFromDate(segment.departure.at)} | {convertToLocalDate(segment.departure.at)}</p>
                                                <p>Arrival Time : {getTimeFromDate(segment.arrival.at)} | {convertToLocalDate(segment.arrival.at)}</p>
                                                {segment.airline && <p> Airline : {segment.airline.name}  </p>}
                                                {segment.departure.airport && <p> Departure: {segment.departure.airport ? segment.departure.airport["name"] : ""}, {segment.departure.airport.city ? segment.departure.airport.city : ""}, {segment.departure.airport.country ? segment.departure.airport.country : ""} </p>}
                                                {segment.arrival.airport && <p> Arrival: {segment.arrival.airport ? segment.arrival.airport["name"] : ""}, {segment.arrival.airport.city ? segment.arrival.airport.city : ""}, {segment.arrival.airport.country ? segment.arrival.airport.country : ""} </p>}
                                                <strong>Price Rs {a.price.total}</strong>
                                            </div>
                                        })
                                    }

                                </div>
                            })}
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}


export default Flights;