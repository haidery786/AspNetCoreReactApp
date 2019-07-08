import React, { Component } from "react";

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.onSubmit = this.onSubmit.bind(this);
  }

  getCityData() {
    fetch("api/City")
      .then(response => response.json())
      .then(data => {
        this.setState({ cityList: data, loading: false });
      });
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

  onSubmit(e) {
    e.preventDefault();
    const empObj = {
      Name: this.state.name,
      Department: this.state.department,
      Gender: this.state.gender,
      City: this.state.city
    };
    // Post request for Create employee.
    fetch("api/Employee", {
      method: "POST",
      body: empObj
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.history.push("/fetchemployee");
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Employee</h3>
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEmployee;
