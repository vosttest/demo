import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import * as ForgotPassword from './ForgotPassword';
import * as Home from './Home';

import * as UserSignIn from './User/SignIn';
import * as UserSearch from './User/Search';
import * as UserProfile from './User/MyProfile';
import * as UserLeaveInformation from './User/LeaveInformation';
import * as UserMyNotification from './User/MyNotification';

import * as YearSearch from './Holiday/holidays';
import * as GroupSearch from './Group/groups';
import * as PositionSearch from './Position/positions';
import * as ApplyLeave from './Leave/applyLeave';

export default function configureStore(history, initialState) {
    const reducers = {
        home: Home.reducer,
        forgotPassword: ForgotPassword.reducer,
        counter: Counter.reducer,
        weatherForecasts: WeatherForecasts.reducer,
        userSignIn: UserSignIn.reducer,
        userSearch: UserSearch.reducer,
        yearSearch: YearSearch.reducer,
        groupSearch: GroupSearch.reducer,
        myNotification: UserMyNotification.reducer,
        userProfile: UserProfile.reducer,
        positionSearch: PositionSearch.reducer,
        userLeaveInformation: UserLeaveInformation.reducer,
        applyLeave: ApplyLeave.reducer
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}