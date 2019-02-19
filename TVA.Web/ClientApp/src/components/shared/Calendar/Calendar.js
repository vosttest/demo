import React, { Component } from 'react';
import shortid from 'shortid';
import moment from 'moment';
import './Calendar.css';
import Month from './Month';

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            format: this.props.format,
            date: this.props.date,
            data: this.props.data,
            dateContext: moment(this.props.date)
        };
    }

    filter = (data, monthSeleted) => data.filter((item) => {
        const yearSeleted = moment(this.props.date).format("Y");
        const year = moment(item.date).format("Y");
        const month = moment(item.date).format("MM");
        return monthSeleted == month && yearSeleted == year;
    })

    year = () => this.state.dateContext.format("Y");
    month = () => this.state.dateContext.format("MM");

    render() {
        const { state: { format, date, data }, year, month } = this;

        var months = [];
        for (var i = 1; i < 13; i++) {
            months.push(
                <div key={shortid.generate()} className="col-lg-3 col-md-4 col-sm-4">
                    <Month format={format} date={year() + `-` + i} data={this.filter(data, i)} />
                </div>
            );
        }

        return (
            <div className="calendar-container">
                {format == "month" &&
                    <Month format={format} date={date} data={this.filter(data, month())} />
                }
                {format == "year" &&
                    <div>
                        <h1>{year()}</h1>
                        <div className="row">
                            {months}
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default Calendar;