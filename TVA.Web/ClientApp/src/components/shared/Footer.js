import React, { Component } from 'react';
import { Logo } from './../../utilities/utils';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer-distributed">
                <div className="footer-right">
                    <a href="https://www.facebook.com/offshoreteam" target="_blank"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="https://offshoreteam.net/" target="_blank"><i className="fas fa-globe"></i></a>
                </div>

                <div className="footer-left">
                    <Logo />
                    <br/>
                    <p className="footer-links">
                        User Support System
                        </p>
                    <p>Tan Viet A Co.. Ltd. &copy; 2019</p>
                </div>
            </footer>
        );
    }
}

export default Footer;