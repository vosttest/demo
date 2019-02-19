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
export class GroupService {
    //#region -- Methods --

    /**
     * Initialize
     */
    constructor() {
        this.api = new ApiService();
    }

    /**
     * Read
     * @param {*} body
     */
    read(body) {
        return this.api.post('group/read', body);
    }

    //#endregion
}