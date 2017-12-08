import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.isConfirmed)
            return { classes: "success" }
        if (data.isCanceled)
            return { classes: "danger" }
        else
            return {}
    }

    context = ["detail"]

    columns = [
        { field: "bookingDate", title: "Tanggal Booking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
         },
         { field: "garmentBuyerName", title: "Buyer" },
         { field: "orderQuantity", title: "Jumlah Order" },
        {
            field: "deliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
                field: "isConfirmed", title: "Status",
                formatter: function (value, data, index) {
                    return data.isCanceled ? "DIBATALKAN" : value ? "SUDAH KONFIRMASI" : "TUNGGU KONFIRMASI";
                }
            },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
           // select:["isConfirmed", "bookingDate", "garmentBuyerName", "style.code", "standardHour.shSewing", "orderQuantity", "deliveryDate"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                // return data;
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
        }
    }

    // posting() {
    //     if (this.dataToBePosted.length > 0) {
    //         this.service.posting(this.dataToBePosted).then(result => {
    //             this.table.refresh();
    //         }).catch(e => {
    //             this.error = e;
    //         })
    //     }
    // }

    create() {
        this.router.navigateToRoute('create');
    }
}