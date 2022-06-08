import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import _, { spread } from 'lodash';
import MoviesTable from './moviesTable';


export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}

    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id); //get all the movies except the movie with the ID that was passed
        this.setState({movies: movies})                 // if they key and value are the same you can pass ({ movies })
    };

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres'}, ...getGenres()] //set _id to empty string because All Generes has no ID
        this.setState({ movies: getMovies(), genres: genres})
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
        this.setState({selectedGenre: genre, currentPage: 1}) //needs current page for when you are on page 2+ and switch to a genre with only 1 page
    }

    handleSort = path => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;   //if the path is different, meaning a different column then set the new path to that path
            sortColumn.order = 'asc'; //make the sort order ascending since its the first click on that column
        }
        this.setState({ sortColumn }); //passing the path/column and order of sort 'ascending'

    }
    render() {
        const {length: count} = this.state.movies;      //destructuring to get the count of movies.length
        const {
            pageSize, 
            currentPage, 
            movies: allMovies, 
            genres, 
            selectedGenre, 
            sortColumn
        } = this.state;     //destructuring to get the state props

        if (count === 0) return <p>There are no movies in the database</p>  //if no movies are in the database (movies.length === 0)
        
        //if selectedGenre is truthy, filter allMovies and return any movie with the identical genere ID. else return all movies if there is no selectedGenre
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        
        const movies = Paginate(sorted, currentPage, pageSize)
        
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-3">
                        <ListGroup                              //ListGroup props
                            items={genres} 
                            onItemSelect={this.handleGenreSelect} // runs first
                            selectedItem={selectedGenre}          //runs after onItemSelect. now the selectedItem is the current clicked Genere
                        />
                    </div>
                    <div className="col">
                        <p>Showing {filtered.length} movies in the database</p>
                        <MoviesTable
                            movies={movies}
                            onLike={this.handleLike}
                            onDelete={this.onDelete}
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
            </React.Fragment>
        )
    };

}