import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/supplier-loader");
const DivisionLoader = require("../../../../loader/division-loader");

const BillNoLoader = require("../../shared/bill-no-loader");
const PaymentBillLoader = require("../../shared/payment-bill-loader");

@inject(Service)
export class List {
  purchasingCategoryOptions = ["", "Bahan Baku", "Bahan Embalage", "Bahan Pendukung"];
  supplierQuery = { Import: false };
  columns = [
    {
      field: "CustomsArrivalDate",
      title: "Tanggal Bon",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "";
      },
      align: "right",
    },
    { field: "SupplierName", title: "Supplier" },
    { field: "ProductName", title: "Keterangan" },
    { field: "GarmentDeliveryOrderNo", title: "No Surat Jalan" },
    { field: "BillNo", title: "No BP Besar" },
    { field: "PaymentBill", title: "No BP Kecil" },
    { field: "InvoiceNo", title: "No Invoice" },
    { field: "VATNo", title: "No Faktur Pajak" },
    { field: "InternalNoteNo", title: "No NI" },
    { field: "PurchasingCategoryName", title: "Kategori Pembelian" },
    { field: "AccountingCategoryName", title: "Kategori Pembukuan" },
    { field: "InternalNoteQuantity", title: "Quantity" },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "DPPAmount", title: "DPP" },
    { field: "VATAmount", title: "PPN" },
    { field: "IncomeTaxAmount", title: "PPh" },
    { field: "Total", title: "Total(IDR)" }
  ];

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
    this.data = [];
  }

  loader = (info) => {
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("MM/DD/YYYY") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("MM/DD/YYYY") : null;

    let params = {
      billNo: this.info.billNo,
      paymentBill: this.info.paymentBill,
      category: this.info.purchasingCategory,
      startDate: startDate,
      endDate: endDate
    };

    console.log(params);

    return this.flag
      ? this.service.search(params).then((result) => {
        // let before = {};

        // if (result.data.length != 0) {
        //     for (let i in result.data) {
        //         if (result.data[i].Currency != before.Currency) {
        //             before = result.data[i];
        //             before._Currency_rowspan = 1;
        //         } else {
        //             before._Currency_rowspan++;

        //             result.data[i].Currency = undefined;
        //         }
        //         result.data[i].Products = result.data[i].Products || "";
        //     }
        // }
        // setTimeout(() => {
        //     $('#credit-balance-table td').each(function () {
        //         if ($(this).html() === '-')
        //             $(this).hide();
        //     })
        // }, 10);

        return {
          total: 0,
          data: result.data.Data,
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
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("MM/DD/YYYY") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("MM/DD/YYYY") : null;

    let params = {
      billNo: this.info.billNo,
      paymentBill: this.info.paymentBill,
      category: this.info.purchasingCategory,
      startDate: startDate,
      endDate: endDate
    };

    this.service.getXls(params);

    // this.getExcelData();
  }

  pdf() {
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("MM/DD/YYYY") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("MM/DD/YYYY") : null;

    let params = {
      billNo: this.info.billNo,
      paymentBill: this.info.paymentBill,
      category: this.info.purchasingCategory,
      startDate: startDate,
      endDate: endDate
    };

    this.service.getPdf(params);

    // this.getExcelData();
  }

  reset() {
    this.flag = false;
    this.info.purchasingCategory = null;
    this.info.startDate = null;
    this.info.endDate = null;
    this.error = {};
    this.tableList.refresh();
    this.selectedBillNo = null;
    this.selectedPaymentBill = null;
  }

  get billNoLoader() {
    return BillNoLoader;
  }

  @bindable selectedBillNo;
  selectedBillNoChanged(newValue, oldValue) {
    if (newValue)
      this.info.billNo = newValue.Value;
    else
      this.info.billNo = null;
    console.log(newValue);
  }

  get paymentBillLoader() {
    return PaymentBillLoader;
  }

  @bindable selectedPaymentBill;
  selectedPaymentBillChanged(newValue, oldValue) {
    if (newValue)
      this.info.paymentBill = newValue.Value;
    else
      this.info.paymentBill = null;
    console.log(newValue);
  }
}
