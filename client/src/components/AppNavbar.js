import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/img/logo/1.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user, token } = this.props.auth;
    //const token = localStorage.getItem("token");
    //  const token = localStorage.getItem("token");
    //const tokenExit;

    console.log(token);
    const authLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="AboutUs">About Us</Link>
        </li>
        <li>
          <Link to="Contact">Contact</Link>
        </li>
        <li>
          <Link to="Admin">Admin</Link>
        </li>
        <li>
          <Logout />
        </li>
        <li style={{ color: "green" }}>{user ? `Welcome ${user.name}` : ""}</li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="AboutUs">About Us</Link>
        </li>
        <li>
          <Link to="Contact">Contact</Link>
        </li>
        <li>
          <Link to="Login">Login</Link>
        </li>
        <li>
          <Link to="Register">Register</Link>
        </li>
        <li>
          <Link to="MakeAppointment">MakeAppointment</Link>
        </li>
      </ul>
    );
    return (
      <div>
        <nav
          id="siteNav"
          className="navbar navbar-default navbar-fixed-top"
          role="navigation"
          style={{ backgroundColor: "black" }}
        >
          <div className="container ">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                <span className="glyphicon glyphicon-fire" />
                LOGO
              </a>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  token: localStorage.getItem("token")
});
export default connect(
  mapStateToProps,
  null
)(AppNavbar);
