import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "./../actions/authActions";
import { clearErrors } from "./../actions/errorActions";

class Login extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null
  };

  static ProprTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(preProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== preProps.error) {
      //Check for regiser error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      this.props.history.push("/");
    }
  //  console.log(localStorage.getItem("token"));
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    //  console.log(user)
    //Attempt to login
    this.props.login(user);
  };
  // onClick = e => {
  //   e.preventDefault();
  //   localStorage.setItem("token", action.payload.token);
  //   console.log(token);
  // };
  render() {
    return (
      <div className="container text-center">
        <div class="row">
          <div class="col-md-12">
            <h3>User Login</h3>
            {this.state.msg ? (
              <div className="alert alert-primary" role="alert">
                {this.state.msg}
              </div>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="text-center">
                <div class="col-sm-12">
                  <lable for="email">Email</lable>

                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={this.onChange}
                    style={{
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center"
                    }}
                  />
                </div>
                <div class="col-sm-12">
                  <lable for="passwors">Password</lable>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={this.onChange}
                    style={{
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center"
                    }}
                  />
                </div>
                <div class="col-sm-12">
                  <label>
                    <input
                      type="checkbox"
                      //defaultChecked="checked"
                      onChange={this.onClick}
                      name="remember"
                    />{" "}
                    Remember me
                  </label>
                </div>
                <div class="col-sm-12">
                  <label>
                    Forgot <a href="#">password?</a>
                  </label>
                </div>
              </FormGroup>
              <div class="container">
                <Button
                  className="btn btn-primary"
                  color="dark"
                  style={{
                    width: "10%",
                    textAlign: "center",

                    marginLeft: "45%",
                    marginRight: "45%"
                  }}
                  block
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
