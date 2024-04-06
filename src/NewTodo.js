import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
        return (
            <div id="insert-item">
                <form onSubmit={this.props.addTask} id="insert-form">
                    <input onChange={this.props.onChange} value={this.props.input} id="input-task" type="text" placeholder="Type your task here..." />
                    <button id="submit-button" type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default NewTodo;
