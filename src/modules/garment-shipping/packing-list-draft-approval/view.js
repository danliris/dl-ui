import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from "../../../au-components/dialog/dialog";
import { RejectDialog } from "../packing-list-approval/template/dialog/reject";

@inject(Router, Service, Dialog)
export class View {

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    formOptions = {
        cancelText: "Back",
        editText: "Approve",
        deleteText: "Cancel",
        saveText: "Reject",
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

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        if (confirm("Approve Draft Packing List?")) {
            this.service.approve(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

    deleteCallback(event) {
        if (confirm("Cancel?")) {
            this.service.cancel(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

    saveCallback(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Reject" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.reject({ id: this.data.id, reason: response.output })
                        .then(result => {
                            alert('Packing List berhasil diReject');
                            this.cancelCallback();
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Reject dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                }
            });
    }
}
