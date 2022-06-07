import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) { //takes {allMovies array}, {currentPageNumber}, {itemsPerPage}
    const startIndex = (pageNumber - 1) * pageSize; //currentPage(i.e 1 - 1 = 0) * pagesize (0 * 4 = 0)
    return _(items)
        .slice(startIndex) // slice from index of 0
        .take(pageSize)    // take up to but not including index 4
        .value();          //send these items back as the value to show in that page. i.e allMovies[0] to allMovies[3]
                           //#2 page would be allMovies[4] to allMovies[7]
                           //#3 page would be allMovies[8]
}