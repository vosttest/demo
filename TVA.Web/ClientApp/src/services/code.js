/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 14/02/2019 09:39
 * Update       : 14/02/2019 09:39
 * Checklist    : 1.0
 * Status       : OK
 */

import { ApiService } from './api';

export class CodeService {
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
        return this.api.post('Code/create', body);
    }

    /**
     * Read
     * @param {*} body
     */
    read(body) {
        return this.api.post('Code/read', body);
    }

    /**
     * Update
     * @param {*} body
     */
    update(body) {
        return this.api.put('Code/update', body);
    }

    /**
     * Delete
     * @param {*} body
     */
    delete(body) {
        return this.api.delete('Code/delete', body);
    }

    /**
     * Get all Code By Code Type
     * @param {*} body
     */
    getAllCodeByCodeType(body) {
        return this.api.post('Code/read-by-code-type', body);
    }

    //#endregion
}