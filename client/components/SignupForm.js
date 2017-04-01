import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] }
  }
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({errors: errors})
    });
  }
  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(mutation)(SignupForm);
