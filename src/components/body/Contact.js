import React, { Component } from 'react'
import { navigateTo } from "gatsby-link"

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };
  }

  handleChange = e => {this.setState({[e.target.name]: e.target.value})};

  handleSubmit = e => {
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));

    e.preventDefault();
  };
  render() {
    const { name, email, message } = this.state;
    return (
        <form 
          onSubmit={this.handleSubmit} 
          id="contact-form" name="contact" 
          method="post" data-netlify="true"
          action="/page-2/" 
          data-netlify-honeypot="bot-field"
        >
            <input id="form-input" type="text" name="name" value={name} onChange={this.handleChange} placeholder="your name"/>
            <input id="form-input" type="email" name="email" value={email} onChange={this.handleChange} placeholder="your email"/>
            <textarea name="message" value={message} onChange={this.handleChange} rows="9" placeholder="write something"/>
            
            <div data-netlify-recaptcha></div>
         
            <input type="hidden" name="form-name" value="contact" />
          <button type="submit">Send to Email</button>
        </form>             
    )
  }
}
