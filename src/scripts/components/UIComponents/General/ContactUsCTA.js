import React, {Component} from 'react';
import PhoneInput from 'react-phone-input-2'

class ContactUsCTA extends Component {
    constructor() {
        super();
    
        this.state = {
            email: '',
            name: '',
            phoneNumber: '',
            jobSiteZip: '',
            emailValid: false,
            nameValid: false,
            jobSiteZipValid: false,
            phoneNumberValid: false,
            formValid: false,
			isFormSubmitted: false,
        }
        this.submitForm = this.submitForm.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
        () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
        let phoneNumberValid = this.state.phoneNumberValid;
    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'name':
            nameValid = value.length > 0;
            fieldValidationErrors.name = nameValid ? '': ' is required';
            break;
          case 'lasttName':
            phoneNumberValid = value.length > 0;
            fieldValidationErrors.name = phoneNumberValid ? '': ' is required';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid,
            phoneNumberValid: phoneNumberValid,
        }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.nameValid && this.state.phoneNumberValid});
    
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

      handleOnChange(value) {
        this.setState({ phoneNumber: value })
      }

	render() {
        const fields = this.props.fields;
        const {isFormSubmitted} = this.state;
        if(!isFormSubmitted) {
            return (
                <div className="cta-wrapper">
                    <div className="container pt-5 pb-5">
                        <div className="row mb-5 pb-3">
                            <h4 className="cta-header-text">Get in touch</h4>
                            <hr className="hero-subheader-line mt-3" />
                        </div>
                        <div className="row">
                                <div className="col-md-6 cta-spacer" style={{paddingLeft: '0'}}>
                                    <form 
                                        className="cta-mobile-form"
                                        id="contact" 
                                        onSubmit={this.submitForm}
                                        action="https://formspree.io/mjnawzgm"
                                        method="POST">
                                        <fieldset>
                                            <input
                                            id="inputName"
                                            name="name" 
                                            placeholder="Name"
                                            onChange={this.handleUserInput}
                                            required
                                            type="text" 
                                            value={this.state.name}/>
                                        </fieldset>
                                        <fieldset>
                                            <input 
                                                type="email" 
                                                id="inputEmail" 
                                                onChange={this.handleUserInput}
                                                name="email"
                                                placeholder="Email Address" 
                                                required
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                value={this.state.email}
                                                autoComplete="on"/>
                                        </fieldset>
                                        <fieldset>
                                            <PhoneInput 
                                                inputExtraProps={{
                                                    placeholder: 'Please enter your country code and phone number.',
                                                    name: 'phoneNumber',
                                                    required: true,
                                                }}
                                                value={this.state.phoneNumber} 
                                                onChange={value => this.handleOnChange} 
                                                disableDropdown="true"  
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <textarea placeholder="Message" tabIndex="0"></textarea>
                                        </fieldset>
                                        <fieldset>
                                            <button onChange={this.handleUserInput} type="submit" id="contact-submit" data-submit="...Sending">{fields.ctaSubmit}</button>
                                        </fieldset>
                                    </form>
                                </div>
                            {fields.isContactPage &&
                            <div className="col-md-6 pl-5 cta-text-wrapper">
                                <div className="contact-info col">
                                    <div className="info-text">
                                        <p className="contact-header">
                                            ADDRESS
                                            <hr className="hero-subheader-line mt-3 mb-3"/>
                                        </p>
                                        <p className="contact-text">
                                            P.O. BOX 2030<br/>
                                            NORTH KINGSTOWN, RHODE ISLAND, 02852<br/>
                                            USA
                                        </p>
                                    </div>
                                </div>
                                <div className="row contact-info">
                                    <a href="https://goo.gl/maps/HKqtwuZpTjLtJiyL9" className="contact-button" role="button" target="_blank">GET DIRECTIONS</a>    
                                </div>
                                <div className="contact-info col mt-5">
                                    <div className="info-text">
                                        <p className="contact-header">
                                            Phone
                                            <hr className="hero-subheader-line mt-3 mb-3"/>
                                        </p>
                                        <p className="contact-text">401-884-8801</p>
                                        <p className="contact-header">Email</p>
                                        <p className="contact-text">sales@subsalve.com</p>
                                    </div>
                                </div>
                                
                            </div>
                            }
                            {!fields.isContactPage &&
                            <div className="col-md-6 pl-5 cta-text-wrapper">
                                <div className="cta-info-text mb-5" dangerouslySetInnerHTML={{ __html: fields.ctaText}} />
                                {/* <a href="/contact">
                                    <div className="cta-contact-us-button"> 
                                        {fields.ctaContactUs}
                                    </div>
                                </a> */}
                            </div>
                            }
                        </div>
                    </div>  
                </div>
            )
        } else {
            return (
                <div className="cta-wrapper">
                    <div className="container pt-5 pb-5">
                        <div className="row mb-5 pb-3">
                            <h4 className="cta-header-text">Get in touch</h4>
                            <hr className="hero-subheader-line mt-3" />
                        </div>
                        <div className="row">
                            <div className="col-md-6 cta-spacer" style={{paddingLeft: '0'}}>
                                <h2 className="text-center text-white">Thank you for your submission.</h2>
                            </div>
                            <div className="col-md-6 pl-5 cta-text-wrapper">
                                <div className="cta-info-text mb-5" dangerouslySetInnerHTML={{ __html: fields.ctaText}} />
                            </div>
                        </div>
                    </div>  
                </div>
            )
        }
    }
    submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                    this.setState({ isFormSubmitted: true });
            } else {
                this.setState({ isFormSubmitted: false });
            }
        };
        xhr.send(data);
    } 
}
export default ContactUsCTA;