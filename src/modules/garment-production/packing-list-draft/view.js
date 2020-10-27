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
        saveText: "Save"
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);

        let idx=0;
        if(this.data.measurements){
            for(let i of this.data.measurements){
                i.MeasurementIndex=idx;
                idx++;
            }
        }

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            }
        }
        
        if (this.data.status != "DRAFT") {
            this.editCallback = null;
            this.deleteCallback = null;
        }

        switch (this.data.status) {
            case "DRAFT":
                this.formOptions.saveText = "Post Booking";
                break;
            case "DRAFT_POSTED":
                this.formOptions.saveText = "Unpost Booking";
                break;
            case "DRAFT_APPROVED_SHIPPING":
                this.formOptions.saveText = "Post Packing List";
                break;
            default:
                break;
        }

        switch (this.data.status) {
            case "REJECTED_MD":
                this.alertInfo = "<strong>Alasan Reject oleh Md:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "REJECTED_SHIPPING_UNIT":
                this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            default:
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
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

    saveCallback() {
        if (confirm(this.formOptions.saveText + "?")) {
            switch (this.data.status) {
                case "DRAFT":
                    this.service.postBooking(this.data.id)
                        .then(result => {
                            this.cancelCallback();
                        });
                    break;
                case "DRAFT_POSTED":
                    this.service.unpostBooking(this.data.id)
                        .then(result => {
                            this.cancelCallback();
                        });
                    break;
                case "DRAFT_APPROVED_SHIPPING":
                    this.formOptions.saveText = "Post Packing List";
                    break;
                default:
                    break;
            }
        }
    }
}
