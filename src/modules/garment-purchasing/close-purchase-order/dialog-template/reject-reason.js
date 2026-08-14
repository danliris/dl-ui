import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView('./reject-reason.html')
export class RejectReason {

    constructor(controller) {
        this.controller = controller;
        this.reason = '';
    }

    activate(data) {
        this.title = data.title || 'Alasan';
        this.message = data.message || '';
    }

    submit() {
        if (!this.reason || !this.reason.trim()) {
            alert('Alasan wajib diisi');
            return;
        }

        this.controller.ok(this.reason.trim());
    }
}