import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from "moment";
import numeral from "numeral";
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class List {
    columns = [
        [
          { field: "DispositionNoteNo", title: "No", rowspan: 2 },
          {
            field: "DispositionNoteDate", title: "Bukti", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, colspan: 2
          },
          { field: "DispositionNoteDueDate", title: "Disposisi", rowspan: 2 },
          { field: "ProformaNo", title: "Supplier", rowspan: 2 },
          { field: "SupplierName", title: "Umur Uang Muka", rowspan: 2 },
          { title: "Saldo Awal", colspan: 4 },
          { field: "CategoryName", title: "Kategori", rowspan: 2 },
          { field: "PositionDescription", title: "Posisi", rowspan: 2 },
          { field: "SendToPurchasingRemark", title: "Alasan Retur", rowspan: 2 },
          {
            field: "SendToVerificationDate", title: "Tanggal Pembelian Kirim", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, rowspan: 2
          },
          { title: "Verifikasi", colspan: 2 },
          { field: "VerifiedBy", title: "Verifikator", rowspan: 2 },
          { title: "Kasir", colspan: 5 },
          { field: "ExternalPurchaseOrderNo", title: "PO Eksternal", rowspan: 2 },
          {
            field: "DispositionQuantity", title: "Qty Disposisi", rowspan: 2, formatter: (value, data) => {
              return numeral(value).format("0,0.00")
            }, align: "right"
          },
          { field: "DeliveryOrderNo", title: "Nomor Surat Jalan", rowspan: 2 },
          {
            field: "DeliveryOrderQuantity", title: "Qty Surat Jalan", rowspan: 2, formatter: (value, data) => {
              return numeral(value).format("0,0.00")
            }, align: "right"
          },
          { field: "DeliveryOrderNo", title: "Nomor Surat Jalan", rowspan: 2 },
          { field: "PaymentBillsNo", title: "Nomor BP Kecil", rowspan: 2 },
          { field: "BillsNo", title: "Nomor BP Besar", rowspan: 2 },
          { field: "CustomsNoteNo", title: "Nomor Beacukai", rowspan: 2 },
          {
            field: "CustomsNoteDate", title: "Tanggal Beacukai", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, rowspan: 2
          },
          { field: "UnitReceiptNoteNo", title: "Nomor Bon Terima", rowspan: 2 },
          { field: "InternalNoteNo", title: "Nomor Nota Intern", rowspan: 2 },
          {
            field: "InternalNoteDate", title: "Tanggal Nota Intern", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, rowspan: 2
          },
          { field: "SendToVerificationby", title: "Staff", rowspan: 2 }
        ],
        [
            {
                field: "", title: "Tanggal", formatter: (value, data) => {
                    return numeral(value).format("0,0.00")
                }, align: "right"
            },
            {
                field: "", title: "No", formatter: (value, data) => {
                    return numeral(value).format("0,0.00")
                }, align: "right"
            },
            {
                field: "", title: "Nilai Disposisi", formatter: (value, data) => {
                    return numeral(value).format("0,0.00")
                }, align: "right"
            },
            {
                field: "", title: "Nilai Bayar", formatter: (value, data) => {
                    return numeral(value).format("0,0.00")
                }, align: "right"
            },
            {
                field: "", title: "Kurs", formatter: (value, data) => {
                    return numeral(value).format("0,0.00")
                }, align: "right"
            },
            {
                field: "", title: "Rupiah", formatter: (value, data) => {
                    return numeral(value).format("0,0.00")
                }, align: "right"
            },

          {
            field: "VerificationAcceptedDate", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, title: "Tgl Terima"
          },
          {
            field: "VerifiedDate", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, title: "Tgl Kirim"
          },
          {
            field: "CashierAcceptedDate", formatter: function (value, data, index) {
              return value ? moment(value).format("DD MMM YYYY") : "";
            }, title: "Tgl Terima"
          },
          {
            field: "BankExpenditureNoteDate", title: "Tgl Bayar"
          },
          { field: "BankExpenditureNoteNo", title: "No Bukti Pengeluaran Bank" },
          {
            field: "PaidAmount", title: "Nominal Yang Dibayar", formatter: (value, data) => {
              return numeral(value).format("0,0.00")
            }, align: "right"
          },
          { field: "CurrencyCode", title: "Mata Uang" }
        ]
      ]

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
        sortable: false,
        pagination: false,
      };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};

        this.isEmpty = true;
    }

    reset() {
        this.error = {};
        this.selectedDate = undefined;
        this.accountingBook = undefined;
        this.data.result = [];
        this.isEmpty = true;
    }

    get supplierLoader() {
        return SupplierLoader;
    }
}