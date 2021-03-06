import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Entre title : "
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Entre description : "
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title required";
  }

  if (!formValues.description) {
    errors.description = "Description required";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

export default connect(
  null,
  {
    createStream
  }
)(formWrapped);
