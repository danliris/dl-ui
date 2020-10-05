import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class View {

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Back",
        editText: "Edit",
        deleteText: "Cancel",
        saveText: "Revisi",
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        var idx = 0;
        if (this.data.measurements) {
            for (var i of this.data.measurements) {
                i.MeasurementIndex = idx;
                idx++;
            }
        }

        if (this.data.section) {
            this.selectedSection = await this.coreService.getSectionById(this.data.section.id);
        }

        switch (this.data.status) {
            case "APPROVED_SHIPPING":
                this.deleteCallback = null;
            case "REJECTED_SHIPPING":
                this.saveCallback = null;
                break;
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    deleteCallback(event) {
        if (confirm("Cancel?")) {
            this.service.cancel(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

    saveCallback(event) {
        if (confirm("Revisi?")) {
            this.service.revise(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }
}
