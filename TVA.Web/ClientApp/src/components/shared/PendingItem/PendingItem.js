import React, { Component } from 'react';
import { ListItem } from 'material-ui';
//import './PendingItem.css';

class PendingItem extends Component {
    renderContent(items) {
        return Object.keys(items).map((key) => {
            if (key === "employeeId")
                return <li key={items[key]}><a href="#" className="employee-id">{items[key]}</a></li>
            else
                return <li key={items[key]}><span className="label">{key}:</span> {items[key]}</li>
        });
    }

    render() {
        const { title, items, key } = this.props;
        return (
            <section id="pending-items">
                <div className="title-pending">{title}</div>
                <ul className="content">
                    {this.renderContent(items)}
                </ul>
            </section>
        );
    }
}

export default PendingItem;