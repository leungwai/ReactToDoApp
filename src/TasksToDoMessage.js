import React, { Component } from 'react';
import './TasksToDoMessage.css';

class TasksToDoMessage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.list.length === 0) {
            return (
                <p className ="no-items-message">No items to do! Add a task above!</p>
            );
            
        } else {
            return (
                <p className ="description-message">When the task has been completed, click the checkbox. You can scroll on the task to view the entire task description.</p>
            );
        }
    }
}

export default TasksToDoMessage;
