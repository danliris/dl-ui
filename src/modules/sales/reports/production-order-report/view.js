import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    listSPPColumns = [
        { value: "index", header: "No." },
        { value: "_id", header: "Nomor Order" },
        { value: "orderQuantity", header: "Jumlah Order" },
        { value: "uom", header: "Satuan" }
    ];

    listQCColumns = [
        { value: "index", header: "No." },
        { value: "productionOrderNo", header: "Nomor Order" },
        { value: "_id", header: "Grade" },
        { value: "qty", header: "Panjang" }
    ];

    listDOColumns = [
        { value: "index", header: "No." },
        { value: "orderNo", header: "Nomor Order" },
        { value: "color", header: "Warna yang Diminta" },
        { value: "machine", header: "Mesin" },
        { value: "step", header: "Step" },
        { value: "area", header: "Area" },
        { value: "qty", header: "Input" }
    ];

    orderNo = "";
    dailyOperations = [];
    productionOrders = [];
    async activate(params) {
        this.orderNo = params.id ? decodeURIComponent(params.id) : "-";
        // this.orderNo = params.id;
        this.data = await this.service.getDetailReport(params.id);
        this.productionOrders = this.data.productionOrders;
        this.dailyOperations = this.data.dailyOperations;
        this.qualityControls = this.data.qualityControls;

    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancel() {
        this.service.cancel(this.poExId).then(result => {
            this.list();
        }).catch(e => {
            this.error = e;
        })
    }
}