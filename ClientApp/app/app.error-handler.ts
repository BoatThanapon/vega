import { ToastyService } from 'ngx-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import * as Raven from 'raven-js';

export class AppErrorHandler implements ErrorHandler {

    constructor(
        @Inject(NgZone) private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService) { }

    handleError(error: any): void {
        this.ngZone.run(() => {
            if (typeof (window) !== 'undefined') {
                this.toastyService.error({
                    title: "Error",
                    msg: "The message error",
                    showClose: true,
                    timeout: 1000,
                    theme: 'default',
                });
            }
        })

        if (!isDevMode())
            Raven.captureException(error.originalError || error);
        else
            throw error;
    }

}