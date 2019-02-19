import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/User/SignIn';

class ForgotPassword extends Component {
    render() {
        const { password, handleSubmit, handleInput, errors, isLoading } = this.props;
        return (
            <div className="wapper">

                {isLoading &&
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                }

                <div className="box">
                    <h2>Hi you!</h2>
                    <p>Please enter your password.</p>

                    <form name="form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group input">
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" value={password} onChange={handleInput} className="form-control" maxLength={64} />
                            {errors.password &&
                                <span className="k-widget k-tooltip k-tooltip-validation k-invalid-msg field-validation-error">
                                    <span>
                                        <i className="fa fa-exclamation-circle" /> {errors.password}
                                    </span>
                                </span>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-block">SIGN IN</button>
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
)(ForgotPassword);