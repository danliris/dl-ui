import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

        this.context = ["Rincian", "Cetak PDF"];
        this.columns = [
            { field: "no", title: "Nomor Koreksi Harga" },
            { field: "correctionType", title: "Jenis Koreksi" },
            {
                field: "date", title: "Tanggal Koreksi Harga",
                formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "deliveryOrder.supplier.name", title: "Supplier" },
            { field: "deliveryOrder.no", title: "Nomor Surat Jalan" },
        ];
    }

    create() {
        this.router.navigateToRoute("create");
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian": this.router.navigateToRoute('view', { id: data._id }); break;
            case "Cetak PDF": this.service.getPdfById(data._id); break;
        }
    }

    loadData = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            select: ["no", "correctionType", "date", "deliveryOrder.supplier.name", "deliveryOrder.no"]
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }
}