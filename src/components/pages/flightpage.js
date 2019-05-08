import React from 'react'
import Navigation from "../navigation"
import Result from "../result"

const FlightPage = (props) => {
    return (
        <>
            <div className="header-result">
                <div className="container">
                    <Navigation/>
                </div>
            </div>
            <div className="main-result">
                <div className="container">
                    <Result data={props.data} startSearch={props.startSearch}/>
                </div>
            </div>
        </>
    )
}
export default FlightPage