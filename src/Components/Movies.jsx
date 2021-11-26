import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {

    constructor() {
        super();
        this.state = {
            hover: "",
            pArr : [1],
            currPage: 1,
            movies: []
        }
    }

    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=6a5cc79c1ea0305e23a42fb96ba9f45f&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies: [...data.results]
        })
    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=6a5cc79c1ea0305e23a42fb96ba9f45f&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies: [...data.results]
        })
    }

    handleNextClick = () => {
        let tempArr = [];
        for(let  i = 1; i <= this.state.pArr.length + 1; i++) {
            tempArr.push(i);
        }
        this.setState({
            pArr: [...tempArr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)
    }

    handlePreviousClick = () => {
        if(this.state.currPage !== 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies);
        }
    }

    handlePageClick = (value) => {
        if(value !== this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }


    render() {
        
        return (
            <>
                {this.state.movies.length === 0 ?
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div>
                        <h1 className="text-center">
                            <b>Trending</b>
                        </h1>
                        <div className="movies-list">
                            {
                                this.state.movies.map((movieObj) => (
                                    <div className="card movie-card" onMouseEnter={() => {this.setState({hover: movieObj.id})}} onMouseLeave={() => {this.setState({hover: ""})}}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{height:'100%', width:'100%'}} className="card-img-top banner-img" />
                                        <div className="card-body">
                                            <h1 className="card-title movie-title"> {movieObj.original_title == null ? movieObj.original_name : movieObj.original_title } </h1>
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
                        <div aria-label="Page navigation example" style={{display:"flex", justifyContent:"center"}}>
                        <ul className="pagination">
                            <li className="page-item"><button className="page-link" onClick={this.handlePreviousClick}>Previous</button></li>
                            {
                                this.state.pArr.map( value => (
                                    <button className="page-item"><button className="page-link" onClick = { () => {this.handlePageClick(value)}}>{value}</button></button>
                                ))
                            }
                            <li className="page-item"><button className="page-link" onClick = {this.handleNextClick}>Next</button></li>
                        </ul>
                        </div>
                    </div>
                    
                }
            </>
        )
    }
}
