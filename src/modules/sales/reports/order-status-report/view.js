import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import numeral from 'numeral';

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
        this.storageAndShipmentColumns = [this.columns.concat([{ field: "quantity", title: "Panjang Sudah Dikirim (m)" }])];
        this.sppNotInKanbanColumns = [this.columns.concat([{ field: "orderQuantity", title: "Panjang (m)" }])];

        let info = {
            year: this.year,
            month: this.month,
            orderType: this.orderType
        };

        this.data = await this.service.detail(info);

        let preTotal = 0, onTotal = 0, storageTotal = 0, shipmentTotal = 0, sppNotInKanbanTotal = 0;

        for (let pre of this.data.preProductionData) {
            preTotal += Number(pre.quantity);
            pre.quantity = numeral(pre.quantity).format('0,000.00');
        }

        this.preTotal = preTotal.toFixed(2);

        for (let on of this.data.onProductionData) {
            onTotal += Number(on.quantity);
            on.quantity = numeral(on.quantity).format('0,000.00');
        }

        this.onTotal = onTotal.toFixed(2);

        for (let storage of this.data.storageData) {
            storageTotal += Number(storage.quantity);
            storage.quantity = numeral(storage.quantity).format('0,000.00');
        }

        this.storageTotal = storageTotal.toFixed(2);

        for (let shipment of this.data.shipmentData) {
            shipmentTotal += Number(shipment.quantity);
            shipment.quantity = numeral(shipment.quantity).format('0,000.00');
        }

        this.shipmentTotal = shipmentTotal.toFixed(2);

        for (let spp of this.data.productionOrdersNotInKanban) {
            sppNotInKanbanTotal += Number(spp.orderQuantity);
            spp.orderQuantity = numeral(spp.orderQuantity).format('0,000.00');
        }

        this.sppNotInKanbanTotal = sppNotInKanbanTotal.toFixed(2);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }
}