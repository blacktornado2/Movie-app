import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Movies extends Component {

    constructor() {
        super();
        this.state = {
            hover:"",
            pArr : [1]
        }
    }

    render() {
        let movie = movies.results;
        return (
            <>
                {movies.length === 0 ?
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div>
                        <h1 className="text-center">
                            <b>Trending</b>
                        </h1>
                        <div className="movies-list">
                            {
                                movie.map((movieObj) => (
                                    <div className="card movie-card" onMouseEnter={() => {this.setState({hover: movieObj.id})}} onMouseLeave={() => {this.setState({hover: ""})}}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{height:'100%', width:'100%'}} className="card-img-top banner-img" />
                                        <div className="card-body">
                                            <h1 className="card-title movie-title">{movieObj.original_title}</h1>
                                            {
                                            this.state.hover === movieObj.id && 
                                            <div className="btn-wrapper" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                                <a href="/" className="btn btn-info movie-btn">Add to favourites</a>
                                            </div>
                                            }
                                            
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <nav aria-label="Page navigation example" style={{display:"flex", justifyContent:"center"}}>
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            {
                                this.state.pArr.map(value => (
                                    <li className="page-item"><a className="page-link" href="#">{value}</a></li>
                                ))
                            }
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                        </nav>
                    </div>
                    
                }
            </>
        )
    }
}
