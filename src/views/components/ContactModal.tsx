import React, { Component } from 'react';
import axios from 'axios';

interface ContactState {
  name: string;
  email: string;
  message: string;
}

class ContactModal extends Component<{}, ContactState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  resetForm() {
    this.setState({ name: '', email: '', message: '' });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3002/send",
      data: this.state
    }).then((response) => {
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm();
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.");
      }
    })
  }

  onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <div className="modal fade" id="contactModal" tabIndex={-1} aria-labelledby="contactModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">Contact Us</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.onEmailChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows={3} value={this.state.message} onChange={this.onMessageChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactModal;
