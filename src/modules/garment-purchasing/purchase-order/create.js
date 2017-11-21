import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = [];
    dataToBeSaved = [];
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    };
    purchaseRequestTable;
    purchaseRequestColumns = [
        {
            field: "check", title: " ", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.check;
                return ""
            }
        },
        { title: "Nomor RO", field: "roNo" },
        { title: "Nomor PR", field: "no" },
        { title: "Nomor Ref. PO", field: "items.refNo" },
        { title: "Buyer", field: "buyer" },
        { title: "Unit", field: "unit" },
        { title: "Artikel", field: "artikel" },
        { title: "K e t e r a n g a n", field: "items.remark" },
        {
            title: "Tgl. Shipment", field: "shipmentDate", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { title: "Nama Barang", field: "items.product" },
        { title: "Jumlah", field: "items.quantity" },
        { title: "Satuan", field: "items.uom" }
    ];
    controlOptions = {
        control: {
            length: 12
        }
    };
    label = "Periode Tgl. Shipment"
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        if (this.dataToBeSaved.length === 0) {
            alert(`Purchase Request belum dipilih`);
        }
        else {
            this.service.create(this.dataToBeSaved)
                .then(result => {
                    alert(`${this.dataToBeSaved.length} data berhasil ditambahkan`);
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    search() {
        this.service.searchByTags(this.keywords, this.shipmentDateFrom, this.shipmentDateTo)
            .then(result => {
                this.data = result.data;
                this.data
                    .map((data) => {
                        data.check = false;
                    });
                this.purchaseRequestTable.data = this.data;
                this.purchaseRequestTable.refresh();
            })
            .catch(e => {
                this.error = e;
            })
    }
}