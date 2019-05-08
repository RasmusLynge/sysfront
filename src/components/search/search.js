import React, {Component} from 'react'
import DatePicker from "react-datepicker"
import {Popover} from "../popover"
import {withRouter} from "react-router-dom"
import FetchFlights from "../result/FetchFlights"


import "react-datepicker/dist/react-datepicker.css"
import './search.css'

class Search extends Component {
    state = {
        departure: '',
        destination: '',
        depart: new Date(),
        passengers: 1,
        adults: 0,
        children: 0,
        infant: 0,
        popoverPassengers: false,
        flightData: [],
    }

    fetchFlights = async() => {
        const url = FetchFlights.directions(
            this.state.departure,
            this.state.destination,
            this.state.depart
          );
          const flights = await FetchFlights.fetchData(url);
          this.setState({flightData: flights});
    }

    departureChange = (e) =>{
        const departureInput = e.target.value;
        this.setState({departure: departureInput})
    }


    destinationChange = (e) =>{
        const destinationInput = e.target.value;
        this.setState({destination: destinationInput})
    }

    departDateChange = (date) =>{
        this.setState({depart: date})
    }

    passengersChange = (e) =>{
        const passengersInput = e.target.value;
        this.setState({passengers: passengersInput})
    }

    handleClick = async (e) => {
        e.preventDefault()
        await this.fetchFlights()
        console.log(this.state.flightData)
        this.props.startSearch(this.state)
        if(this.state.destination.length > 1 && this.state.departure.length > 1) {
            this.props.history.push(`${process.env.PUBLIC_URL}/flight/${this.state.departure}`)
        }
    }

    popoverClick = () => {
        this.setState(prevState => ({ popoverPassengers: !prevState.popoverPassengers }))
    }

    popoverChange = (adults, children, infant) => {
        this.setState({adults, children, infant, passengers: adults + children + infant})
    }

    swapHandler = (e) => {
        e.preventDefault()
        const departureData = this.state.departure
        const destinationData = this.state.destination
        this.setState({departure: destinationData, destination: departureData})

    }

    render() {
        const textInputPassengers = `${this.state.passengers} Traveller`
        return (
            <div className="section-search">
                <ul className="search-type">
                    <li className="active">Flights</li>
                </ul>
                <div className="search-box">
                    <span className="type-way">One Way</span>
                    <form className="grid">
                        <div className="departure-block">
                            <input type="text" placeholder="Select departure" onChange={this.departureChange} value={this.state.departure}/>
                            <button className="swap-button" onClick={this.swapHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                    <path d="M9.1 11.2V9.5H15c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H9.1V4.8c0-.6-.6-.9-1.1-.7L2.4 7.3c-.5.3-.5 1 0 1.3L8 11.9c.5.3 1.1-.1 1.1-.7zm12.5 4.1L16 12.1c-.5-.3-1.1.1-1.1.7v1.7H9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.9v1.7c0 .6.6.9 1.1.7l5.6-3.2c.5-.3.5-1.1 0-1.4z"></path>
                                </svg>
                            </button>
                        </div>

                        <div>
                            <input type="text" placeholder="Select destination" onChange={this.destinationChange} value={this.state.destination}/>
                        </div>
                        <div className="date-block">
                            <DatePicker selected={this.state.depart} onChange={this.departDateChange}/>
                            <img className="date-calendar" src="https://img.icons8.com/ios/50/000000/calendar-11.png" alt="calendar" />
                        </div>
                        <div>
                            <input type="text" placeholder="Passengers"
                                   onChange={this.passengersChange}
                                   className="input-passengers"
                                   onClick={this.popoverClick}
                                   value={textInputPassengers}
                                   readOnly="readOnly"


                            />
                            {
                                this.state.popoverPassengers ? <Popover popoverChange={this.popoverChange}/>:null
                            }
                        </div>

                        <button className="button-search" onClick={this.handleClick}>
                                Search
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Search)