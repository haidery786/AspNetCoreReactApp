import React, { Component } from "react";

export class Counter extends Component {
  static displayName = Counter.name;

  state = { value: this.props.value };

  incrementCounter = () => {
    this.setState({
      value: this.state.value + 1
    });
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  render() {
    console.log("Props", this.props);

    return (
      <div>
        <span className={this.getBadgeClasses()}>
          {" "}
          {this.state.value === 0 ? <span>Zero</span> : this.state.value}
        </span>
        <button
          onClick={this.incrementCounter}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
      // <div>
      //   <h1>Counter</h1>

      //   <p>This is a simple example of a React component.</p>

      //   <p>
      //     Current count: <strong>{this.state.currentCount}</strong>
      //   </p>

      //   <button className="btn btn-primary" onClick={this.incrementCounter}>
      //     Increment
      //   </button>
      // </div>
    );
  }
}
