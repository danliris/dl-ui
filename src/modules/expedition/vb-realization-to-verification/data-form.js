import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';
import { Router } from "aurelia-router";


const VBRealizationLoader = require('../loaders/vb-realization-loader');
const VBRequestLoader = require('../loaders/vb-request-loader');
const AccountLoader = require('../loaders/account-loader');
const UnitLoader = require('../loaders/unit-loader');

@inject(Service, Router)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  dataToBeSubmitted = [];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  tableOptions = {
    pagination: false,
    search: false,
    showToggle: false,
    showColumns: false
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(service, router) {
    this.service = service;
    this.router = router;
  }

  documents = [];

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    this.hasPosting = this.context.hasPosting;

    // let { realizationTable } = context;
    // console.log(this.context);
    // console.log(this.context.realizationTable);
    // console.log(this.realizationTable);
  }

  loader = (info) => {
    let order = {};

    let vbRequestId = 0;
    if (this.data && this.data.vbRequest && this.data.vbRequest.Id)
      vbRequestId = this.data.vbRequestId.Id;

    let vbRealizationId = 0;
    if (this.data && this.data.vbRealization && this.data.vbRealization.Id)
      vbRealizationId = this.data.vbRealization.Id;

    let realizationDate = "";
    console.log(this.data.realizationDate)
    if (this.data && this.data.realizationDate && this.data.realizationDate != 'Invalid Date')
      realizationDate = moment(this.data.realizationDate).format("YYYY-MM-DD");

    let vbRealizationRequestPerson = "";
    if (this.data && this.data.account)
      vbRealizationRequestPerson = this.data.account.username;

    let unitId = 0;
    if (this.data && this.data.unit)
      unitId = this.data.unit.Id;

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      vbRequestId: vbRequestId,
      vbRealizationId: vbRealizationId,
      realizationDate: realizationDate,
      vbRealizationRequestPerson: vbRealizationRequestPerson,
      unitId: unitId
    };

    return this.service.searchVBToVerification(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  columns = [[
    { field: "isSelected", title: "isSelected Checkbox", checkbox: true, sortable: false, rowspan: "2" },
    { field: "VBNo", title: "No VB", rowspan: "2" },
    { field: "VBRealizationNo", title: "No Realisasi VB", rowspan: "2" },
    {
      field: "Date", title: "Tanggal Realisasi VB", formatter: function (value, data, index) {
        return moment.utc(value).local().format('DD MMM YYYY');
      }, rowspan: "2"
    },
    { field: "VBRequestName", title: "Nama", rowspan: "2" },
    { field: "UnitName", title: "Bagian/Unit", rowspan: "2" },
    { field: "DivisionName", title: "Divisi", rowspan: "2" },
    { title: "Nominal VB", colspan: "2" },
    { title: "Nominal Realisasi VB", colspan: "2" }
  ], [
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "VBAmount", title: "Nominal VB" },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "VBRealizationAmount", title: "Nominal Realisasi VB" }
  ]];

  search() {
    // console.log(this.data);
    this.realizationTable.refresh();
  }

  get vbRealizationLoader() {
    return VBRealizationLoader;
  }

  get vbRequestLoader() {
    return VBRequestLoader;
  }

  get accountLoader() {
    return AccountLoader;
  }

  get unitLoader() {
    return UnitLoader;
  }
}
