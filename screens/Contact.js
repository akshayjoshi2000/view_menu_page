import React, { useEffect, useState , useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2rwrmmz', 'template_knuws8a', form.current, '1p4EeIhqx-BCITMOl')
      .then((result) => {
        console.log(result.text);
        // Clear the form fields after sending email
        setFeedbackName('');
        setFeedbackEmail('');
        setFeedbackText('');
        setIsFeedbackSubmitted(true);
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  const validateForm = () => {
    if (feedbackName.trim() !== '' && feedbackEmail.trim() !== '' && feedbackText.trim() !== '') {
        setIsFormValid(true);
    } else {
        setIsFormValid(false);
    }
};


    return (
        <div className="contact-container" style={ContactContainer}>
         <div style={{ width: '100%', backgroundColor: '#333', padding: '10px 0', position:'fixed'}}>
          <div className="left-arrow" style={BackContainer}>
            <Link to="/">
              <img src={require('../assets/left_arrow.svg')} alt="Back" style={ImgBackContainer} />
            </Link>
          </div>
        </div>

      <div style={additionalContentStyle}>
      <div  style={additionalContentStyletext}>
        <h2>Experience the Ease of Use</h2>
          <p>
            Our digital menu system is designed with simplicity in mind. Say goodbye to paper menus and
            enjoy the convenience of browsing through our menu items digitally.
          </p>
          <p>If you have any suggestions or feedback, please let us know!</p>
      </div>
        
        {isFeedbackSubmitted ? (
          <p>Thank you for your request! We will be in touch with you shortly.</p>
        ) : (
          <div style={feedbackFormStyle}>
            <h3>Schedule a free demo</h3>
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                placeholder="Name"
                value={feedbackName}
                onChange={(e) => {
                    setFeedbackName(e.target.value);
                    validateForm();
                }}
                name="user_name"
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email"
                value={feedbackEmail}
                onChange={(e) => {
                    setFeedbackEmail(e.target.value);
                    validateForm();
                }}
                name="user_email"
                style={inputStyle}
              />
              <textarea
                placeholder="Request a demo (15-300 characters), and kindly include your city and restaurant name."
                value={feedbackText}
                onChange={(e) => {
                    setFeedbackText(e.target.value);
                    validateForm();
                }}
                name="message"
                style={textareaStyle}
              />
              <input type="submit" value="Submit" style={{ ...submitButtonStyle, opacity: isFormValid ? 1 : 0.5 }} disabled={!isFormValid} />
            </form>
        </div>
        )}
      </div>
      <div style={contactContainerStyle}>
            <h1>Contact Us</h1>
            <div style={contactInfoStyle}>
                <p>Email: <a style={contactLinkStyle} href="mailto:scanformenu.online@gmail.com">scanformenu.online@gmail.com</a></p>
                <p>Phone: <a style={contactLinkStyle} href="tel:+91 9108145055">9108145055</a></p>
                <p>WhatsApp: <a style={contactLinkStyle} href="https://wa.me/919108145055">9108145055</a></p>
            </div>
        </div>
      </div>
      
    );
};

const BackContainer  = {
  marginTop : '10px',
  marginLeft : '10px',
  marginBottom : '0px',
}

const ImgBackContainer  = {
  height: '25px',
  width: '25px',
}

const ContactContainer ={
  width: '100%',
}

const additionalContentStyle = {
  padding: '20px',
  marginRight:'10px',
  marginTop: '20px',
  
};

const additionalContentStyletext = {
  padding: '10px',
  fontWeight: 600,
  
};

const feedbackFormStyle = {
  marginTop: '20px',
};

const inputStyle = {
  width: '98%',
  height: '30px',
  margin: '10px 0',
  padding: '8px',
  border: '2px solid #7E8AA2',
  borderRadius: '5px',
  fontSize: '14px',
};

const textareaStyle = {
  width: '98%',
  height: '90px',
  margin: '10px 0',
  padding: '8px',
  border: '2px solid #7E8AA2',
  borderRadius: '5px',
  fontSize: '14px',
  resize: 'none', // Disable textarea resizing
};

const submitButtonStyle = {
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '14px',
  alignContent: 'center'
};

  const contactContainerStyle = {
      textAlign: 'center',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '400px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const contactInfoStyle = {
      marginTop: '1.5rem',
      fontSize: '1.2rem',
  };

  const contactLinkStyle = {
      textDecoration: 'none',
      color: '#007BFF',
  };

export default Contact;
