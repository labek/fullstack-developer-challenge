import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class PostalCodeForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { postalCodeSearchValue: '' };
  }

  handleChange(changeEvent, { value }) {
    this.setState({ postalCodeSearchValue: value });
  }

  handleSubmit(submitEvent) {
    const { onSubmittedData } = this.props;
    const { postalCodeSearchValue } = this.state;

    submitEvent.preventDefault();
    onSubmittedData({ postalCodeSearchValue });
    this.setState({ postalCodeSearchValue: '' })
  }

  render() {
    const { loading } = this.props;
    const { postalCodeSearchValue } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          focus
          onChange={this.handleChange}
          placeholder="Search Location by Postal Code…"
          value={postalCodeSearchValue}
        />
        <Form.Button content="Search" loading={loading} />
      </Form>
    );
  }
}

PostalCodeForm.propTypes = {
  loading: PropTypes.bool,
  onSubmittedData: PropTypes.func.isRequired,
};

PostalCodeForm.defaultProps = {
  loading: false,
};

export default PostalCodeForm;
