import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["detail", "cetak PDF"]

    columns = [
        { field: "GarmentExpenditureWasteNo", title: "No Bon Pengeluaran" },
        {
            field: "ExpenditureDate", title: "Tgl Pengeluaran Gudang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "WasteType", title: "Tipe Pengeluaran" },
        { field: "ExpenditureTo", title: "Tujuan Pengeluaran" },
        { field: "BCOutNo", title: "Nomor BC Keluar" },
        { field: "Description", title: "Keterangan" },
    ];

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
                // for (const data of result.data) {
                //     data.BuyerName = data.Buyer.Name;
                // }
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
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
