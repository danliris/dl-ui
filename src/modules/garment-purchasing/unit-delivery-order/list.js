import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Rincian"]

    columns = [
        
        { field: "UnitDONo", title: "No. Delivery Order" },
        { field: "RONo", title: "No. RO" },
        { field: "Artcle", title: "Artikel" },
        {
            field: "UnitDODate", title: "Tanggal DeliveryOrder", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "UnitDOType", title: "Jenis Delivery Order" },
        { field: "UnitRequest.Name", title: "Unit Yang Meminta" },
        { field: "Storage.Name", title: "Gudang Yang Mengirim" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            //select: ["date", "no", "supplier.name", "items.prNo", "isPosted", "isApproved", "isOverBudget"],
            order: order
        }
        
        return this.service.search(arg)
            .then(result => {
                var data = {};
                data.total = result.info.total;
                data.data = result.data;
                console.log(data.data);
                data.data.forEach(s => {
                    s.toString = function () {
                        var str = "<ul>";
                        for (var item of s.Items) {
                            str += `<li>${item.RONo}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
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
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.IsPosted;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}