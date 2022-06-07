import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const {itemsCount, pageSize, onPageChange, currentPage } = props; //destructuring props of pagination

    const pagesCount = Math.ceil(itemsCount / pageSize); //pagesCount = roundedUp(x / y) because it would = 0.9 otherwise
    if (pagesCount === 1) return null; //if there is only 1 page, dont show the pagination component
    const pages = _.range(1, pagesCount + 1) //range 1 thru 4 so it includes pagesCount which is #3 (similar to python range method)

    return ( 
    <nav>
        <ul className="pagination">
            {pages.map(page => ( //take the amount of pages and for each on make a page that includes...
                <li 
                    key={page} //key with each page #
                    className={ page === currentPage ? 'page-item active' : 'page-item'}> {/* if they are qual this will be the current active page */}
                    <a 
                        className="page-link" 
                        onClick={() => onPageChange(page)}>{page} {/* run the onPageChange prop which triggers this.handlePageChange in movies.jsx */}
                    </a>
                </li>
            ))}
        </ul>
    </nav> 
    );
};

Pagination.propTypes = {                            //checks if each prop was passed and if it was the correct type
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.number.isRequired, 
    currentPage: PropTypes.func.isRequired
}
 
export default Pagination;