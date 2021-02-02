import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "DocumentNo", title: "No. Bukti Pengeluaran Bank" },
        {
            field: "Date",
            title: "Tanggal",
            formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "BankName", title: "Bank" },
        { field: "TotalAmount", title: "Total DPP + PPN" },
        { field: "CurrencyCode", title: "Mata Uang" },
        { field: "SupplierName", title: "Supplier" },
        { field: "DocumentNoInternalNotes", title: "Nota Intern" }
    ];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        else
            order["Date"] = "desc";

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        };
        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.info = {};
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    reset() {
        this.tableList.refresh();
    }

    search() {
        this.error = {};
        this.tableList.refresh();
    }
}