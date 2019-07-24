import React, { Component } from "react";

class Public extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    fetch("/public")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not okay");
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  render() {
    return (
      <div>
        <p> Public </p>
        {this.state.message}
      </div>
    );
  }
}

export default Public;
