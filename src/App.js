import React, { Component } from 'react';
import Projects from './Components/Projects';
import Todos from './Components/Todos';
import uuid from 'uuid';
import AddProjects from './Components/AddProject';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    };
  }

  getTodos() {
    $.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      success: function(data) {
        this.setState({ todos: data }, () => {});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'E-commerce Shopping Chart',
          category: 'Web Design'
        }
      ]
    });
  }
  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }
  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({ projects: projects });
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({ projects: projects });
  }
  render() {
    return (
      <div className="App">
        <AddProjects addprojects={this.handleAddProject.bind(this)} />
        <Projects
          projects={this.state.projects}
          onDelete={this.handleDeleteProject.bind(this)}
        />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
