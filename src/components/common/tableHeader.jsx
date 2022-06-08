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

    render() { 
        return (
            <thead>
                <tr>
                    { this.props.columns.map(column => ( 
                    <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label}</th>
                    ))}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;