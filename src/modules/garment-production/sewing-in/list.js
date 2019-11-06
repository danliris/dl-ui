import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian"];

    columns = [
        { field: "SewingInNo", title: "No Sewing In" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalQuantity", title: "Jumlah", sortable: false },
        { field: "TotalRemainingQuantity", title: "Sisa", sortable: false },
        { field: "RONo", title: "RO" },
        { field: "UnitCode", title: "Unit Sewing In"},
        { field: "UnitFromCode", title: "Asal Unit"},
        {
            field: "SewingInDate", title: "Tgl Sewing In", formatter: function (value, data, index) {
              return moment(value).format("DD MMM YYYY")
            },
        },
        
        { field: "Items", title: "Kode Barang", sortable: false },
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
        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
          }
        return this.service.search(arg)
        .then(result => {
            var data = {};
            data.total = result.info.total;
            data.data = result.data;
            data.data.forEach(s => {
                s.UnitCode=s.Unit.Code;
                s.UnitFromCode=s.UnitFrom.Code;
                if(s.Items){
                s.Items.toString = function () {
                    var str = "<ul>";
                    var products = [];
                    for (var item of s.Items) {
                        products.push(item.Product.Code)
                    }
                    var Products = products.filter(distinct);
                    for(var product of Products){
                    str += `<li>${product}</li>`;
                    }
                    str += "</ul>";
                    return str;
                        }
                }
                else{
                s.Items = "-";
                }
            });

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
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}