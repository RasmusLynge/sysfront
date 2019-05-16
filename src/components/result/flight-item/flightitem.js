import React, { useState } from "react";
import lufthansaLogo from "./img/lufthansaLogo.png";
import ryanAirLogo from "./img/ryanairLogo.png";
import sasLogo from "./img/sasLogo.png";
import iagLogo from "./img/iagLogo.png";
import errorLogo from "./img/errorLogo.png";
import "./flightitem.css";
import FetchEvents from "../FetchEvents"

// Convert a time in hh:mm format to minutes
function timeToMins(time) {
  var b = time.split(":");
  return b[0] * 60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var h = ((mins / 60) | 0) % 24;
  var m = mins % 60;
  return z(h) + ":" + z(m);
}

// Add two times in hh:mm format
function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) + timeToMins(t1));
}




const FlightItem = ({ e }) => {
  const [eventData, setEventData] = useState([]);
  var logo = errorLogo;

  if (e.airline === "Ryanair Ltd") {
    logo = ryanAirLogo;
  }
  if (e.airline === "International Airlines Group") {
    logo = iagLogo;
  }
  if (e.airline === "Scandinavian Airline") {
    logo = sasLogo;
  }
  if (e.airline === "Lufthansa Group") {
    logo = lufthansaLogo;
  }
  const eventClick = async (e) => {
    const eventArr = await fetchEvents(e);
    setEventData(eventArr);
  }
const EventRender = () => {
  if (eventData.length == 0 ){
    return ""
  } else {
   return <span>Events near destination:<br /><ol>{eventData.map((e, i) => <li key={i}> <p>{e}</p> </li>)} </ol> </span>
  }
}
  const fetchEvents = async (e) => {
    const latitude = e.cordiEnd.split('/')[0];
    const longitude = e.cordiEnd.split('/')[1];
    const kilometerRange = 100;
    const url = FetchEvents.makeurl(
      latitude,
      longitude,
      kilometerRange //km away from the airport 
    );
    console.log(url);
    const events = await FetchEvents.fetchData(url)
    //const jsonarr = JSON.parse(events)
    const arr = []
    Object.keys(events).map(key => {
      const value = events[key]
      arr.unshift(value.title)
    })
    return arr;
  };

  return (
    <div>
      <div className="flight-item grid">
        <div className="left-block__item">
          <div className="head-item">
            <div className="way-item">departure</div>
            <div className="logo-company">
              <img src={logo} alt="" width="90" height="90" />
            </div>
          </div>
        </div>
        <div className="center-block__item">
          <div className="flying-info">
            {e.departureDate} From: {e.startDestination} - To: {e.endDestination}
          </div>
          <div className="flight-line">
            <div className="flight-line__departure">
              <b>Departure</b>
              <span>{e.departureTime}</span>
            </div>
            <div className="divider" />
            <div className="flight-line__arrival">
              <b>Arrival</b>
              <span>{addTimes(e.departureTime, e.duration)}</span>
            </div>
            <div className="divider" />
            <div className="flight-line__time">
              <b>Time</b>
              <span>{e.duration}</span>
            </div>
            <div className="divider" />
            <div className="flight-line__time">
              <b>Seats</b>
              <span>{e.numberOfSeats}</span>
            </div>
          </div>
          <EventRender />
        </div>
        <div className="right-block__item">
          <div className="item-price">{e.price},-</div>
          <button className="select-now">select now</button>
          <br />
          <button className="select-wish">wishlist</button>
          <br />
          <button onClick={() => eventClick(e)} className="select-wish">Look for events near destination (100 km)</button>
          <br />

        </div>

      </div>

    </div>
  );


};


export default FlightItem;
