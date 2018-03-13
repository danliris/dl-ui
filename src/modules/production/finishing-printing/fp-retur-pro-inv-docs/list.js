import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["detail","Cetak PDF"];
    columns = [
        { field: "Code", title: "No. Bon Retur Barang" },
        { field: "Bon.No", title: "No. Bon Pengantar Greige" },
        { field: "Supplier.name", title: "Supplier" },
        {
            field: "_CreatedUtc", title: "Tanggal", formatter: (value, data) => {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "Total", title: "Total" },
        { field: "TotalLength", title: "Total Panjang (Meter)" },
    ]

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var results = []
                for (var data of result.data) {
                    data.Total = 0;
                    data.TotalLength = 0;

                    for (var i of data.Details) {
                        data.Total += i.Quantity;
                        data.TotalLength += i.Length;
                    }
                    results.push(data);
                }
                return {
                    total: result.info.total,
                    data: results,
                }
            });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

}

