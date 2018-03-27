import { inject, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var YearLoader = require('../../../loader/garment-master-plan-weekly-plan-year-loader');
var UnitLoader = require('../../../loader/weekly-plan-unit-loader');

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

  get yearLoader() {
    return YearLoader;
  }
  yearView = (year) => {
    return `${year.year}`
  }
  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {
    return `${unit.code} - ${unit.name}`
  }

  @computedFrom("year")
  get filterUnit() {
    if (this.year) {
      this.unit = "";
      return { "year": this.year.year }
    }
    else {
      return { "year": "" }
    }
  }

  searching() {

    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year,
        unit: this.unit ? this.unit.code : "",
      }
      this.service.search(info)
        .then(result => {
          this.data = result;

          var units = [];
          for (var x = 0; x < this.data.length; x++) {
            for (var y = 0; y < this.data[x].items.length; y++) {
              var unit = {
                code: this.data[x].unit.code,
                remainingEH: this.data[x].items[y].remainingEH,
                background: 
                  this.data[x].items[y].remainingEH > 0 ? "#FFFF00" : // yellow
                  this.data[x].items[y].remainingEH < 0 ? "#F62C2C" : // red
                  "#52DF46" // green
              };
              var unitsTemp = units[y] ? units[y] : [];
              unitsTemp.push(unit);
              units[y] = unitsTemp;
            }
          }
          this.isTotal=false;
          if(unitsTemp.length>1){
            this.isTotal=true;
          }
          this.weeks = [];
          for (var x = 0; x < units.length; x++) {
            var headCount = 0;
            var remainingEH=0;
            for (var y = 0; y < units[x].length; y++) {
              headCount += Number(this.data[y].items[x].operator);
              remainingEH += Number(this.data[y].items[x].remainingEH);

            }
            var week = {
              week: "W" + (x + 1),
              units: units[x],
              headCount: headCount,
              eh:remainingEH
            };
            this.weeks.push(week);
          }
        });
    }
  }

  ExportToExcel() {
    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year,
        unit: this.unit ? this.unit.code : "",
      }
      this.service.generateExcel(info);
    }
  }

  reset() {
    this.year = "";
    this.unit = "";
  }
}
