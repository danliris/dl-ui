import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBePosting = [];
    info = { page: 1, keyword: '' };

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {
        this.info.keyword = '';
        this.info.order = '';
        var result = await this.service.search(this.info);
        var dataSales = result.data;
        this.info = result.info;
        this.data=[];
        for(var i of dataSales){
            var dataId=i._id;
            for(var j of i.productionOrders){
                j.dataId=i._id;
                this.data.push(j);
            }
        }
    }

    view(data,no) {
        this.router.navigateToRoute('view', { id: data.dataId, no: `${data.orderNo}` });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    exportPDF(data) {
        this.service.getPdfById(data.dataId,data.orderNo);
    }
}