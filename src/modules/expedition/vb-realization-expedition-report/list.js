import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';

const DivisionLoader = require('../../../loader/division-loader');
const VBRealizationLoader = require('../loaders/vb-realization-loader');
const VBRequestLoader = require('../loaders/vb-request-loader');
const AccountLoader = require('../loaders/account-loader');
const UnitLoader = require('../loaders/unit-loader');

@inject(Service)
export class List {
  columns = [
    { field: 'VBNo', title: 'No VB' },
    { field: 'VBRealizationNo', title: 'No Realisasi VB' },
    { field: 'VBRequestName', title: 'Nama' },
    { field: 'UnitName', title: 'Bagian/Unit' },
    { field: 'DivisionName', title: 'Divisi' },
    {
      field: 'SendToVerificationDate', title: 'Tanggal Unit Kirim',
      formatter: function (value, data, index) {
        return value ? moment(value).format('DD/MM/YYYY') : '-';
      },
    },
    { field: 'Purpose', title: 'Keperluan' },
    { field: 'CurrencyCode', title: 'Mata Uang VB' },
    { field: 'VBAmount', title: 'Nominal VB' },
    { field: 'CurrencyCode', title: 'Mata Uang Realisasi' },
    { field: 'VBRealizationAmount', title: 'Nominal Realisasi' },
    {
      field: 'VerificationReceiptDate', title: 'Tanggal Terima Verifikasi',
      formatter: function (value, data, index) {
        return value ? moment(value).format('DD/MM/YYYY') : '-';
      },
    },
    { field: 'VerificationReceiptBy', title: 'Nama Verifikator' },
    {
      field: 'VerifiedToCashierDate', title: 'Tanggal Kirim Kasir/Retur',
      formatter: function (value, data, index) {
        return value ? moment(value).format('DD/MM/YYYY') : '-';
      },
    },
    { field: 'SalesReceiptNo', title: 'Keterangan' },
    {
      field: 'CashierReceiptDate', title: 'Tanggal Terima Kasir',
      formatter: function (value, data, index) {
        return value ? moment(value).format('DD/MM/YYYY') : '-';
      },
    }
    // {
    //     field: 'SalesReceiptDate', title: 'Mata Uang VB',
    //     formatter: function (value, data, index) {
    //         return value ? moment(value).format('DD/MM/YYYY') : '-';
    //     },
    // },
    // // { field: 'Products', title: 'Nama Barang' },
    // {
    //     field: 'TotalPaid', title: 'Jumlah Pembayaran', formatter: function (value, data, index) {
    //         return value ? numeral(value).format('0,0') : '0';
    //     }
    // },
    // { field: 'CurrencyCode', title: 'Mata Uang' },
    // { field: 'Buyer', title: 'Buyer' },
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
    pagination: false
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];


  }

  loader = (info) => {
    let order = {};
    if (info.sort)
      order[info.sort] = info.order;

    let arg = {

    };


    if (this.info.dateFrom)
      arg.dateFrom = moment(this.info.dateFrom).format("YYYY-MM-DD");

    if (this.info.dateTo)
      arg.dateTo = moment(this.info.dateTo).format("YYYY-MM-DD");

    if (this.info.divisionId)
      arg.divisionId = this.info.divisionId;

    return this.flag ? (
      this.service.search(arg)
        .then((result) => {
          console.log(result);
          return {
            data: result.data
          };
        })
    ) : { total: 0, data: [] };
  }

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  excel() {

    let params = {
      dateFrom: moment(this.info.dateFrom).format("YYYY-MM-DD"),
      dateTo: moment(this.info.dateTo).format("YYYY-MM-DD")
    };

    this.service.getXls(params)

    // this.getExcelData();
  }

  reset() {
    this.flag = false;

    this.error = {};
    this.info.dateFrom = undefined;
    this.info.dateTo = undefined;
    this.info.divisionId = 0;
    this.selectedDivision = null;
    this.tableList.refresh();
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  @bindable selectedDivision;
  selectedDivisionChanged(newValue, oldValue) {
    if (newValue)
      this.info.divisionId = newValue.Id;
    else
      this.info.divisionId = 0;
  }


}
