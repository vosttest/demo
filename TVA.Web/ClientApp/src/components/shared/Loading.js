/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 02/02/2019 14:46
 * Update       : 02/02/2019 14:46
 * Checklist    : 1.0
 * Status       : OK
 */

import React, { Component } from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = { didMount: false };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ didMount: true })
        }, 0);
    }

    render() {
        return (
            <div className={`loading fade-in ${this.state.didMount && 'visible'}`}>
                <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
        );
    }
}