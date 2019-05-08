import React from 'react'
import Navigation from "../navigation";
import Search from "../search";

const HomePage = (props) => {
    return (
        <>
            <header>
                <div className="container">
                    <Navigation/>
                    <Search startSearch={props.startSearch}/>
                </div>
            </header>
        </>
    )
}

export default HomePage