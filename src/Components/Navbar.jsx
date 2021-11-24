import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display: 'flex',backgroundColor:'hotpink', padding:'10px', alignItems:'center'}}>
                <h1 style={{marginLeft: "20px"}}>Movies-app</h1>
                <h2 style={{marginLeft:'30px'}}>Favourites</h2>
            </div>
        )
    }
}
