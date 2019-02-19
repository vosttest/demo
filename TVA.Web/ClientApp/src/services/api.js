/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 29/01/2019 11:44
 * Update       : 29/01/2019 11:44
 * Checklist    : 1.0
 * Status       : OK
 */

import { Token } from './../utilities';

/**
 * API service
 */
export class ApiService {
    //#region -- Methods --

    /**
     * Initialize
     */
    constructor() {
        this.timeout = 10000;

        if (process.env.NODE_ENV === 'production') {
            this.apiUrl = '';
        }
        else {
            this.apiUrl = process.env.REACT_APP_API_URL;
        }

        this.imgUrl = this.apiUrl + process.env.REACT_APP_IMG_URL;
        this.apiUrl += '/api/';
    }

    /**
     * Call API with POST method
     * @param {*} endPoint
     * @param {*} body
     */
    post(endPoint, body) {
        let o = this.getHeader('POST', body);
        return fetch(this.apiUrl + endPoint, o)
            .then(rsp => rsp.json())
            .catch(err => err);
    }

    /**
     * Call API with PUT method
     * @param {*} endPoint
     * @param {*} body
     */
    put(endPoint, body) {
        let o = this.getHeader('PUT', body);
        return fetch(this.apiUrl + endPoint, o)
            .then(rsp => rsp.json())
            .catch(err => err);
    }

    /**
     * Call API with DELETE method
     * @param {*} endPoint
     * @param {*} body
     */
    delete(endPoint, body) {
        let o = this.getHeader('DELETE', body);
        return fetch(this.apiUrl + endPoint, o)
            .then(rsp => rsp.json())
            .catch(err => err);
    }

    /**
     * Get header
     * @param {*} method
     * @param {*} body
     */
    getHeader(method, body) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let jwt = Token.get();
        let ok = !!jwt && !Token.isExpired(jwt);
        if (ok) {
            headers['Authorization'] = 'Bearer ' + jwt;
        }

        let res = {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
            timeout: this.timeout
        };

        return res;
    }

    //#endregion

    //#region -- Properties --

    /**
     * Get API URL
     */
    getApiUrl() {
        return this.apiUrl;
    }

    /**
     * Get imgage URL
     */
    getImgUrl() {
        return this.imgUrl;
    }

    //#endregion
}