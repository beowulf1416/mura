import { Injectable } from '@angular/core';

function get_window(): any {
    return window;
}

@Injectable()
export class Window {
    get native_window() {
        return get_window();
    }
}
