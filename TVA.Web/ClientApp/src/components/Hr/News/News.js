import './News.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Pagination from '../../shared/Pagination/Pagination';
import images from '../../../assets/img/sidebar-2.jpg';
import imgUser from '../../../assets/img/icon-user.jpg';
import imgNo from '../../../assets/img/icon-nb.png';
import imgDel from '../../../assets/img/icon-delete.png';


import {
    Badge,
    Button,
    Table,
    Col, FormGroup, Input, Label, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import GridContainer from '../../shared/Grid/GridContainer';

class News extends Component {

    render() {
        const {
            isLoading
        } = this.props;
        return (
            <section>
                <div className='card'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <img className='news-img' src={images} alt="Hình minh họa" />
                        </div>
                        <div className='col-md-10'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <h6 id="news-ctg">World</h6>
                                </div>
                                <div className='col-md-8'></div>
                                <div className='col-md-2'>
                                    <img  className='icon-user' src={imgUser} />
                                    <img  className='icon-del' src={imgDel} />
                                </div>
                            </div>                            
                            <a className='news-title' href='#'>The English Voice of ISIS Comes Out of the Shadows</a>
                            <div><span>Now a 35-year-old Canadian citizen, who studied at a college in Toronto and once worked in information technology
                                at a company contracted by IBM, says he is the anonymous narrator.</span></div>
                            <div className="date-time">30/01/2019 | 15:00</div>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <img className='news-img' src={images} alt="Hình minh họa" />
                        </div>
                        <div className='col-md-10'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <h6 id="news-ctg">Most popular</h6>
                                </div>
                                <div className='col-md-8'></div>
                                <div className='col-md-2'>
                                    <img  className='icon-user' src={imgUser} />
                                    <img  className='icon-no' src={imgNo} />
                                    <img  className='icon-del' src={imgDel} />
                                </div>
                            </div>
                            <a  className='news-title' href='#'>The English Voice of ISIS Comes Out of the Shadows</a>
                            <div><span>Now a 35-year-old Canadian citizen, who studied at a college in Toronto and once worked in information technology
                                at a company contracted by IBM, says he is the anonymous narrator.</span></div>
                            <div className="date-time">30/01/2019 | 15:00</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(
    // state => state.forgotPassword,
    // dispatch => bindActionCreators(actionCreators, dispatch)
)(News);