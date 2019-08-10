import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "./../actions/userActions";
import PropTypes from "prop-types";

class Admin extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  onDeleteClick = id => {
    this.props.deleteUser(id);
  };
  render() {
    const { users } = this.props.users;
    console.log(users);
    return (
      // <Container>
      //   <ListGroup>
      //     <TransitionGroup className="Admin">
      //       {users.map(({ _id, fname }) => (
      //         <CSSTransition key={_id}>
      //           <ListGroupItem>
      //             {fname} | {_id}
      //           </ListGroupItem>
      //         </CSSTransition>
      //       ))}
      //     </TransitionGroup>
      //   </ListGroup>
      // </Container>
      <Container style={{ marginTop: "20px" }}>
        <Table style={{ border: "0" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((rowData, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{rowData._id}</td>
                <td>{rowData.fname}</td>
                <td>{rowData.lname}</td>
                <td>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, rowData._id)}
                  >
                    &times;
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
Admin.prototypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(Admin);
