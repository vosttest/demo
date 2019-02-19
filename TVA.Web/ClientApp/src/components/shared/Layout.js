import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default props => (
    <div>
        <Header />
        <div className="z-container">
            {props.children}
        </div>
        <Footer />
    </div>
);