/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 02/02/2019 14:26
 * Update       : 02/02/2019 14:26
 * Checklist    : 1.0
 * Status       : OK
 */

var jwt = require('jsonwebtoken');

/**
 * Token name in local storage
 */
const ZJ = 'Z-JWT';

/**
 * Token
 */
export class Token {
    //#region -- Methods --

    /**
     * Get token in local storage
     */
    static get() {
        let res = localStorage.getItem(ZJ);
        return res;
    }

    /**
     * Set token to local storage
     * @param {*} token
     */
    static set(token) {
        this.remove();
        localStorage.setItem(ZJ, token);
    }

    /**
     * Update token to local storage
     * @param {*} token
     */
    static update(token) {
        let t = this.isExpired(token);
        if (t) {
            return;
        }

        this.set(token);
    }

    /**
     * Remove token in local storage
     */
    static remove() {
        localStorage.removeItem(ZJ);
    }

    /**
     * Decode token
     * @param {*} token
     */
    static decode(token) {
        let res = {};

        try {
            res = jwt.decode(token);
        }
        catch (ex) {
        }

        return res;
    }

    /**
     * Check token is expired
     * @param {*} token 
     */
    static isExpired(token) {
        try {
            let t1 = this.decode(token);
            let t2 = Date.now() / 1000;
            return t1.exp < t2;
        }
        catch (ex) {
            return false;
        }
    }

    /**
     * Check user is signed in
     */
    static isSignedIn() {
        let t = this.get();
        let res = !!t && !this.isExpired(t);
        return res;
    }

    /**
     * Get token information
     */
    static getInfo() {
        let t = this.get();
        let res = this.decode(t);
        return res;
    }

    /**
     * Get user information
     */
    static getUser() {
        let t = this.getInfo();
        let res = t.user;
        return res;
    }

    //#endregion
}