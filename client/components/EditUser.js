import React, { Fragment } from "react";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
  handleSubmit() {}
  render() {
    const { user } = this.props;
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      addressLine_1,
      addressLine_2,
      city,
      state,
      zipCode,
      country,
      mobile,
    } = this.state;
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
                <h4 className="modal-title">{username}</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="container">
                  <div className="row g-2">
                    <div className="col-6">
                      <label>UserName:</label>
                      <input
                        value={username}
                        name="username"
                        onChange={this.handleChange}
                        className="p-3 border bg-light"
                      />
                    </div>
                    <div className="col-6">
                      <label>First Name:</label>
                      <div className="p-3 border bg-light"> {firstName}</div>
                    </div>
                    <div className="col-6">
                      <label>Last Name:</label>
                      <div className="p-3 border bg-light"> {lastName}</div>
                    </div>

                    {/* <div className="col-6">
                      <label>Role:</label>
                      <div className="p-3 border bg-light"> {user.role}</div>
                    </div> */}

                    {/* <div class="col-6">
                      <label>Order History:</label>
                      <div className="p-3 border bg-light">
                        {user.orders.length}
                      </div>
                    </div> */}
                    <div className="col-6">
                      <label>Email:</label>
                      <div className="p-3 border bg-light">{email}</div>
                    </div>
                    <div className="col-6">
                      <label> Mobile:</label>
                      <div className="p-3 border bg-light">{mobile}</div>
                    </div>
                    <div className="col-6">
                      <label>addressLine_1:</label>
                      <div className="p-3 border bg-light">{addressLine_1}</div>
                    </div>
                    <div className="col-6">
                      <label>addressLine_2:</label>
                      <div className="p-3 border bg-light">{addressLine_2}</div>
                    </div>
                    <div className="col-6">
                      <label>City:</label>
                      <div className="p-3 border bg-light">{city}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditUser;
