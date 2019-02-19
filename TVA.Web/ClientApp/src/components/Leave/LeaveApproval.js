import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { DropdownList, Combobox } from 'react-widgets';

let colors = [
    { id: 0, name: 'color orange' },
    { id: 1, name: 'purple' },
    { id: 2, name: 'red' },
    { id: 3, name: 'blue' },
];

let listView = ['View All', 'View Draft', 'View Approved'];

class ApprovalLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            people: colors,
        }
    }

    handleCreate(name) {
        let { people, value } = this.state;

        let newOption = {
            name,
            id: people.length + 1
        }

        this.setState({
            value: newOption,  // select new option
            people: [people, newOption] // add new option to our dataset
        })
    }

    render() {
        let { value, people } = this.state;

        return (
            <section>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-3">
                                <Combobox
                                    data={listView}
                                    defaultValue={listView[0]}
                                    textField='name'
                                />
                            </div>
                            <div className="col-md-2">From:</div>
                            <div className="col-md-2">To:</div>
                            <div className="col-md-3">Search User Name</div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 pt-15">
                                <p className="mb-0">7 Items - Update 3 minutes ago</p>
                            </div>
                            <div className="col-md-2">
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.from}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-md-2">
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.from}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <DropdownList filter
                                    data={people}
                                    value={value}
                                    filter="contains"
                                    onCreate={name => this.handleCreate(name)}
                                    onChange={value => this.setState({ value })}
                                    textField="name"
                                />
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-primary btn-sm">Search</button>
                                <button type="button" className="btn btn-secondary level-info btn-sm">New</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ALE Reference No.</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Leave From</th>
                                    <th scope="col">Leave To</th>
                                    <th scope="col">Total Day</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ALE-Michel-20190119-000001</td>
                                    <td>Michel</td>
                                    <td>25-01-2019</td>
                                    <td>31-01-2019</td>
                                    <td>5</td>
                                    <td>Pending Approval</td>
                                    <td>20-01-2019</td>
                                </tr>
                                <tr>
                                    <td>ALE-Michel-20190121-000001</td>
                                    <td>Michel</td>
                                    <td>25-01-2019</td>
                                    <td>26-01-2019</td>
                                    <td>5</td>
                                    <td>Draft</td>
                                    <td>20-01-2019</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        );
    }
}

export default connect()(ApprovalLeave);