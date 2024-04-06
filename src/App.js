import React, { Component } from 'react';
import './App.css';
import NewTodo from './NewTodo';
import Todo from './Todo';
import CompletedTodo from './CompletedTodo';
import TasksToDoMessage from './TasksToDoMessage';
import CompletedTasksMessage from './CompletedTasksMessage';
import SortList from './SortList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      input: "",
      todosNotCompleted: [],
      todosCompleted: []
    }

    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortDateAscending = this.sortDateAscending.bind(this);
    this.sortDateDescending = this.sortDateDescending.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  sortAlphabetically(event) {
    event.preventDefault();

    let newTodosNotCompleted = this.state.todosNotCompleted;
    let newTodosCompleted = this.state.todosCompleted;

    newTodosNotCompleted.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });

    newTodosCompleted.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });

    this.setState({ todosCompleted: newTodosCompleted, todosNotCompleted: newTodosNotCompleted });
    // console.log("Finished sorting alphabetically");
  }

  sortDateAscending(event) {
    event.preventDefault();

    let newTodosNotCompleted = this.state.todosNotCompleted;
    let newTodosCompleted = this.state.todosCompleted;

    // I learned how to convert US-Locale Date to UNIX time string to compare its numerical values by
    // using Date.parse() from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse 
    newTodosNotCompleted.sort(function (a, b) {
      return Date.parse(a.created_at) - Date.parse(b.created_at);
    });

    newTodosCompleted.sort(function (a, b) {
      return Date.parse(a.created_at) - Date.parse(b.created_at);
    });

    this.setState({ todosCompleted: newTodosCompleted, todosNotCompleted: newTodosNotCompleted });
    // console.log("Finished sorting by oldest to newest date");
  }

  sortDateDescending(event) {
    event.preventDefault();

    let newTodosNotCompleted = this.state.todosNotCompleted;
    let newTodosCompleted = this.state.todosCompleted;

    // I learned how to convert US-Locale Date to UNIX time string to compare its numerical values by
    // using Date.parse() from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse 
    newTodosNotCompleted.sort(function (a, b) {
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });

    newTodosCompleted.sort(function (a, b) {
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });

    this.setState({ todosCompleted: newTodosCompleted, todosNotCompleted: newTodosNotCompleted });
    // console.log("Finished sorting by newest to oldest date");
  }

  onChange(event) {
    event.preventDefault();
    this.setState({
      input: event.target.value
    });
  }

  addTask(event) {
    event.preventDefault();
    const self = this;
    let sendTask = { text: this.state.input };

    let sendXhttp = new XMLHttpRequest();

    sendXhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.setState({
          input: ""
        });
        self.componentDidMount();
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    };

    sendXhttp.open("POST", "https://cse204.work/todos", true);

    sendXhttp.setRequestHeader("Content-type", "application/json");
    sendXhttp.setRequestHeader("x-api-key", "3d7ecf-63d1af-6a0edd-546ea6-367c01");
    sendXhttp.send(JSON.stringify(sendTask));
    // console.log("Finished adding task");
  }

  updateTask(event) {
    event.preventDefault();
    const self = this;
    let checkBoxTaskId = event.target.id.substring(9);
    let updateLink = "https://cse204.work/todos/" + checkBoxTaskId;

    var booleanToSubmit = true;
    if (event.target.value === "true") {
      booleanToSubmit = false;
    }
    var sendUpdate = { completed: booleanToSubmit };

    let updateXhttp = new XMLHttpRequest();

    updateXhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.componentDidMount();

      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    };

    updateXhttp.open("PUT", updateLink, true);

    updateXhttp.setRequestHeader("Content-type", "application/json");
    updateXhttp.setRequestHeader("x-api-key", "3d7ecf-63d1af-6a0edd-546ea6-367c01");
    updateXhttp.send(JSON.stringify(sendUpdate));
    // console.log("Finished updating task");
  }

  deleteTask(event) {
    event.preventDefault();
    const self = this;

    let deleteTaskId = event.target.id.substring(7);
    let deleteLink = "https://cse204.work/todos/" + deleteTaskId;

    let deleteXhttp = new XMLHttpRequest();

    deleteXhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.componentDidMount();

      } else if (this.readyState === 4) {
        console.log("error");
      }
    };

    deleteXhttp.open("DELETE", deleteLink, true);
    deleteXhttp.setRequestHeader("x-api-key", "3d7ecf-63d1af-6a0edd-546ea6-367c01");
    deleteXhttp.send();
    // console.log("Finished deleting task");
  }

  componentDidMount() {
    const self = this;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var todoItemsArray = JSON.parse(this.responseText);

        // I learned how to convert US-Locale Date to UNIX time string to compare its numerical values by
        // using Date.parse() from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse 
        todoItemsArray.sort(function (a, b) {
          return Date.parse(a.created_at) - Date.parse(b.created_at);
        });

        self.setState({ todos: todoItemsArray, todosCompleted: [], todosNotCompleted: [] });
        todoItemsArray.map((toDoItem) => {
          if (toDoItem.completed === true) {
            self.setState({ todosCompleted: [...self.state.todosCompleted, toDoItem] });
          } else {
            self.setState({ todosNotCompleted: [...self.state.todosNotCompleted, toDoItem] });
          }
        });
      }
    };

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "3d7ecf-63d1af-6a0edd-546ea6-367c01");
    xhttp.send();
    // console.log("Finished retrieving items from API");
  }

  render() {
    return (
      <div>

        {/* Header bar */}
        <div className="header-bar">
          <div className="header-left">
            <p id="main-title">LW's React ToDo App</p>
          </div>

          <div className="header-right">
            <input id="settings" type="image" src="fontawesome-free-5.15.3-web/svgs/solid/cog.svg" alt="settings" />
            <input id="user-profile" type="image" src="fontawesome-free-5.15.3-web/svgs/solid/user-alt.svg"
              alt="user-profile" />
            <input id="search-icon" type="image" src="fontawesome-free-5.15.3-web/svgs/solid/search.svg"
              alt="search-icon" />
            <input id="search-box" type="text" placeholder="Search for items..." />
          </div>
        </div>

        <div id="content">
          <NewTodo addTask={this.addTask} onChange={this.onChange} input={this.state.input} />

          <div id="list">
            {/* Sort ToDo List */}
            <p className="list-label">Sort ToDo List</p>
            <SortList alphabetically={this.sortAlphabetically} dateAscending={this.sortDateAscending} dateDescending={this.sortDateDescending} />

            {/* <!-- Tasks To Do --> */}
            <p className="list-label">Tasks To Do</p>
            <div id="to-do-list">
              <TasksToDoMessage list={this.state.todosNotCompleted} />
              {this.state.todosNotCompleted.map((todo) =>
                <Todo key={todo.id} updateTask={this.updateTask} deleteTask={this.deleteTask} id={todo.id} completed={todo.completed} text={todo.text} />
              )}
            </div>

            {/* <!-- Completed tasks --> */}
            <p className="list-label">Completed Tasks</p>
            <div id="completed-list">
              <CompletedTasksMessage list={this.state.todosCompleted} />
              {this.state.todosCompleted.map((todo) =>
                <CompletedTodo key={todo.id} updateTask={this.updateTask} deleteTask={this.deleteTask} id={todo.id} completed={todo.completed} text={todo.text} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
