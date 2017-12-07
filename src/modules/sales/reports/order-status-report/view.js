import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.title = "Detail Status Order";
    }

    formOptions = {
        cancelText: "Kembali"
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        { field: "no", title: "No." },
        { field: "orderNo", title: "No. SPP" },
        { field: "orderQuantity", title: "Panjang SPP (m)" },
        { field: "orderType.name", title: "Jenis Order" },
        { field: "processType.name", title: "Jenis Process" },
        { field: "buyer.name", title: "Buyer" },
        { field: "account.username", title: "Sales" },
        {
            field: "_createdDate", title: "Tgl Terima Order", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "deliveryDate", title: "Permintaan Delivery", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
    ]

    async activate(params) {
        this.year = params.year;
        this.month = params.month;
        this.orderType = params.orderType ? params.orderType : "-";

        this.preProductionColumns = [this.columns.concat([{ field: "processArea", title: "Area" }, { field: "quantity", title: "Panjang Belum Diproduksi (m)" }])];
        this.onProductionColumns = [this.columns.concat([{ field: "processArea", title: "Area" }, { field: "quantity", title: "Panjang Sudah Diproduksi (m)" }])];
        this.storageAndShipmentColumns = [this.columns.concat([{ field: "deliveredLength", title: "Panjang Sudah Dikirim (m)" }])];
        
        let info = {
            year: this.year,
            month: this.month,
            orderType: this.orderType
        };

        this.data = await this.service.detail(info);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }
}
