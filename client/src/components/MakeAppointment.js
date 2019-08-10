import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeAppoint } from "./../actions/makeAppointAction";
import { clearErrors } from "./../actions/errorActions";

class MakeAppointment extends Component {
  state = {
    address: "",
    dataAndTime: "",
    constraints: "",
    work: "",
    msg: null
  };
  static ProprTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    makeAppoint: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(preProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== preProps.error) {
      //Check for regiser error
      if (error.id === "MAKE_APPOINT_FAIL") {
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
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
    this.setState({ address });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.passwordval()) {
      const { address, dataAndTime, constraints, work } = this.state;

      //Create user object
      const makeAppoint = {
        address,
        dataAndTime,
        constraints,
        work
      };

      //Attem To Register
      this.props.makeAppoint(makeAppoint);
    }
  };
  render() {
    return (
      <div className="makean_container">
        <h3>Make Appoinment</h3>
        <label>WHERE DO YOU NEED A HOMELY?</label>
        <Form onSubmit={this.onSubmit}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            shouldFetchSuggestions={this.state.address.length > 1}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                    autoFocus: true
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <label>WHEN SHOULD WE SEND SOMEONE?</label>
          <div>
            <input className="dt_picker" type="datetime-local" />
          </div>
          <div>
            <label htmlFor="subject">ARE THERE ANY TIMING CONSTRAINTS?</label>
            <textarea
              className="textarea_makeanappo"
              id="subject"
              name="subject"
              placeholder="Let us know about any timing constraints"
              style={{ height: "200px" }}
              defaultValue={""}
            />
            <label htmlFor="subject">WHAT DO YOU NEED DONE?</label>
            <textarea
              className="textarea_makeanappo"
              id="subject"
              name="subject"
              placeholder="Give us a brief description of the job you need completed. Don’t worry, the trade we match you with will be in touch to confirm all details before starting!"
              style={{ height: "200px" }}
              defaultValue={""}
            />
            <button type="submit" className="input_submit">
              Continue
            </button>
          </div>
        </Form>
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
  { makeAppoint, clearErrors }
)(MakeAppointment);
