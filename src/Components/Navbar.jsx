import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display: 'flex',backgroundColor:'chartreuse', padding:'2px', alignItems:'center'}}>
                <h1>Movie-app</h1>
                <h2 style={{marginLeft:'20px'}}>Favourites</h2>
            </div>
        )
    }
}
