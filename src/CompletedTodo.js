import React, { Component } from 'react';
import './CompletedTodo.css';

class CompletedTodo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id={this.props.id} className="list-item">
                <input id={"checkbox-" + this.props.id} onClick={this.props.updateTask} className="list-checkbox" type="checkbox" defaultChecked="checked" value={this.props.completed} />
                <p className="list-description-completed">{this.props.text}</p>
                <input id={"delete-" + this.props.id} onClick={this.props.deleteTask} className="list-deletebutton" type="submit" value="Delete" />
            </div>
        );
    }
}

export default CompletedTodo;
