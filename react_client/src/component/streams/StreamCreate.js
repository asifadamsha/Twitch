import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput({ input }) {
    return <input {...input} />;
  }

  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput} />
        <Field name="description" />
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate"
})(StreamCreate);
