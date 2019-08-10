import axios from "axios";
import { MAKE_APPOINTMENT, MAKE_APPOINTMENT_FAIL } from "./types";
import { returnErrors } from "./errorActions";

//Make Appointment

export const makeAppoint = ({
  address,
  dataAndTime,
  constraints,
  work
}) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ address, dataAndTime, constraints, work });

  axios
    .post("/api/makeAppoint", body, config)
    .then(res =>
      dispatch({
        type: MAKE_APPOINTMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "MAKE_APPOINTMENT_FAIL"
        )
      );
      dispatch({
        type: MAKE_APPOINTMENT_FAIL
      });
    });
};
