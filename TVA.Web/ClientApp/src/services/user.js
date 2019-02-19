/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 29/01/2019 11:44
 * Update       : 12/02/2019 13:06
 * Checklist    : 1.0
 * Status       : OK
 */

import { ApiService } from './api';

/**
 * User service
 */
export class UserService {
    //#region -- Methods --

    /**
     * Initialize
     */
    constructor() {
        this.api = new ApiService();
    }

    /**
     * Create
     * @param {*} body
     */
    create(body) {
        return this.api.post('User/create', body);
    }

    /**
     * Read
     * @param {*} body
     */
    readProfile(body) {
        return this.api.put('user/read', body);
    }

    /**
     * Read
     * @param {*} body
     */
    read(body) {
        return this.api.post('User/read', body);
    }

    /**
     * Update
     * @param {*} body
     */
    update(body) {
        return this.api.put('User/update', body);
    }

    /**
     * Delete
     * @param {*} body
     */
    delete(body) {
        return this.api.put('User/delete', body);
    }

    /**
     * Sign in
     * @param {*} body
     */
    signIn(body) {
        return this.api.post('User/z-auth', body);
    }

    //#endregion
}