import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';


export default class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: []
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id); //get all the movies except the movie with the ID that was passed
        this.setState({movies: movies})                 // if they key and value are the same you can pass ({ movies })
    };

    componentDidMount() {
        this.setState({ movies: getMovies(), genres: getGenres()})
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];          //movies is now a copy of the movies state object
        const index = movies.indexOf(movie);            //index is now the index of that movie inside the movies object
        movies[index] = {...movies[index]};             //movie[index] is now the object of that movie in that particular index
        movies[index].liked = !movies[index].liked;     //switch the liked from true to false or vice-versa
        this.setState({movies})                         //update the state of the new movies onject
        
    };
    
    handlePageChange = page => {
        this.setState({ currentPage: page});            //update the state of the new currentPage to equal the {page} from {onPageChange} from pagination.jsx
    };

    handleGenreSelect = genre => {
        console.log(genre)
    }

    render() {
        const {length: count} = this.state.movies;      //destructuring to get the count of movies.length
        const {pageSize, currentPage, movies: allMovies, genres} = this.state;     //destructuring to get the state props

        if (count === 0) return <p>There are no movies in the database</p>  //if no movies are in the database (movies.length === 0)
            
        
        const movies = Paginate(allMovies, currentPage, pageSize)
        
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-3">
                        <ListGroup 
                            items={genres} 
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <p>Showing {count} movies in the database</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map(movie => (   //map thru the movies array. for each movie create this HTML <tr>...</tr> with a key of {movie._id} from fakeMovieService.js
                                <tr key={movie._id}>                
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like 
                                            liked={movie.liked} 
                                            onClick={() => this.handleLike(movie)}
                                        /> 
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => this.handleDelete(movie)} 
                                            className="btn btn-danger btn-sm">Delete
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination 
                            itemsCount={count} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    };

}