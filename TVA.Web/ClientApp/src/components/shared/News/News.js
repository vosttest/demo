import React from 'react';
import './News.css';

export default class News extends React.Component {
    render() {
        return (
            <section>
                <h5 className="title-news">Thể thao châu á</h5>
                <div className="row">
                    <div className="col-md-4">
                        <img className="responsive" src={require('../../shared/uae-qatar.jpg')} alt="Hình minh họa" />
                    </div>
                    <div className="col-md-8">
                        <div className="news">AFC điều tra hành vi ném giày dép của CĐV UAE vào tuyển Qatar</div>
                        <div className="news date-time">30/01/2019 | 15:00</div>
                    </div>
                </div>
            </section>
        )
    }
}