import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { send } from "./../actions/authActions";
import { clearErrors } from "./../actions/errorActions";

class Contact extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    msg: null
  };
  static ProprTypes = {
    //   isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(preProps) {
    const { error } = this.props;
    if (error !== preProps.error) {
      //Check for send message error
      if (error.id === "SEND_MESSAGE_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  toggle = () => {
    //Clear Errors
    this.props.clearErrors();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const { name, email, message } = this.state;

    //Create user object
    const sendMessage = {
      name,
      email,
      message
    };
    // console.log(sendMessage);
    //Attem To Send Mmessage
    this.props.send(sendMessage);
  };
  render() {
    return (
      <div class="bg-opacity">
        <div class="breadcrumb-banner-area ptb-120">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="breadcrumb-text text-center">
                  <h2>contact-us</h2>
                  <p>Lorem Ipsum is simply dummy text of. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="breadcrumb-banner-area ptb-120 bg-opacity">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="contact-3-text">
                  <h3>Leave Us a Message</h3>
                </div>

                <form onSubmit={this.onSubmit} id="contact-form">
                  {this.state.msg ? alert(this.state.msg) : null}
                  <div class="col-sm-6">
                    <input
                      name="name"
                      type="text"
                      placeholder="name*"
                      id="name"
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      name="email"
                      type="email"
                      placeholder="email*"
                      id="email"
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="col-sm-12">
                    <textarea
                      name="message"
                      cols="30"
                      rows="10"
                      placeholder="message"
                      id="message"
                      onChange={this.onChange}
                    />
                  </div>
                  <button color="dark" style={{ marginTop: "2rem" }} block>
                    send message
                  </button>
                </form>
              </div>
              <div class="col-md-4">
                <div class="contact-3-right-wrapper mb-30">
                  <div class="contact-3-right-info">
                    <h3>Contact Us</h3>
                    <p>
                      Lorem ipsum dolor sit amet, conse ncteturll adipisicing
                      elit, sed do eiusmod{" "}
                    </p>
                  </div>
                  <div class="contact-3-address">
                    <div class="contact-3-icon">
                      <i class="zmdi zmdi-pin" />
                    </div>
                    <div class="address-text">
                      <span class="location">Location :</span>
                      <span class="USA">77, seventh avenue, Road USA.</span>
                    </div>
                  </div>
                  <div class="contact-3-address">
                    <div class="contact-3-icon">
                      <i class="zmdi zmdi-phone" />
                    </div>
                    <div class="address-text">
                      <span class="location">phone :</span>
                      <span class="USA">+00 111 222 333 44</span>
                    </div>
                  </div>
                  <div class="contact-3-address">
                    <div class="contact-3-icon">
                      <i class="zmdi zmdi-email" />
                    </div>
                    <div class="address-text">
                      <span class="location">mail :</span>
                      <span class="USA">yourmail@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { send, clearErrors }
)(Contact);
