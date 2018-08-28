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
    console.log(unit);
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
          var dataByCategory = {};
          var subTotalCategory = {};
          for (var data of result) {
            //for (var item of data.items) {
              console.log(data.receiptDate);
              var Category = data.categoryName;
              if (!dataByCategory[Category]) dataByCategory[Category] = [];
              dataByCategory[Category].push({
                Date: moment(data.receiptDate).format("YYYY-MM-DD"),
                No: data.urnNo,
                Product: data.productName,
                Category: data.categoryName,
                Unit: data.unitName,
                PIB: data.PIBNo || "-",
                Nilai: (data.amount).toLocaleString()+".00",
                CurrencyRate: data.rate.toLocaleString()+".00",
                Total: (data.amountIDR).toLocaleString()+".00",
              });

              if (!subTotalCategory[Category]) subTotalCategory[Category] = 0;
              subTotalCategory[Category] += (data.amountIDR);
           // }
          }

          var categories = [];
          this.total = 0;
          for (var data in dataByCategory) {
            categories.push({
              data: dataByCategory[data],
              subTotal: subTotalCategory[data].toLocaleString()+".00",
            });
            this.total += subTotalCategory[data];
          }
          this.total = this.total.toLocaleString()+".00";
          this.categories = categories;

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

  reset() {
    this.unitReceiptNote = "";
    this.category = "";
    this.unit = "";
    this.dateFrom = null;
    this.dateTo = null;
  }
}
