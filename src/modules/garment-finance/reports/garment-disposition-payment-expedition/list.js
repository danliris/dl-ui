import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/garment-supplier-loader");
const AccountLoader = require("../../../../loader/account-loader");
const DispositionLoader = require("../../shared/disposition-note-loader");

@inject(Service)
export class List {

  columns = [
    [
      { field: "DispositionNoteNo", title: "No. Disposisi", rowspan: 2 },
      { field: "DispositionNoteDate", title: "Tgl. Disposisi", rowspan: 2 },
      { field: "DispositionNoteDueDate", title: "Tgl. Jatuh Tempo", rowspan: 2 },
      { field: "ProformaNo", title: "Nomor Proforma", rowspan: 2 },
      { field: "SupplierName", title: "Supplier", rowspan: 2 },
      { field: "CurrencyCode", title: "Kurs", rowspan: 2 },
      { title: "Jumlah", colspan: 5 },
      { field: "CategoryName", title: "Kategori", rowspan: 2 },
      { field: "PositionDescription", title: "Posisi", rowspan: 2 },
      { field: "SendToPurchasingRemark", title: "Alasan Retur", rowspan: 2 },
      { field: "SendToVerificationDate", title: "Tanggal Pembelian Kirim", rowspan: 2 },
      { title: "Verifikasi", colspan: 2 },
      { field: "VerifiedBy", title: "Verifikator", rowspan: 2 },
      { title: "Kasir", colspan: 5 },
      { field: "ExternalPurchaseOrderNo", title: "PO Eksternal", rowspan: 2 },
      { field: "DispositionNoteQuantity", title: "Qty Disposisi", rowspan: 2 },
      { field: "DeliveryOrderNo", title: "Nomor Surat Jalan", rowspan: 2 },
      { field: "DeliveryOrderQuantity", title: "Qty Surat Jalan", rowspan: 2 },
      { field: "DeliveryOrderNo", title: "Nomor Surat Jalan", rowspan: 2 },
      { field: "BillsNo", title: "Nomor BP Kecil", rowspan: 2 },
      { field: "PaymentBils", title: "Nomor BP Besar", rowspan: 2 },
      { field: "CustomsNoteNo", title: "Nomor Beacukai", rowspan: 2 },
      { field: "CustomsNoteDate", title: "Tanggal Beacukai", rowspan: 2 },
      { field: "UnitReceiptNoteNo", title: "Nomor Bon Terima", rowspan: 2 },
      { field: "InternalNoteNo", title: "Nomor Nota Intern", rowspan: 2 },
      { field: "InternalNoteDate", title: "Tanggal Nota Intern", rowspan: 2 },
      { field: "PurchasingStaff", title: "Staff", rowspan: 2 }
    ],
    [
      { field: "DPPAmount", title: "DPP" },
      { field: "VATAmount", title: "PPN" },
      { field: "IncomeTaxAmount", title: "PPh" },
      { field: "OthersExpenditureAmount", title: "Biaya Lain-lain" },
      { field: "TotalAmount", title: "Total" },
      { field: "VerificationAcceptedDate", title: "Tgl Terima" },
      { field: "VerifiedDate", title: "Tgl Kirim" },
      { field: "CashierAcceptedDate", title: "Tgl Terima" },
      { field: "BankExpenditureNoteDate", title: "Tgl Bayar" },
      { field: "BankExpenditureNoteNo", title: "No Bukti Pengeluaran Bank" },
      { field: "PaidAmount", title: "Nominal Yang Dibayar" },
      { field: "CurrencyCode", title: "Mata Uang" }
    ]
  ]

  itemYears = [];
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
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.purchase = 0;
    this.payment = 0;
    this.closingBalance = 0;
    this.itemMonths = [
      { text: "January", value: 1 },
      { text: "February", value: 2 },
      { text: "March", value: 3 },
      { text: "April", value: 4 },
      { text: "May", value: 5 },
      { text: "June", value: 6 },
      { text: "July", value: 7 },
      { text: "August", value: 8 },
      { text: "September", value: 9 },
      { text: "October", value: 10 },
      { text: "November", value: 11 },
      { text: "Desember", value: 12 },
    ];
    this.currentYear = moment().format("YYYY");

    this.info.month = { text: "January", value: 1 };
    this.info.year = this.currentYear;

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }

  async bind() {
    console.log("here");
    this.positionOptions = await this.service.getPosition()
      .then((response) => response.data)
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  supplierView = (supplier) => {
    return supplier.code + " - " + supplier.name;
  };

  loader = (info) => {

    let dispositionId = this.info && this.info.dispositionNote ? this.info.dispositionNote.Id : 0;
    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;
    let position = this.info && this.info.position ? this.info.position.Value : 0;
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("YYYY-MM-DD") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("YYYY-MM-DD") : null;
    let purchasingStaff = this.info && this.info.account ? this.info.account.username : null;


    let params = {
      dispositionId, supplierId, position, startDate, endDate, purchasingStaff
    };


    return this.flag
      ? this.service.search(params).then((result) => {

        return {
          total: 0,
          data: result.data
        };
      })
      : { total: 0, data: [] };
  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  excel() {
    let dispositionId = this.info && this.info.dispositionNote ? this.info.dispositionNote.Id : 0;
    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;
    let position = this.info && this.info.position ? this.info.position.Value : 0;
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("YYYY-MM-DD") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("YYYY-MM-DD") : null;
    let purchasingStaff = this.info && this.info.account ? this.info.account.username : null;


    let params = {
      dispositionId, supplierId, position, startDate, endDate, purchasingStaff
    };

    this.service.getXls(params);

    // this.getExcelData();
  }

  pdf() {
    let dispositionId = this.info && this.info.dispositionNote ? this.info.dispositionNote.Id : 0;
    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;
    let position = this.info && this.info.position ? this.info.position.Value : 0;
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("YYYY-MM-DD") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("YYYY-MM-DD") : null;
    let purchasingStaff = this.info && this.info.account ? this.info.account.username : null;


    let params = {
      dispositionId, supplierId, position, startDate, endDate, purchasingStaff
    };

    this.service.getPdf(params);

    // this.getExcelData();
  }

  reset() {
    this.flag = false;
    this.info.supplier = undefined;
    this.info.position = this.positionOptions[0];
    this.info.dispositionNote = undefined;
    this.info.startDate = null;
    this.info.endDate = null;
    this.data = [];
    this.tableList.refresh();
  }

  get accountLoader() {
    return AccountLoader;
  }

  get dispositionLoader() {
    return DispositionLoader;
  }
}
