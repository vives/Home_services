import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "./../actions/authActions";
import { clearErrors } from "./../actions/errorActions";

class Register extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    phone_no: "",
    password: "",
    password_conf: "",
    msg: null
  };

  static ProprTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(preProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== preProps.error) {
      //Check for regiser error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  passwordval() {
    ///console.log(this.state.password);
    //console.log(localStorage.getItem("token"));
    if (this.state.password !== this.state.password_conf) {
      this.setState({ msg: "Password does not match" });
      return false;
    } else {
      return true;
    }
  }
  onSubmit = e => {
    e.preventDefault();
    if (this.passwordval()) {
      const { fname, lname, email, phone_no, password } = this.state;

      //Create user object
      const newUser = {
        fname,
        lname,
        email,
        phone_no,
        password
      };
      console.log(newUser);
      //Attem To Register
      this.props.register(newUser);
    }
  };
  render() {
    return (
      <div className="container" style={{ maxWidth: "60%" }}>
        <div className="row mt-4 ">
          <div className="offset-md-1 col-md-10">
            <h2 className="title text-center">
              CREATE YOUR ACCOUNT TO GET STARTED
            </h2>
            {this.state.msg ? (
              <div className="alert alert-primary" role="alert">
                {this.state.msg}
              </div>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>FIRST NAME</label>
                      <Input
                        class="form-control"
                        placeholder="First Name*"
                        name="fname"
                        type="text"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>LAST NAME</label>
                      <Input
                        class="form-control"
                        placeholder="Last Name"
                        name="lname"
                        type="text"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>EMAIL ADDRESS</label>
                      <Input
                        class="form-control"
                        placeholder="Email*"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>PHONE NUMBER</label>
                      <Input
                        class="form-control"
                        placeholder="Cell Phone"
                        name="phone_no"
                        type="text"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>PASSWORD</label>
                      <Input
                        class="form-control"
                        placeholder="Password*"
                        name="password"
                        type="password"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>PASSWORD CONFIRMATION</label>
                      <Input
                        class="form-control"
                        placeholder="Password Confirmation*"
                        name="password_conf"
                        type="password"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 offset-md-6" />
                  <div className="col-md-4 offset-md-6">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                      data-testid="Sign-up-btn"
                      // style={{
                      //   marginLeft: "auto",
                      //   marginRight: "auto"
                      //   // width: "40%"
                      // }}
                    >
                      Sign Me Up
                    </button>

                    {/* <Button
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
                    </Button> */}
                  </div>
                </div>
              </FormGroup>
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
  { register, clearErrors }
)(Register);
