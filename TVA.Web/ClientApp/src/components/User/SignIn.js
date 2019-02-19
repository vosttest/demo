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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../../store/User/SignIn';
import Loading from './../shared/Loading';
import isEmpty from 'lodash/isEmpty';

class SignIn extends Component {
    componentWillReceiveProps() {
        if (this.props.toHome) {
            this.props.history.push('/');
        }
    }

    render() {
        const {
            userName,
            password,
            handleInput,
            handleSubmit,
            errors,
            message,
            isLoading
        } = this.props;

        return (
            <div className="wapper">
                {
                    isLoading &&
                    <Loading />
                }
                <div className="box">
                    <h2>TVA</h2>
                    {
                        !isEmpty(message) &&
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    }
                    <form className="sign-in" name="form" onSubmit={handleSubmit} noValidate>
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
                        <div className="form-group input">
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" value={password} onChange={handleInput} className="form-control" />
                            {
                                errors.password &&
                                <div className="field-validation-error">
                                    <span>
                                        <i className="fa fa-exclamation-circle" /> {errors.password}
                                    </span>
                                </div>
                            }
                        </div>
                        <div className="form-group input">
                            <label className="text-center">
                                <Link to={{ pathname: '/forgot-password', state: { userName: userName } }}>Forgot your password?</Link>
                            </label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-block full-width">SIGN IN</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.userSignIn,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SignIn);