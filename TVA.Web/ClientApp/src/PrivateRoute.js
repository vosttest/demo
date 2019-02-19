import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import { Token } from './utilities';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => Token.isSignedIn()
                ? <Layout><Component {...props} /></Layout>
                : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;