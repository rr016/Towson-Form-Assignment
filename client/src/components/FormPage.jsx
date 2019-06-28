// Rafal Ryczek

import React, { Component } from 'react';
import './Main.css';
import Navbar from './Navbar';

class FormPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="back-image">
                    <form id="form1" className="container" action="/api/confirm" method="POST" onSubmit={this.validation}>
                        <p className="title">Request Info</p>

                        <div><input type="text" id="firstName" name="firstName" placeholder="First Name" /></div>
                        <div id="require-firstName"></div>

                        <div><input type="text" id="lastName" name="lastName" placeholder="Last Name" /></div>
                        <div id="require-lastName"></div>

                        <div><input type="email" id="email" name="email" placeholder="Email" /></div>
                        <div id="require-email"></div>

                        <div><input type="tel" id="phone" name="phone" placeholder="Phone" /></div>
                        <div id="require-phone"></div>

                        <div><label htmlFor="campus">Which campus are you interested in?</label></div>
                        <div>
                            <select id="campus" name="campus" >
                                <option value="">Please Select...</option>
                                <option value="campusA">Campus A</option>
                                <option value="campusB">Campus B</option>
                                <option value="campusC">Campus C</option>
                            </select>
                        </div>
                        <div id="require-campus"></div>

                        <div><label htmlFor="workshop">Which workshop would you like to learn more about?</label></div>
                        <div><textarea id="workshop" name="workshop"></textarea></div>

                        <p id="privacy">By submitting your information below, you agree to our <span className="gold-text">Terms of Use</span> and <span className="gold-text">Privacy Policy</span>.</p>
                        <div className="btn-container"><button type="submit" className="btn">Request Info</button></div>
                    </form>
                </div>
            </div>
        );
    }

    validation = (event) => {
        let check1 = this.checkField('firstName');
        let check2 = this.checkField('lastName');
        let check3 = this.checkEmail();
        let check4 = this.checkPhone();
        let check5 = this.checkField('campus');

        if (check1 && check2 && check3 && check4 && check5) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    checkField = (name) => {
        if (document.getElementById(name).value === '') {
            document.getElementById('require-' + name).innerHTML = 'This field is required.';
            return false;
        } else {
            document.getElementById('require-' + name).innerHTML = '';
            return true;
        }
    }

    checkEmail = () => {
        if (document.getElementById('email').value === '') {
            document.getElementById('require-email').innerHTML = 'This field is required.';
            return false;
        } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(document.getElementById('email').value))) {
            document.getElementById('require-email').innerHTML = 'This does not appear to be a valid email address.';
            return false;
        } else {
            document.getElementById('require-email').innerHTML = '';
            return true;
        }
    }

    checkPhone = () => {
        if (document.getElementById('phone').value === '') {
            document.getElementById('require-phone').innerHTML = 'This field is required.';
            return false;
        } else if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(document.getElementById('phone').value))) {
            document.getElementById('require-phone').innerHTML = 'This does not appear to be a valid phone number.';
            return false;
        } else {
            document.getElementById('require-phone').innerHTML = '';
            return true;
        }
    }
}

export default FormPage;
