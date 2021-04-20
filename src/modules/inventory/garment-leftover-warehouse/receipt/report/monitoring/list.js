import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.types = ["FABRIC", "ACCESSORIES"];
        this.error = {};
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "index", title: "No", sortable: false, width: '2%' },
        { field: "ReceiptNoteNo", title: "No Bon Terima", sortable: false, width: '5%' },
        {
            field: "ReceiptDate", title: "Tgl Bon Terima", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }, width: '5%'
        },
        { field: "UENNo", title: "No BUK", sortable: false, width: '5%' },
        { field: "UnitFrom.Code", title: "Asal Barang", sortable: false, width: '3%' },
        { field: "POSerialNumber", title: "Nomor PO", sortable: false, width: '5%' },
        { field: "Product.Name", title: "Nama Barang", sortable: false, width: '5%' },
        { field: "Product.Code", title: "Kode Barang", sortable: false, width: '5%' },
        { field: "ProductRemark", title: "Keterangan Barang", sortable: false, width: '20%'},
        { field: "FabricRemark", title: "Konstruksi" , sortable: false, width: '10%'},
        { field: "Quantity", title: "Qty", sortable: false, width: '5%' },
        { field: "Uom.Unit", title: "Satuan", sortable: false, width: '5%' },
        { field: "CustomsNo", title: "Asal BC Masuk", sortable: false, width: '5%' },
        { field: "CustomsType", title: "Tipe BC", sortable: false, width: '5%' },
        {
            field: "CustomsDate", title: "Tgl BC", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }, width: '5%'
        },
    ];

    search() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.mdnTable.refresh();
        }
    }

    reset() {
        this.unit = undefined;
        this.type = "";
        this.date = undefined;
        this.error = {};

        this.flag = false;
        this.mdnTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            type: this.type,
            dateFrom: moment(this.dateFrom).format("MM/DD/YYYY"),
            dateTo:moment(this.dateTo).format("MM/DD/YYYY"),
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    XLS() {
        this.error = {};

        if (!this.date || this.date == "Invalid Date")
            this.error.date = "Tanggal harus diisi";

        if (!this.unit)
            this.error.unit = "Unit harus diisi";

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
                unitId: this.unit ? this.unit.Id : "",
                unitName: this.unit ? this.unit.Name : "",
                type: this.type,
                date: moment(this.date).format("MM/DD/YYYY")
            };

            this.service.pdf(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get unitLoader() {
        return UnitLoader;
    }
}
