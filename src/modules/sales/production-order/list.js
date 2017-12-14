import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    context = ["detail", "print"]

    columns = [
        {
            field: "toBeClosed", title: "Closed Checkbox", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.isClosed;
                return "";
            }
        },
        { field: "salesContractNo", title: "Nomor Sales Contract" },

        { field: "orderNo", title: "Nomor Order Produksi" },
        { field: "buyer.type", title: "Jenis Buyer" },
        { field: "buyer.name", title: "Buyer" },
        { field: "processType.name", title: "Jenis Proses" },
        {
            field: "deliveryDate", title: "Tanggal Delivery", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "isClosed", title: "Status",
            formatter: function (value, data, index) {
                return data.isClosed ? "Closed" : "Open";
            }
        }
    ];

    rowFormatter(data, index) {
        if (data.isClosed)
            return { classes: "danger" };
        else
            return {}
    }



    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            select: ["orderNo", "salesContractNo", "buyer", "deliveryDate", "processType", "isClosed"]
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                return data;
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
            case "print":
                this.service.getPdfById(data._id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "print":
                return data;
            default:
                return true;
        }
    }


    create() {
        this.router.navigateToRoute('create');
    }

    close() {
        if (this.dataToBeClosed.length > 0) {
            this.service.close(this.dataToBeClosed).then(result => {
                this.table.refresh();
            }).catch(e => {
                this.error = e;
            })
        }
    }
}

