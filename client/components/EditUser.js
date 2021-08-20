import React, { Fragment } from "react";
import { _updateUser } from "../store/auth";
import { connect } from "react-redux";
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      addressLine_1: "",
      addressLine_2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      mobile: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState(this.props.user);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit() {
    const { updateUser, user } = this.props;
    console.log(this.state);
    updateUser(user.id, this.state);
  }
  render() {
    const { user } = this.props;
    const listOfState = [
      "username",
      "firstName",
      "lastName",
      "email",
      "addressLine_1",
      "addressLine_2",
      "city",
      "state",
      "zipCode",
      "country",
      "mobile",
    ];
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`#UserId${user.id}`}
        >
          Edit Account Info
        </button>

        <div className="modal" id={`UserId${user.id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.state.username}</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="container">
                    <div className="row g-2">
                      {Object.keys(this.state).map(
                        (state, ind) =>
                          listOfState.includes(state) && (
                            <div key={`stateId${ind}`} className="col-6">
                              <label>{state}:</label>
                              <input
                                value={this.state[state]}
                                name={`${state}`}
                                onChange={this.handleChange}
                                className="p-3 border bg-light"
                              />
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-dismiss="modal"
                    onClick={this.handleSubmit}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  updateUser: (userId, user) => {
    dispatch(_updateUser(userId, user));
  },
});

export default connect(null, mapDispatch)(EditUser);
