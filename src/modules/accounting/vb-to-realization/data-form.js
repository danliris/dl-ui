import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;

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
    showColumn: false
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    this.hasPosting = this.context.hasPosting;
  }

  loader = (info) => {
    let order = {};

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  columns = [[
    { field: "isSelected", title: "isSelected Checkbox", checkbox: true, sortable: false },
    { field: "VBNo", title: "No VB", rowspan: "2" },
    { field: "VBRealizationNo", title: "No Realisasi VB", rowspan: "2" },
    {
      field: "VBRealizationDate", title: "Tanggal Realisasi VB", formatter: function (value, data, index) {
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
    { field: "VBAmount", title: "Mata Uang" },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "VBRealizationAmount", title: "Mata Uang" }
  ]];
}
