import React, { Component } from 'react'
// import {movies} from './getMovies'

export default class Favourites extends Component {

    constructor() {
        super();

        this.state = {
            moviesArr: [],
            genres: [],
            currGenre: "All Genres",
            currSearchText: "",
            limit: 5
        }
    }
    
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]");

        let genre_ids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let temp = [ ];
        
        data.forEach((movieObj) => {
            if(!temp.includes( genre_ids[movieObj.genre_ids[0]] )) {
                temp.push( genre_ids[movieObj.genre_ids[0]] );
            }
        })
        temp.unshift('All Genres')
        this.setState({
            genres: [...temp],
            moviesArr: [...data]
        })

    }

    handleDelete = (movieObj) => {
        // let temp = this.moviesArr.filter(m => m.id !== movieObj.id)
        // this.setState({
        //     moviesArr: [...temp]
        // })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGenre: genre
        })
    }

    sortPopularityAsc = () => {
        let temp = this.state.moviesArr

        temp.sort(function(obj1, obj2) {
            return obj1.popularity - obj2.popularity
        })

        this.setState({
            moviesArr: [...temp]
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.moviesArr
        
        temp.sort(function(obj1, obj2) {
            return obj2.popularity - obj1.popularity
        })

        this.setState({
            moviesArr: [...temp]
        })
    }
    
    sortRatingAsc = () => {
        let temp = this.state.moviesArr
        
        temp.sort(function(obj1, obj2) {
            return obj1.vote_average - obj2.vote_average
        })

        this.setState({
            moviesArr: [...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.moviesArr
        
        temp.sort(function(obj1, obj2) {
            return obj2.vote_average - obj1.vote_average
        })

        this.setState({
            moviesArr: [...temp]
        })
    }

    render() { 
        
        let genre_ids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let filterArr = [];

        if(this.state.currSearchText == '') {
            filterArr = this.state.moviesArr
        }
        else {
            filterArr = this.state.moviesArr.filter((obj) => {
                let title = (obj.original_title == null ? obj.name : obj.original_title)
                title = title.toLowerCase();
                return title.includes(this.state.currSearchText.toLowerCase())
            })
        }

      
        if (this.state.currGenre != "All Genres") {
            filterArr = this.state.moviesArr.filter((obj) => this.state.currGenre ==  genre_ids[obj.genre_ids[0]])
        }

        return (

            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul className="list-group favourite-genres"><h1>Genres</h1>
                            {
                                this.state.genres.map( genre => (
                                    this.state.currGenre === genre ?
                                    <li className="list-group-item" style={{fontWeight: "bolder", color:"white", backgroundColor:"#3d61ff", cursor: "pointer"}}>{genre}</li> :
                                    <li className="list-group-item" style={{fontWeight: "bolder", color:"#3d61ff", backgroundColor:"white", cursor: "pointer"}} onClick={() => this.handleGenreChange(genre)} >{genre}</li> 

                                ))
                            }
                            </ul>
                        </div>
                        <div className="col-9 favourite-table">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currSearchText} onChange={ e => this.setState({currSearchText: e.target.value})}/>
                                <input type="number" className="input-group-text col" placeholder="Rows Count"/>
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Preview</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-sort-up" style={{cursor: "pointer"}} onClick={this.sortPopularityAsc}/>Popularity<i class="fas fa-sort-down" style={{cursor: "pointer"}} onClick={this.sortPopularityDesc}/></th>
                                            <th scope="col"><i class="fas fa-sort-up" style={{cursor: "pointer"}} onClick={this.sortRatingAsc}/>Rating<i class="fas fa-sort-down" style={{cursor: "pointer"}} onClick={this.sortRatingDesc}/></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterArr.map((movieObj) => (
                                            <tr>
                                                <th><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{height:'80%', width:'80%'}} className="card-img-top banner-img" /></th>
                                                <th scope="row">{movieObj.original_title == null ? movieObj.name : movieObj.original_title}</th>
                                                <td>{genre_ids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button type="button" className="btn btn-danger" onClick={ () => this.handleDelete(movieObj)}>DELETE</button></td>
                                            </tr>
                                        ))}            
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
