import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/ForgotPassword';
import Loading from '../shared/Loading';

class ForgotPassword extends Component {
    onBack() {
        this.props.history.push('/sign-in');
    }

    render() {
        const { username, handleSubmit, handleInput, errors, isLoading, location } = this.props;
        return (
            <div className="wapper">

                {isLoading &&
                    <Loading />
                }

                <div className="box">
                    <button onClick={this.onBack.bind(this)} className="btn btn-link btn-sm">
                        <i className="fas fa-chevron-left"></i> Go back sign in
          </button>
                    <h2>Forgot password</h2>

                    <form name="form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group input">
                            <label htmlFor="userName">Username</label>
                            <input name="username" type="text" value={username || location.state.username} onChange={handleInput} className="form-control" maxLength={64} />
                            {errors.username &&
                                <div className="field-validation-error">
                                    <span>
                                        <i className="fa fa-exclamation-circle" /> {errors.username}
                                    </span>
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-block full-width">RESET PASSWORD</button>
                        </div>
                    </form>

                </div>

            </div>
        );
    }
}

export default connect(
    state => state.forgotPassword,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ForgotPassword);