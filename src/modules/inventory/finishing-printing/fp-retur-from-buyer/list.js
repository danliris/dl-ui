import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    rowFormatter(data, index) {
    if (data.isPosted)
        return { classes: "success" }
    else
        return {}
    }

    context = ["detail","cetak PDF"]

    columns = [
        { field: "code", title: "Nomor Retur" },
        {
            field: "date", title: "Tanggal Retur", formatter: function (value, data, index) {
            return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "destination", title: "Yang Menerima" },
        { field: "buyer.name", title: "Terima Dari" },
        { field: "spk", title: "SPK" },
        { field: "coverLetter", title: "No. Surat Pengantar" }
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
            select: ["date", "code", "destination", "spk", "buyer", "coverLetter"],
            filter: JSON.stringify(filter),
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
        case "detail":
            this.router.navigateToRoute('view', { id: data._id });
            break;
        case "cetak PDF":
            this.service.getPdfById(data._id);
            break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
        case "view":
            return true;
        default:
            return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}