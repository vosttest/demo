/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 15/02/2019 15:31
 * Update       : 15/02/2019 15:31
 * Checklist    : 1.0
 * Status       : OK
 */

import { ApiService } from './api';

export class PositionService {
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
        return this.api.post('Position/create', body);
    }

    /**
     * Read
     * @param {*} body
     */
    read(body) {
        return this.api.post('Position/read', body);
    }

    /**
     * Update
     * @param {*} body
     */
    update(body) {
        return this.api.put('Position/update', body);
    }

    /**
     * Delete
     * @param {*} body
     */
    delete(body) {
        return this.api.delete('Position/delete', body);
    }

    /**
     * Search Position By Key Word
     * @param {*} body 
     */
    readByKeyWord(body) {
        return this.api.post('Position/read-by-keyword', body);
    }

    //#endregion
}