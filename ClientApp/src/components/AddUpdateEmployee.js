import React, { Component } from "react";

class AddUpdateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Add Employee",
      loading: true,
      cityList: [],
      name: "",
      city: "",
      department: "",
      gender: ""
    };
    this.getCityData();

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  getCityData() {
    fetch("api/City")
      .then(response => response.json())
      .then(data => {
        this.setState({ cityList: data, loading: false });
      });
  }

  componentDidMount() {
    this.setEmployeeDetails();
  }

  setEmployeeDetails() {
    var id = this.props.match.params["id"];
    // This will set state for Edit employee
    if (id === "") {
      this.state = { title: "Create Employee", loading: false };
    } else if (id > 0) {
      fetch("api/Employee/" + id)
        .then(response => response.json())
        .then(res => {
          this.setState({
            title: "Edit Employee",
            loading: false,
            name: res.name,
            department: res.department,
            city: res.city,
            gender: res.gender
          });
        });
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/fetch-employee");
  }

  onSubmit(e) {
    e.preventDefault();
    const empObj = {
      Name: this.state.name,
      Department: this.state.department,
      Gender: this.state.gender,
      City: this.state.city
    };
    // Post request for Create employee.
    fetch("api/Employee/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(empObj)
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.history.push("/fetch-employee");
      });
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderCreateNewEmployeeForm()
    );

    return <div>{contents}</div>;
  }

  renderCreateNewEmployeeForm() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>{this.state.title}</h3>
        <div className="row">
          <form onSubmit={this.onSubmit} className="col-md-6">
            <div className="form-group">
              <label>Employee Name: </label>
              <input
                name="empName"
                type="text"
                className="form-control input-md"
                value={this.state.name}
                onChange={this.onChangeName}
                required
              />
            </div>
            <div className="form-group">
              <label>City: </label>
              <select
                className="form-control"
                data-val="true"
                name="City"
                value={this.state.city}
                onChange={this.onChangeCity}
                required
              >
                <option value="">-- Select City --</option>
                {this.state.cityList.map(city => (
                  <option key={city.cityId} value={city.cityName}>
                    {city.cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Department: </label>
              <input
                name="department"
                type="text"
                value={this.state.department}
                onChange={this.onChangeDepartment}
                className="form-control input-md"
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                className="form-control"
                name="gender"
                value={this.state.gender}
                onChange={this.onChangeGender}
              >
                <option value="">-- Select Gender --</option>
                <option value="2">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button onClick={this.handleCancel} className="btn btn-default">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUpdateEmployee;
