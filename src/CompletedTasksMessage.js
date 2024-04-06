import React, { Component } from 'react';
import './CompletedTasksMessage.css';

class CompletedTasksMessage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.list.length === 0) {
            return (
                <p className="no-items-message">No items completed! Finish a task above!</p>
            );

        } else {
            return (
                <p className="description-message">Uncheck the checkbox to send the task back to the "Tasks To Do" List.</p>
            );
        }
    }
}

export default CompletedTasksMessage;
