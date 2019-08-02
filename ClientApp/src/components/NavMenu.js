import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      userProfile: localStorage.getItem("userProfile")
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const {
      isAuthenticated,
      login,
      logout,
      userHasScopes,
      userName
    } = this.props.auth;
    console.log("Local Storage User Profile:" + userName);
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              AspNetCoreReactSPA
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/public">
                    Public
                  </NavLink>
                </NavItem> */}

                {/* {isAuthenticated() && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/secure">
                      Secure
                    </NavLink>
                  </NavItem>
                )}

                {isAuthenticated() && userHasScopes(["read:courses"]) && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/courses">
                      Courses
                    </NavLink>
                  </NavItem>
                )} */}

                {isAuthenticated() && (
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="text-dark"
                      to="/fetch-employee"
                    >
                      Fetch Employees
                    </NavLink>
                  </NavItem>
                )}
                {isAuthenticated() && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/profile">
                      {userName ? userName : "Profile"}
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink
                    tag={Link}
                    onClick={isAuthenticated() ? logout : login}
                    className="text-dark"
                    to="/"
                  >
                    {isAuthenticated() ? "Logout" : "Login"}
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
