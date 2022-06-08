import React, {Component} from 'react';
import Like from './common/like';

class MoviesTable extends Component {
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;   //if the path is different, meaning a different column then set the new path to that path
            sortColumn.order = 'asc'; //make the sort order ascending since its the first click on that column
        }
        this.props.onSort(sortColumn);
    }
    render() { 
    const {movies, onDelete, onLike} = this.props;
    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => this.raiseSort('title')}>Title</th>
                    <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
                    <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
                    <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
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
                            onClick={() => onLike(movie)}
                        /> 
                    </td>
                    <td>
                        <button 
                            onClick={() => onDelete(movie)} 
                            className="btn btn-danger btn-sm">Delete
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
     );
    }
}
 
export default MoviesTable;