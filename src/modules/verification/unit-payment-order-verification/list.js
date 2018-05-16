import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { debug } from 'util';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian", "Cetak PDF"];
    columns = [
        // {
        //     field: "Date", title: "Tanggal Cek", formatter: (value, data) => {
        //         return moment(value).format("DD-MMM-YYYY");
        //     }
        // },
        { field: "_id", title: "No. SPB" },
        // {
        //     field: "Date", title: "Tanggal Cek", formatter: (value, data) => {
        //         return moment(value).format("DD-MMM-YYYY");
        //     }
        // },
        // { field: "Bon.no", title: "Supplier" },
        // { field: "Bon.unitName", title: "Divisi" },
        // { field: "Bon.unitName", title: "Status" },
        // {
        //     field: "Date", title: "Tanggal", formatter: (value, data) => {
        //         return moment(value).format("DD-MMM-YYYY");
        //     }
        // },
        // { field: "TotalQuantity", title: "Total Jumlah (Piece)" },
        // { field: "TotalLength", title: "Total Panjang (Meter)" },
        // { field: "Supplier.name", title: "Supplier" },
        // { field: "Status", title: "Status Retur" },
    ]

    // loader = (info) => {
    //     var order = {};
    //     if (info.sort)
    //         order[info.sort] = info.order;

    //     var arg = {
    //         page: parseInt(info.offset / info.limit, 10) + 1,
    //         size: info.limit,
    //         keyword: info.search,
    //         order: order
    //     }

    //     return this.service.search(arg)
    //         .then(result => {
    //             for (var _data of result.data) {
    //                 var btuNo = _data.items.map(function (item) {
    //                     return item
    //                 });
    //                 // _data.unitReceiptNoteNo = `<ul>${btuNo.join()}</ul>`;
    //             }
    //             debugger
    //             return {
    //                 total: result.info.total,
    //                 data: results.data,
    //             }
    //         });
    // }

    create() {
        this.router.navigateToRoute('create');
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

}

