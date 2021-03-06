import React, { Component } from "react";
import { Counter } from "./Counter";
export class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 5 },
      { id: 3, value: 0 },
      { id: 4, value: 6 },
      { id: 5, value: 7 }
    ]
  };
  render() {
    return (
      <div>
        {this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value}>
            <h1>Title</h1>
          </Counter>
        ))}
      </div>
    );
  }
}
