import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "SCNo", title: "No Sales Contract" },
        { field: "PRNo", title: "No PR" },
        { field: "PRType", title: "Jenis PR" },
        { field: "RONo", title: "NO Ro" },
        { field: "Date", title: "Tanggal PR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerCode", title: "Kode Buyer" },
        { field: "BuyerName", title: "Nama Buyer" },
        { field: "Article", title: "Kode Buyer" },
        { field: "ExpectedDeliveryDate", title: "Tanggal Diminta Datang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "IsValidate", title: "Status",
          formatter: function (value,row,index){
              return value ? "APPROVED" : "NOT APPROVE";
          }},
    ];

    rowFormatter(data, index) {
        if (data.IsValidate)
            return { classes: "success" }
        else
            return {classes: "danger"}
    }

    loader = (info) => {
        let order = {};
        if (info.sort) {
          order[info.sort] = info.order;
        }
        let filter = {};
        filter["IsPosted == true && (PRType == \"MASTER\" || PRType == \"SAMPLE\")"] = true;
        let arg = {
          page: parseInt(info.offset / info.limit, 10) + 1,
          size: info.limit,
          keyword: info.search,
          // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
          order: order,
          filter: JSON.stringify(filter)
        }
        return this.service.search(arg)
        .then(result => {
            result.data.forEach(data => {
            data.BuyerCode = data.Buyer.Code;
            data.BuyerName = data.Buyer.Name;
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

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }
}