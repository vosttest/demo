/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 07/02/2019 23:59
 * Update       : 12/02/2019 13:06
 * Checklist    : 1.0
 * Status       : OK
 */

import { ApiService } from './api';

export class LeaveService {
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
        return this.api.post('Leave/create', body);
    }

    /**
     * Create
     * @param {*} body
     */
    createFull(body) {
        return this.api.post('LeaveApply/create-full', body);
    }

    /**
     * Read
     * @param {*} body
     */
    getAllLeaveApply(body) {
        return this.api.post('LeaveApply/read-by-year', body);
    }

    /**
     * Read
     * @param {*} body
     */
    loadLeaveApplyDetail(body) {
        return this.api.post('LeaveApply/load-leave-apply-detail', body);
    }

    /**
     * Read
     * @param {*} body
     */
    read(body) {
        return this.api.post('Leave/read', body);
    }


    /**
     * Update
     * @param {*} body
     */
    update(body) {
        return this.api.put('Leave/update', body);
    }

    /**
     * Delete
     * @param {*} body
     */
    delete(body) {
        return this.api.delete('Leave/delete', body);
    }

    /**
     * Delete
     * @param {*} body
     */
    deleteApply(body) {
        return this.api.delete('LeaveApply/delete', body);
    }

    /**
     * Read
     * @param {*} body
     */
    loadCodeForLeaveApply(body) {
        return this.api.post('LeaveApply/load-code', body);
    }

    /**
     * Read
     * @param {*} body
     */
    loadLeaveBalance(body) {
        return this.api.post('LeaveApply/load-leave-balance', body);
    }

    //#endregion
}