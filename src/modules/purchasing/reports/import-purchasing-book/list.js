import { inject, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitReceiptNoteLoader = require('../../../../loader/unit-receipt-note-basic-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var CategoryLoader = require('../../../../loader/category-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  bind() {
    this.reset();
  }

  get unitReceiptNoteLoader() {
    return UnitReceiptNoteLoader;
  }
  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`
  }
  get categoryLoader() {
    return CategoryLoader;
  }
  categoryView = (category) => {
    return `${category.code} - ${category.name}`
  }

  searching() {
    if (false) {
      alert("");
    }
    else {
      var filter = {
        no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
        category: this.category ? this.category.code : "",
        unit: this.unit ? this.unit.Code : "",
        dateFrom: moment(this.dateFrom).format("DD MMM YYYY HH:mm"),
        dateTo: moment(this.dateTo).format("DD MMM YYYY HH:mm"),
      }
      this.service.search(filter)
        .then(result => {
          this.data = result
        });
    }
  }

  ExportToExcel() {
    if (false) {
      alert("");
    }
    else {
      var filter = {
        no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
        category: this.category ? this.category.code : "",
        unit: this.unit ? this.unit.Code : "",
        dateFrom: moment(this.dateFrom).format("DD MMM YYYY HH:mm"),
        dateTo: moment(this.dateTo).format("DD MMM YYYY HH:mm"),
      }
      this.service.generateExcel(filter)
        .catch(e => {
          alert(e.replace(e, "Error: ", ""));
        });
    }
  }

  printPdf() {
    if (false) {
      alert("");
    }
    else {
      var filter = {
        no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
        category: this.category ? this.category.code : "",
        unit: this.unit ? this.unit.Code : "",
        dateFrom: moment(this.dateFrom).format("DD MMM YYYY HH:mm"),
        dateTo: moment(this.dateTo).format("DD MMM YYYY HH:mm"),
      }
      this.service.printPdf(filter)
        .catch(e => {
          alert(e.replace(e, "Error: ", ""));
        });
    }
  }

  reset() {
    this.unitReceiptNote = "";
    this.category = "";
    this.unit = "";
    this.dateFrom = null;
    this.dateTo = null;
    this.data = [];
  }
}
