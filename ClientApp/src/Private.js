import React, { Component } from "react";

class Private extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    console.log(this.props.auth.getAccessToken());
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
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
        <p> Private </p>
        {this.state.message}
      </div>
    );
  }
}

export default Private;
