/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 02/02/2019 14:46
 * Update       : 03/02/2019 12:03
 * Checklist    : 1.0
 * Status       : OK
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../../store/User/Search';
import Loading from './../shared/Loading';
import isEmpty from 'lodash/isEmpty';

class Search extends Component {
    /**
     * This method is called when the component is first added to the document
     */
    componentDidMount() {
        this.ensureDataFetched();
    }

    /**
     * This method is called when the route parameters change
     */
    componentDidUpdate() {
        this.ensureDataFetched();
    }

    ensureDataFetched() {
        let t1 = this.props.match.params.page;
        let t2 = parseInt(t1, 10);
        let page = t2 || 1;

        this.props.requestTable(page);
    }

    render() {
        const {
            pin,
            email,
            userName,
            handleInput,
            handleSubmit,
            errors,
            message,
            isLoading
        } = this.props;

        return (
            <div>
                <div className="wapper">
                    {
                        isLoading &&
                        <Loading />
                    }
                    <div className="box">
                        <h2>User</h2>
                        {
                            !isEmpty(message) &&
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        }
                        <form className="search" name="form" onSubmit={handleSubmit} noValidate>
                            <div className="form-group input">
                                <label htmlFor="pin">Pin</label>
                                <input name="pin" type="text" value={pin} onChange={handleInput} className="form-control" />
                                {
                                    errors.pin &&
                                    <div className="field-validation-error">
                                        <span>
                                            <i className="fa fa-exclamation-circle" /> {errors.pin}
                                        </span>
                                    </div>
                                }
                            </div>
                            <div className="form-group input">
                                <label htmlFor="email">Email</label>
                                <input name="email" type="text" value={email} onChange={handleInput} className="form-control" />
                                {
                                    errors.email &&
                                    <div className="field-validation-error">
                                        <span>
                                            <i className="fa fa-exclamation-circle" /> {errors.email}
                                        </span>
                                    </div>
                                }
                            </div>
                            <div className="form-group input">
                                <label htmlFor="userName">User Name</label>
                                <input name="userName" type="text" value={userName} onChange={handleInput} className="form-control" />
                                {
                                    errors.userName &&
                                    <div className="field-validation-error">
                                        <span>
                                            <i className="fa fa-exclamation-circle" /> {errors.userName}
                                        </span>
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success btn-block full-width">SEARCH</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <h2>List</h2>
                    {renderTable(this.props)}
                    {renderPagination(this.props)}
                </div>
            </div>
        );
    }
}

function renderTable(props) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Pin</th>
                    <th>Email</th>
                    <th>User Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.rsp.data.map(i =>
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.pin}</td>
                            <td>{i.email}</td>
                            <td>{i.userName}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

function renderPagination(props) {
    let rsp = props.rsp;
    let t = rsp.page || 1;
    let prevPage = t - 1;
    let nextPage = t + 1;

    if (prevPage < 1) {
        prevPage = 1;
    }

    if (nextPage > rsp.totalPages) {
        nextPage = rsp.totalPages;
    }

    return (
        <div>
            <p className='clearfix text-center'>
                <Link className='btn btn-default pull-left' to={`/user-search/${prevPage}`}>Previous</Link>
                <Link className='btn btn-default pull-right' to={`/user-search/${nextPage}`}>Next</Link>
            </p>
            {props.isLoading ? <Loading /> : []}
        </div>
    );
}

export default connect(
    state => state.userSearch,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Search);