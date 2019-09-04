import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';

import moment from 'moment';
@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "SCNo", title: "No Sales Contract" },
        { field: "PRNo", title: "No PR" },
        { field: "PRType", title: "Jenis PR" },
        { field: "RONo", title: "NO Ro" },
        {
            field: "Date", title: "Tanggal PR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerCode", title: "Kode Buyer" },
        { field: "BuyerName", title: "Nama Buyer" },
        { field: "Article", title: "Kode Buyer" },
        {
            field: "ExpectedDeliveryDate", title: "Tanggal Diminta Datang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "IsValidatedMD1", title: "Approval Kabag", formatter: (value) => value ? "SUDAH" : "BELUM" },
        { field: "IsValidatedMD2", title: "Approval Kadiv", formatter: (value) => value ? "SUDAH" : "BELUM" },
        { field: "IsValidated", title: "Approval PPIC", formatter: (value) => value ? "SUDAH" : "BELUM" },
    ];

    rowFormatter = () => {
        return {};
    }

    loader = (info) => {
        let order = {};

        if (info.sort) {
            order[info.sort] = info.order;
        }

        const filter = {
            IsPosted: true,
            "PRType == \"MASTER\" || PRType == \"SAMPLE\"": true
        };

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
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

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        const type = parentInstruction.config.settings.type;

        switch (type) {
            case "MD1":
                this.rowFormatter = (data, index) => {
                    if (data.IsValidatedMD1) {
                        return { classes: "success" }
                    } else {
                        return { classes: "danger" }
                    }
                }
                break;
            case "MD2":
                this.rowFormatter = (data, index) => {
                    if (data.IsValidatedMD2) {
                        return { classes: "success" }
                    } else {
                        return { classes: "danger" }
                    }
                }
                break;
            case "PPIC":
                this.rowFormatter = (data, index) => {
                    if (data.IsValidated) {
                        return { classes: "success" }
                    } else {
                        return { classes: "danger" }
                    }
                }
                break;
        }
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