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

  componentDidMount() {
    // calling this method will also update userProfile object in Auth Class
    if (this.props.auth.isAuthenticated()) this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { isAuthenticated, login, logout, userProfile } = this.props.auth;
    if (userProfile) console.log(userProfile.name);
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
              {isAuthenticated() ? (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="text-dark"
                      to="/fetch-employee"
                    >
                      Fetch Employees
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/profile">
                      {userProfile ? userProfile.name : "Profil Name"}
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      tag={Link}
                      onClick={logout}
                      className="text-dark"
                      to="/"
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                </ul>
              ) : (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">
                      Home
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      tag={Link}
                      onClick={login}
                      className="text-dark"
                      to="/"
                    >
                      Login
                    </NavLink>
                  </NavItem>
                </ul>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
