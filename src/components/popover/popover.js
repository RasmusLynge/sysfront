import React, {Component} from 'react'
import './popover.css'

class Popover extends Component {
    state = {
        adults: 1,
        children: 0,
        infant: 0
    }

    adultChange = (e) => {
        e.preventDefault()
        if(this.state.adults + Number(e.target.value) < 1){
            this.setState({adults: this.state.adults},
                () => this.props.popoverChange(this.state.adults, this.state.children, this.state.infant))
        }
        else {
            this.setState({adults: this.state.adults + Number(e.target.value)},
                () => this.props.popoverChange(this.state.adults, this.state.children, this.state.infant))
        }
    }

    childrenChange = (e) => {
        e.preventDefault()
        if(this.state.children + Number(e.target.value) < 0){
            this.setState({children: this.state.children},
                () => this.props.popoverChange(this.state.adults, this.state.children, this.state.infant))
        }
        else {
            this.setState({children: this.state.children + Number(e.target.value)},
                () => this.props.popoverChange(this.state.adults, this.state.children, this.state.infant))
        }
    }

    infantChange= (e) => {
        e.preventDefault()
        if(this.state.infant + Number(e.target.value) < 0){
            this.setState({infant: this.state.infant},
                () => this.props.popoverChange(this.state.adults, this.state.children, this.state.infant))
        }
        else {
            this.setState({infant: this.state.infant + Number(e.target.value)},
                () => this.props.popoverChange(this.state.adults, this.state.children, this.state.infant))
        }
    }


    render() {
        return (
            <div className="popover-passengers">
                <span className="arrow"></span>
                <div className="adults-block grid">
                    <div className="group-name">
                        <span>{this.state.adults} Adults</span>
                    </div>
                    <div className="button-actions">
                        <button className="button-passengers-plus" onClick={this.adultChange} value="1">+</button>
                        <button className="button-passengers-minus" onClick={this.adultChange} value="-1">-</button>
                    </div>
                </div>
                <div className="adults-block grid">
                    <div className="group-name">
                        <span>{this.state.children} Children 0-12 YRS</span>
                    </div>
                    <div className="button-actions">
                        <button className="button-passengers-plus" onClick={this.childrenChange} value="1">+</button>
                        <button className="button-passengers-minus" onClick={this.childrenChange} value="-1">-</button>
                    </div>
                </div>
                <div className="adults-block grid">
                    <div className="group-name">
                        <span>{this.state.infant} Infant Below 2 YRS</span>
                    </div>
                    <div className="button-actions">
                        <button className="button-passengers-plus" onClick={this.infantChange} value="1">+</button>
                        <button className="button-passengers-minus" onClick={this.infantChange} value="-1">-</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Popover