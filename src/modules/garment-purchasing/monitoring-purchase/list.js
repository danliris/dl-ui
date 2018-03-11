import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var Unit = require('../../../loader/unit-loader');
var Supplier = require('../../../loader/garment-supplier-loader');
var Category = require('../../../loader/garment-category-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.poStates = this.poStates.map(poState => {
            poState.toString = function () {
                return this.name;
            }
            return poState;
        })
    }

    poStates = [
        {
            "name": "",
            "value": -1
        }, {
            "name": "Dibatalkan",
            "value": 0
        }, {
            "name": "PO Internal belum diorder",
            "value": 1
        }, {
            "name": "Sudah dibuat PO Eksternal",
            "value": 2
        }, {
            "name": "Sudah diorder ke Supplier",
            "value": 3
        }, {
            "name": "Barang sudah datang parsial",
            "value": 4
        }, {
            "name": "Barang sudah datang",
            "value": 5
        }, {
            "name": "Barang sudah diterima Unit parsial",
            "value": 6
        }, {
            "name": "Barang sudah diterima Unit",
            "value": 7
        }, {
            "name": "Sebagian sudah dibuat SPB",
            "value": 8
        }, {
            "name": "Complete",
            "value": 9
        }
    ];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    Values() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null;
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null;
        this.arg.purchaseOrderExternalNo = this.purchaseOrderExternalNo ? this.purchaseOrderExternalNo : null;
        this.arg.roNo = this.roNo ? this.roNo : null;
        this.arg.supplierId = this.supplier ? this.supplier._id : null;
        this.arg.categoryId = this.category ? this.category._id : null;
        this.arg.unitId = this.unit ? this.unit._id : null;
        this.arg.state = this.poState ? this.poState.value : null;
        this.arg.artikel = this.artikel ? this.artikel : null;
        this.arg.prRefNo = this.prRefNo ? this.prRefNo : null;
        this.arg.deliveryOrderNo = this.deliveryOrderNo ? this.deliveryOrderNo : null;
    }


    listDataFlag = false;

    columns = [
        { field: "no", title: "No.", sortable: false },
        { field: "prDate", title: "Tanggal Purchase Request" },
        { field: "prNo", title: "No. Purchase Request" },
        { field: "unit", title: "Unit" },
        { field: "division", title: "Divisi" },
        { field: "refNo", title: "No. Ref. Purchase Request" },
        { field: "roNo", title: "No. RO" },
        { field: "buyerCode", title: "Buyer" },
        { field: "buyerName", title: "Nama Buyer" },
        { field: "shipmentDate", title: "Shipment Garment" },
        { field: "artikel", title: "Artikel" },
        { field: "category", title: "Kategori" },
        { field: "productName", title: "Nama Barang" },
        { field: "productCode", title: "Kode Barang" },
        { field: "productDesc", title: "Keterangan Barang" },
        { field: "dealQuantity", title: "Jumlah Barang"},
        { field: "dealUom", title: "Satuan Barang" },
        { field: "budgetPrice", title: "Harga Budget" },
        { field: "pricePerItem", title: "Harga Satuan Beli" },
        { field: "priceTotal", title: "Harga Total" },
        { field: "currency", title: "Mata Uang" },
        { field: "currencyRate", title: "Kurs"},
        { field: "priceTtl", title: "Harga Total Rp"},
        { field: "supplierCode", title: "Kode Supplier" },
        { field: "supplierName", title: "Nama Supplier" },
        { field: "poIntCreatedDate", title: "Tanggal Terima PO Internal" },
        { field: "poExtNo", title: "No. PO Eksternal" },
        { field: "poExtDate", title: "Tanggal PO Eksternal" },
        { field: "poExtExpectedDeliveryDate", title: "Tanggal Target Datang" },
        { field: "poExtPPN", title: "Dikenakan PPN" },
        { field: "poExtPPH", title: "Dikenakan PPH" },
        { field: "poExtVat", title: "PPH" },
        { field: "deliveryOrderNo", title: "No. Surat Jalan" },
        {
            field: "deliveryOrderUseCustoms", title: "Dikenakan Bea Cukai",
            formatter: function (value, row, index) {
                return value ? "Ya" : "Tidak";
            }
        },
        { field: "supplierDoDate", title: "Tanggal Surat Jalan" },
        { field: "deliveryOrderDate", title: "Tanggal Datang Barang" },
        { field: "deliveryOrderDeliveredQuantity", title: "Jumlah Barang Datang" },
        { field: "remainQuantity", title: "Jumlah Barang Sisa" },
        { field: "dealUom", title: "Satuan" },
        { field: "customsNo", title: "No. Bea Cukai" },
        { field: "customsDate", title: "Tanggal Bea Cukai" },
        { field: "unitReceiptNoteNo", title: "No. Bon Terima Unit" },
        { field: "unitReceiptNoteDate", title: "Tanggal Bon Terima Unit" },
        { field: "unitReceiptNoteDeliveredQuantity", title: "Jumlah Barang Diterima" },
        { field: "unitReceiptDeliveredUom", title: "Satuan Barang Diterima" },
        { field: "invoiceNo", title: "No. Invoice" },
        { field: "invoiceDate", title: "Tanggal Invoice" },
        {
            field: "invoiceUseIncomeTax", title: "Dikenakan PPN",
            formatter: function (value, row, index) {
                return value ? "Ya" : "Tidak";
            }
        },
        { field: "invoiceIncomeTaxNo", title: "No. PPN" },
        { field: "invoiceIncomeTaxDate", title: "Tanggal PPN" },
        { field: "incomeValue", title: "Nilai PPN" },
        {
            field: "invoiceUseVat", title: "Dikenakan PPH",
            formatter: function (value, row, index) {
                return value ? "Ya" : "Tidak";
            }
        },
        { field: "invoiceVat", title: "Jenis PPH" },
        { field: "invoiceVatNo", title: "No. PPH" },
        { field: "invoiceVatDate", title: "Tanggal PPH" },
        { field: "vatValue", title: "Nilai PPH" },
        { field: "interNoteNo", title: "No. Nota Intern" },
        { field: "interNoteDate", title: "Tanggal Nota Intern" },
        { field: "interNoteValue", title: "Nilai Nota Intern" },
        { field: "interNoteDueDate", title: "Tanggal Jatuh Tempo" },
        { field: "correctionNo", title: "No. Koreksi", sortable: false },
        { field: "correctionDate", title: "Tanggal Koreksi", sortable: false },
        { field: "correctionPriceTotal", title: "Nilai Koreksi", sortable: false },
        { field: "correctionRemark", title: "Ket. Koreksi", sortable: false },
        { field: "remark", title: "Keterangan" },
        { field: "status", title: "Status" }
    ]

    rowFormatter(data, index) {
        if (data.statusValue === 4 || data.statusValue === 6 || data.statusValue === 8) {
            return { classes: "warning" }
        } else if (data.statusValue > 4) {
            return { classes: "success" };
        }
        else {
            return {};
        }
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.listDataFlag ? (
            this.Values(),
            this.service.search(this.arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data,
                    }
                })
        ) : { total: 0, data: {} };
    }

    ExportToExcel() {
        this.Values();
        this.service.generateExcel(this.arg);
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    get unitLoader() {
        return Unit;
    }

    get supplierLoader() {
        return Supplier;
    }

    get categoryLoader() {
        return Category;
    }

    reset() {
        this.purchaseOrderExternalNo = "";
        this.unit = "";
        this.category = "";
        this.supplier = "";
        this.artikel = "";
        this.prRefNo = "";
        this.deliveryOrderNo = "";
        this.roNo = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.poState = this.poStates[0];
        this.table.refresh();
    }

}