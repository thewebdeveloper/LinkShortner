import React, { Component } from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { error: ''};
  }

  handleSubmit(event) {
    event.preventDefault();

    const linkValue = this.refs.link.value;
    Meteor.call('links.insert', linkValue, (error) => {
      if(error) {
        this.setState({ error: 'Enter a Valid URL...'});
      } else {
        this.setState({ error: ''});
        this.refs.link.value = '';
      }
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Link to Shorten</label>
            <input ref="link" className="form-control" />
          </div>
          <div className="text-danger">{this.state.error}</div>
          <button className="btn btn-primary">Shorten!</button>
        </form>
      </div>
    );
  }
}

export default LinkCreate;
