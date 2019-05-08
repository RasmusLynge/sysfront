import React, {Component} from 'react'
import {Link} from "react-router-dom"
import logo from './img/logo.png'
import logoblack from './img/logo-black.png'
import Popup from 'reactjs-popup'
import './navigation.css'

class Navigation extends Component{
    state = {
        login: '',
        password: '',
        authorized: false,
        loginForm: false
    }

    loginClick = () => {
        this.setState({ loginForm: true })
    }

    closeLogin = () => {
        this.setState({ loginForm: false })
    }

    loginCheck = () => {
        if(this.state.login === 'admin' && this.state.password === 'admin'){
            this.setState({ loginForm: false, authorized: true })
        }
    }

    render() {
        return (
            <div className="grid top-nav">
                <div className="logo">
                    <Link to={process.env.PUBLIC_URL + "/"}><img src={logo} alt=""/></Link>
                </div>
                <nav>
                    <ul className="nav-header">
                        {
                            this.state.authorized ? <li onClick={()=>this.setState({authorized: false})}>Sign out</li> : <li onClick={this.loginClick}>Login</li>
                        }
                        <Popup
                            open={this.state.loginForm}
                            closeOnDocumentClick
                            onClose={this.closeLogin}
                        >
                            <div className="authorize-popup">
                                <div className="authorize-content">
                                    <div className="logo logo-black">
                                        <Link to={process.env.PUBLIC_URL + "/"}><img src={logoblack} alt=""/></Link>
                                    </div>
                                    <div className="authorize-title">
                                        Login in to Your Accont
                                    </div>
                                    <input type="text" placeholder="for test type admin" onChange={(e)=> {this.setState({login: e.target.value})}}/>
                                    <input type="password" placeholder="for test type admin" onChange={(e)=> {this.setState({password: e.target.value})}}/>
                                    <div className="authorize-actions grid">
                                        <button className="login-button" onClick={this.loginCheck}>Login to your account</button>
                                        <button className="login-button login-facebook" onClick={this.loginCheck}>Login with Facebook</button>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                        <li><Link to={process.env.PUBLIC_URL + "/"}>Flights</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }

}

export default Navigation