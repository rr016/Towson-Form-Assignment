import React, { Component } from 'react';
import './Main.css';

class ConfirmPage extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/api/confirm');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    }

    render() {
        return (
            <p id="confirm-text">Thank you for your interest in our workshops! A member of our team will reach out soon!</p>
        );
    }
}

export default ConfirmPage;