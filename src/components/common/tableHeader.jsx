import React, { Component } from 'react';

class TableHeader extends Component { 
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

    renderSortIcon = column => {
        const {sortColumn} = this.props;

        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }
    render() { 
        return (
            <thead>
                <tr>
                    { this.props.columns.map(column => ( 
                    <th 
                        className='clickable'
                        key={column.path || column.key} 
                        onClick={() => this.raiseSort(column.path)}
                    >
                        {column.label} {this.renderSortIcon(column)} {/* creates the label of the column and the icon for the sort */}
                    </th>
                    ))}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;