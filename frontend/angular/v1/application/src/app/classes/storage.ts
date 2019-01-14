import { Injectable } from '@angular/core';

import { Window } from './window';

function get_session_storage() {
    return (typeof window !== 'undefined') ? window.sessionStorage : null;
}

@Injectable()
export class Storage {

    constructor(
        private window: Window
    ) {}

    get native_session_storage() {
        return this.window.native_window.sessionStorage;
    }
}
