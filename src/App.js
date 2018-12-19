import React, { Component } from 'react';

import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

import './App.css';

const override = css`
  position: fixed;
  z-index: 2000;
  height: 2em;
  weight: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      message: '',
      loading: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubjectChange(event) {
    this.setState({subject: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  clearForm() {
    this.setState({ email: "", subject: "", message: ""});
  }


  handleSubmit(event) {
    // alert('The Form Was Submitted!' + this.state.email + "\n" + this.state.subject + "\n" + this.state.message);
    event.preventDefault();

    this.setState({loading: true});

    const data = {
      "email": this.state.email,
      "subject": this.state.subject,
      "message": this.state.message
    };

    const options = {
      Host: "interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com",
      Path: "/contact-us/send",
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
  };

    fetch('http://interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com/contact-us/send', options)
      .then(res => {
      res.json().then(body => {
        this.setState({loading: false})          
        alert('Message successfully submitted.');
        this.clearForm();
      })
      .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <div id="contact">
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={90}
          color={'#00B2EE'}
          loading={this.state.loading}
        />
        <form onSubmit={this.handleSubmit}>
          <h2>Contact Us</h2>
          <div className="row">
            <div className="form-group col-md-8">
              <label>Email</label>
              <input type="email" required className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-8">
              <label>Subject</label>
              <input type="text" required className="form-control" value={this.state.subject} onChange={this.handleSubjectChange}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12">
              <label>Message</label>
              <textarea required className="form-control" rows="7" value={this.state.message} onChange={this.handleMessageChange} ></textarea>
            </div>
          </div>
          <input className="form-control col-md-3 btn btn-info" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
