import React, { Component } from "react";

export class FetchEmployee extends Component {
  static displayName = FetchEmployee.name;

  constructor(props) {
    super(props);
    this.state = { employees: [], loading: true };
    this.getEmployeeData();
  }

  getEmployeeData() {
    fetch("api/Employee")
      .then(response => response.json())
      .then(data => {
        this.setState({ employees: data, loading: false });
      });
  }

  handleEdit = id => {
    this.props.history.push("/AddUpdate/" + id);
  };

  handleCreate = id => {
    this.props.history.push("/AddUpdate");
  };

  // Handle Delete request for an employee
  handleDelete = id => {
    if (window.confirm("Do you want to delete employee with Id: " + id)) {
      //if (!confirm("Do you want to delete employee with Id: " + id)) return;
      fetch("api/Employee/" + id, {
        method: "delete"
      }).then(data => {
        this.setState({
          employees: this.state.employees.filter(rec => rec.id !== id)
        });
      });
    } else return;
  };

  FetchEmployeeData() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Department</th>
            <th>Gender</th>
            <th>
              <button
                onClick={() => this.handleCreate()}
                className="btn btn-primary btn-sm"
              >
                Add Employee
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.city}</td>
              <td>{employee.department}</td>
              <td>{employee.gender === 2 ? "Male" : "Female"}</td>
              <td>
                <button
                  onClick={() => this.handleEdit(employee.id)}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </button>
                |
                <button
                  onClick={() => this.handleDelete(employee.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.FetchEmployeeData()
    );

    return (
      <div>
        <h1>Employee List</h1>
        <p>
          This component demonstrates fetching employee data from the server.
        </p>

        {contents}
      </div>
    );
  }
}
