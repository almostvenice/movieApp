import React from 'react';

const ListGroup = ({        //destructuring all props passed thru the function
    items, 
    textProperty, 
    valueProperty, 
    onItemSelect, 
    selectedItem
}) => {


    return ( 
        <ul className="list-group">
            { items.map(item =>                 //for each item in items map thru then make it into an <li>..<li/> 
                <li
                style={{cursor: 'pointer'}}
                onClick={() => onItemSelect(item)} 
                key={item[valueProperty]}       //key = that item's "_id" given by defaultProps valueProperty
                className={ item === selectedItem ? 'list-group-item active' : 'list-group-item'}>
                    {item[textProperty]}        {/* Item 'name' given by defaultProps textProperty */}
                </li>)}
        </ul>
     );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
export default ListGroup;