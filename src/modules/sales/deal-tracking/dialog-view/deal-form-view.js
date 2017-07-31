import {inject, useView} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Service} from "../service";

var CompanyLoader = require('../../../../loader/company-loader');
var ContactLoader = require('../../../../loader/contact-loader');

@inject(DialogController, Service)
@useView("./deal-form-view.html")
export class DealFormView {
    constructor(controller, service) {
        this.controller = controller;
        this.service = service;
        this.data = {};
        this.error = {};

        this.stageData = [];
    }

    async activate(params) {
        this.type = params.type;

        if (this.type == "Add") {
            this.stageData = params.stages;
        }
        else {
            this.isEdit = true;

            await this.service.getDealById(params.id)
                .then((result) => {
                    this.data = result;
                });

            this.data.stage = params.stageName;
        }

        this.data.currency = params.currency;
    }

    attached() {
        this.numeric.addEventListener("keydown", this.keydownCallback, false);
    }

    save() {
        this.error = {};

        this.data.amount = this.data.amount || 0;

        if (this.type == "Add") {
            this.data.stageId = this.data.stage._id;

            this.service.createDeal(this.data)
                .then((result) => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
        else {
            this.service.updateDeal(this.data)
                .then((result) => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    get companyLoader() {
        return CompanyLoader;
    }

    get contactLoader() {
        return ContactLoader;
    }

    contactView = (contact) => {
        return `${contact.firstName} ${contact.lastName}`;
    }

    keydownCallback(e) {
        var keyCode = e.keyCode;

        if ([46, 8, 9, 27, 13, 110, 190].indexOf(keyCode) !== -1 ||
            (keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (keyCode >= 35 && keyCode <= 39)) {
            return;
        }

        if ((e.shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
            e.preventDefault();
        }
    }
}