/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 07/02/2019 23:59
 * Update       : 07/02/2019 23:59
 * Checklist    : 1.0
 * Status       : OK
 */

import { ApiService } from './api';

export class HolidayService {
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
        return this.api.post('Holiday/create', body);
    }

    /**
     * Read
     * @param {*} body
     */
    read(body) {
        return this.api.post('Holiday/read', body);
    }

    /**
     * Update
     * @param {*} body
     */
    update(body) {
        return this.api.put('Holiday/update', body);
    }

    /**
     * Delete
     * @param {*} body
     */
    delete(body) {
        return this.api.delete('Holiday/delete', body);
    }

    /**
     * Get all Holidays of Year
     * @param {*} body
     */
    getAllHolidays(body) {
        return this.api.post('Holiday/read-by-year', body);
    }

    //#endregion
}