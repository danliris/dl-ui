import {inject, useView} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Service} from "../service";
import {Dialog} from '../../../../components/dialog/dialog';
import {HyperlinkFormView} from './hyperlink-form-view';

var AccountLoader = require("../../../../loader/account-loader");

@inject(DialogController, Service, Dialog)
@useView("./activity-form-view.html")
export class ActivityFormView {
    constructor(controller, service, dialog) {
        this.controller = controller;
        this.service = service;
        this.dialog = dialog;
        this.data = {};
        this.attachments = [];
        this.error = {};
    }

    async activate(params) {
        this.type = params.type;

        this.formatBytes = params.formatBytes;

        if (this.type == "NOTES") {
            this.isNotes = true;
        }

        await this.service.getActivityById(params.id)
            .then((result) => {
                this.data = result;
                this.currentAttachments = this.data.field.attachments;
            });
    }

    uploadFile() {
        var fileUpload = document.getElementById("dialogFileUpload");

        if (fileUpload) {
            for (var file of fileUpload.files) {
                file.newSize = this.formatBytes(file.size);
                this.attachments.push(file);
            }
        }
    }

    deleteAttachment(index) {
        this.attachments.splice(index, 1);
    }

    save() {
        this.error = {};

        if (this.data.type == "NOTES") {
            if (!this.data.field.notes || this.data.field.notes === "")
                this.error.notes = "Notes is required";
            else {
                this.data.field.attachments = this.attachments;
                this.data.update = true;

                this.service.upsertActivityAttachment(this.data)
                    .then((result) => {
                        this.controller.ok(this.data.field);
                    })
                    .catch(e => {
                        this.error = e;
                    });
            }
        }
        else {
            this.service.updateActivity(this.data)
                .then((result) => {
                    this.controller.ok(this.data.field);
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    createHyperlink() {
        this.dialog.show(HyperlinkFormView, {})
            .then(response => {
                if (!response.wasCancelled) {
                    this.data.field.notes += `<a href='${response.output.url}' target='${response.output.newTab}'>${response.output.linkText}</a>`;
                }
            });
    }

    get accountLoader() {
        return AccountLoader;
    }
}