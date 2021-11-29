import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        let myStyle = {
            textDecoration: "none",
            marginLeft: "30px",
            color: "black"
        }
        
        return (
            <div style={{ display: 'flex', backgroundColor: 'hotpink', padding: '10px', alignItems: 'center' }}>
                <Link to="/" style={myStyle}>
                    <h1 style={myStyle}>Movies-app</h1>
                </Link>
                <Link to="/favourites" style={myStyle}>
                    <h2 >Favourites</h2>
                </Link>
            </div>
        )
    }
}
