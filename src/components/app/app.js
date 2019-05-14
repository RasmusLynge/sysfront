import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { HomePage, FlightPage } from "../pages"

import './app.css'

class App extends Component {

    state = {
        departure: '',
        destination: '',
        depart: new Date(),
        passengers: 1,
        adults: 1,
        children: 0,
        infant: 0
    }

startSearch = (state) => {
    this.setState({ ...state })
}

render() {
    return (
        <>
            <Route path={process.env.PUBLIC_URL + '/'}
                render={() => {
                    return (
                        <HomePage startSearch={this.startSearch} />
                    )
                }}
                exact />
            <Route path={process.env.PUBLIC_URL + '/flight/'}
                render={() => {
                    return (
                        <FlightPage data={this.state} startSearch={this.startSearch} />
                    )
                }}

            />
            <Route path={process.env.PUBLIC_URL + '/flight/'}
                render={() => {
                    return (
                        <FlightPage data={this.state} startSearch={this.startSearch} />
                    )
                }}

            />
        </>
    )
}
}


export default App