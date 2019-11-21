import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { ServiceCore } from "./service-core";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service, ServiceCore)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "DocumentNo", title: "No. Bukti Pengeluaran" },
        {
            field: "Date", title: "Tanggal", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            }
        },
        {
            field: "AccountBank", title: "Nama Bank", formatter: function (value, data, index) {
                return `${value.AccountName} - ${value.AccountNumber}`;
            }
        },
        {
            field: 'Total', title: 'Total', formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            }
        },
        {
            field: "AccountBank", title: "Mata Uang", formatter: function (value, data, index) {
                return `${value.Currency.Code}`;
            }
        },
        { field: "Type", title: "Jenis Transaksi" }
    ];

    loader = (info) => {

        // if (info.sort)
        //     order[info.sort] = info.order;
        // else
        //     order["Date"] = "desc";

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
        };

        return this.service.search(arg)
            .then(result => {

                let itemPromises = result.data.map((datum) => {
                    return this.serviceCore.getBankById(datum.AccountBankId)
                        .then((accountBank) => {
                            datum.AccountBank = accountBank;
                            return Promise.resolve(datum)
                        });
                });

                return Promise.all(itemPromises)
                    .then((items) => {
                        return {
                            total: result.info.total,
                            data: items
                        }
                    });
            });
    }

    constructor(router, service, serviceCore) {
        this.service = service;
        this.serviceCore = serviceCore;
        this.router = router;
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

    post() {
        this.router.navigateToRoute('post');
    }
}
