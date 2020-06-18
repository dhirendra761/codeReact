import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormInlineMessage from "./FormInlineMessage";

export default class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    loading: false,
    errors: {},
  };

  handleStringChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch((err) =>
        this.setState({
          errors: err.response.data.errors,
          loading: false,
        })
      );
    }
  };
  validate = (data) => {
    const errors = {};

    if (!data.email) errors.email = "This field can't be blank";
    if (!data.password) errors.password = "This field can't be blank";

    return errors;
  };
  render() {
    const { errors, data, loading } = this.state;
    const formClassName = loading ? "ui form loading" : "ui form";
    return (
      <form className={formClassName} onSubmit={this.handleSubmit}>
        <div className={errors.email ? "field error" : "field"}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            value={data.email}
            onChange={this.handleStringChange}
          />
          <FormInlineMessage content={errors.email} type="error" />
        </div>
        <div className={errors.password ? "field error" : "field"}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.handleStringChange}
          />
          <FormInlineMessage content={errors.password} type="error" />
        </div>
        <div className="ui fluid buttons">
          <button className="ui primary button" type="submit">
            Sign Up
          </button>
          <div className="or"></div>
          <Link to="/" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
