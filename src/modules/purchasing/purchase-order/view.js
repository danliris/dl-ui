import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        this.data = await this.service.getById(id);
        if (!this.data.isPosted) {
            this.hasEdit = true;
            this.hasDelete = true;
        }
        if (this.data.countPRNo>1){
            this.hasDelete = false;
        }
        this.data.purchaseRequest=this.data;

        this.data.purchaseRequest.toString = function () {
            return `${this.prNo}`
        }
        this.purchaseRequest=this.data.purchaseRequest;
        
        this.data.purchaseRequest.date=this.data.prDate;

        this.data.purchaseRequest.unit.toString = function () {
            return [this.division.name, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }

        this.data.purchaseRequest.category.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }
        
            
        this.data.items.forEach(item => {
            item.product.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");      
            }
        })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }
}