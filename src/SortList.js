import React, { Component } from 'react';
import './SortList.css';

class SortList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="sort-list">
                <p className="description-message">The ToDo List is automatically sorted by date created (oldest tasks first). Choose another way to sort the list!</p>
                <button onClick={this.props.alphabetically} className="sort-button">Alphabetically</button>
                <button onClick={this.props.dateAscending} className="sort-button">Oldest Tasks First</button>
                <button onClick={this.props.dateDescending} className="sort-button">Newest Tasks First</button>
            </div>
        );
    }
}

export default SortList;
