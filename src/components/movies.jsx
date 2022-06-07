import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    };
    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres'}, ...getGenres()]
        this.setState({ movies: getMovies(), genres})
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id); //get all the movies except the movie with the ID that was passed
        this.setState({movies: movies})                 // if they key and value are the same you can pass ({ movies })
    };


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
        this.setState({selectedGenre: genre, currentPage: 1}) //needs current page for when you are on page 2+ and switch to a genre with only 1 page
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    render() {
        const {length: count} = this.state.movies;
        console.log(count)      //destructuring to get the count of movies.length
        const {
            pageSize, 
            currentPage, 
            selectedGenre,
            movies: allMovies,
            sortColumn 
        } = this.state;     //destructuring to get the state props

        if (count === 0) return <p>There are no movies in the database</p>  //if no movies are in the database (movies.length === 0)
        
        //if selectedGenre is truthy, filter allMovies and return any movie with the identical genere ID. else return all movies if there is no selectedGenre
        const filtered = 
        selectedGenre && selectedGenre._id 
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);
        
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup                              //ListGroup props
                        items={this.state.genres} 
                        onItemSelect={this.handleGenreSelect} // runs first
                        selectedItem={selectedGenre}          //runs after onItemSelect. now the selectedItem is the current clicked Genere
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies in the database</p>
                    <MoviesTable 
                        movies={movies} 
                        sortColumn={sortColumn}
                        onLike={this.handleLike} 
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination 
                        itemsCount={filtered.length}   //instead of count because now each filtered movies object might have only 1 page of movies                                       //Pagination props
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    };
}

export default Movies;