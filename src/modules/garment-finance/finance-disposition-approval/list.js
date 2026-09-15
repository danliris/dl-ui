import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { Base64Helper } from '../../../utils/base-64-coded-helper';
import { PurchasingExpeditionPosition } from './purchasing-expedition-position/purchasing-expedition-position';
import moment from 'moment';
import numeral from "numeral";

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    context = ["Detail"];

    columns = [
        { field: "DispositionNoteNo", title: "Nomor Disposisi Pembayaran" },
        {
            field: "DispositionNoteDate", title: "Tanggal Disposisi", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Category", title: "Kategori" },
        { field: "SupplierName", title: "Supplier" },
        {
            field: "DispositionNoteDueDate", title: "Tanggal Jatuh Tempo", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "CurrencyCode", title: "Mata Uang" },
        {
            field: "TotalPaid", title: "Nominal Disposisi", sortable: false, formatter: function (value, data, index) {
                return numeral(value).format("0,000.00");
            }
        }
    ];

    loader = (info) => {
        let order = {};

        if (info.sort) order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            position: PurchasingExpeditionPosition.SEND_TO_DIRECTOR,
        };

        return this.service.search(arg).then((result) => {
            return {
                total: result.info.total,
                data: result.data,
            };
        });
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        console.log(data);
        const dispotitionPurchaseIdEncoded = Base64Helper.encode(data.DispositionNoteId);
        const expeditionIdEncoded = Base64Helper.encode(data.Id);
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { dispotitionPurchaseId: dispotitionPurchaseIdEncoded, expeditionId: expeditionIdEncoded });
                break;
        }
    }

}