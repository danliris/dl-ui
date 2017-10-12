import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail", "Cetak PDF"];

    columns = [
        { field: "code", title: "Kode Pengiriman" },
        {
            field: "deliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "buyerCode", title: "Kode Buyer" },
        { field: "buyerName", title: "Nama Buyer" },
        { field: "_createdBy", title: "Dibuat Oleh" }
    ];

    loader = (info) => {
        var order = {};
        var filter = {
            isVoid: false
        }
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            filter: JSON.stringify(filter),
            order: order
        }

        return this.service.search(arg)
            .then((result) => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}