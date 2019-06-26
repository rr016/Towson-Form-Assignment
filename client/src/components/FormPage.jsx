import React, { Component } from 'react';
import './Main.css';

class FormPage extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));

        const script = document.createElement('script');
        script.src = './client-scripts.js';
        script.async = true;
        document.body.appendChild(script);
    }

    callBackendAPI = async () => {
        const response = await fetch('/');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    }

    render() {
        return (
            <div className="back-image">
                <form id="form1" className="container" action="/api/confirm" method="POST" onSubmit={this.validation}>
                    <p id="title">Request Info</p>

                    <div><input type="text" id="firstName" name="firstName" placeholder="First Name" /></div>
                    <div id="require-firstName"></div>

                    <div><input type="text" id="lastName" name="lastName" placeholder="Last Name" /></div>
                    <div id="require-lastName"></div>

                    <div><input type="email" id="email" name="email" placeholder="Email" /></div>
                    <div id="require-email"></div>

                    <div><input type="tel" id="phone" name="phone" placeholder="Phone" /></div>
                    <div id="require-phone"></div>

                    <div><label for="campus">Which campus are you interested in?</label></div>
                    <div>
                        <select id="campus" name="campus" >
                            <option value="">Please Select...</option>
                            <option value="campus1">Campus 1</option>
                            <option value="campus2">Campus 2</option>
                            <option value="campus3">Campus 3</option>
                        </select>
                    </div>
                    <div id="require-campus"></div>

                    <div><label for="workshop">Which workshop would you like to learn more about?</label></div>
                    <div><textarea id="workshop" name="workshop"></textarea></div>

                    <p id="privacy">By submitting your information below, you agree to our <span className="gold-text">Terms of Use</span> and <span className="gold-text">Privacy Policy</span>.</p>
                    <div className="btn-container"><button type="submit" class="btn">Request Info</button></div>
                </form>
            </div>
        );
    }

    validation = (event) => {
        let check1 = this.checkField('firstName');
        let check2 = this.checkField('lastName');
        let check3 = this.checkField('email');
        let check4 = this.checkField('phone');
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
}

export default FormPage;
