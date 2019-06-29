// Rafal Ryczek

import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import Navbar from './Navbar';
import trash from './img/trash.svg';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    _id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    createdOn: new Date(),
                    completed: 'false'
                }
            ],
            recordCount: 0
        }
    }

    componentDidMount() {
        axios.get('/api/customers', { responseType: 'json' })
            .then(result => {
                this.setState({
                    data: result.data,
                    recordCount: result.data.length
                });
            }).catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <Navbar />
                <form className="back-image-admin" action="/api/manage" method="POST">
                    <div className="container-admin">
                        <p className="title">Submissions</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Date Submitted</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        );
    }

    renderTableBody = () => {
        let rows = [];
        if (this.state.recordCount === 0) {
            return <tr><td colSpan="7">No submissions have been entered.</td></tr>;
        }

        this.state.data.map((row, idx) => {
            rows.push(
                <tr>
                    <td>{idx + 1}</td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{new Date(row.createdOn).toDateString()}</td>
                    <td>{this.displayButton(idx)}</td>
                    <td><button type="submit" name="btnDelete" value={this.state.data[idx]._id}><img src={trash} alt="trash icon" /></button></td>
                </tr>
            );
        });

        return rows;
    }

    displayButton = (idx) => {
        if (this.state.data[idx].completed === 'true') {
            return (
                <p>Completed</p>
            );
        } else {
            return (
                <button className="btn-admin" type="submit" name="btnUpdate" value={this.state.data[idx]._id}>Mark Complete</button>
            );
        }
    }
}

export default AdminPage;
