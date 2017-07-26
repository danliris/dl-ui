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

        if(this.type == "Add") {
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

    save() {
        this.error = {};

        if(this.type == "Add") {
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
}