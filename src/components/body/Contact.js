import React, { Component } from 'react'
import { navigateTo } from "gatsby-link"
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

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
      <>
      <div id="form-center">
        <form 
          onSubmit={this.handleSubmit} 
          id="contact-form" name="contact" 
          method="post" data-netlify="true"
          action="/page-2/" 
          data-netlify-honeypot="bot-field"
          data-netlify-recaptcha="false"
        >
            <input id="form-input" type="text" name="name" value={name} onChange={this.handleChange} required placeholder="your name"/>
            <input id="form-input" type="email" name="email" value={email} onChange={this.handleChange} required placeholder="your email"/>
            <textarea id="form-input" name="message" value={message} onChange={this.handleChange} rows="9" required placeholder="write something"/>
            
            <input type="hidden" name="form-name" value="contact" />
          <button id="form-input" type="submit">Send to Email</button>
        </form>  
      </div>
      
      <div className="social-group">
        <a id="facebook" className="social" href="https://www.facebook.com/milos.mandic1" target="_blank"><FaFacebook /></a>
        <a id="twitter" className="social" href="https://twitter.com/mcmickoo" target="_blank"><FaTwitter/></a>
        <a id="instagram" className="social" href="https://github.com/mcmicko" target="_blank"><FaGithub/></a>         
      </div>
      </>     
    )
  }
}
