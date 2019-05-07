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
    return `${unit.Code} - ${unit.Name}`
  }

  selectUnit = ["Unit"];
  @computedFrom("year")
  get filterUnit() {
    if (this.year) {
      this.unit = "";
      return { "year": this.year.year }
    }
    else {
      return { "year": 0 }
    }
  }

  searching() {

    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year
      }
      if (this.unit) {
        info.unit = this.unit.Code
      }
      this.service.search(JSON.stringify(info))
        .then(result => {
          this.data = result;

          var units = [];
          for (var x = 0; x < this.data.length; x++) {
            for (var y = 0; y < this.data[x].Items.length; y++) {
              var unit = {
                code: this.data[x].Unit,
                remainingEH: this.data[x].Items[y].RemainingEH,
                background: 
                  this.data[x].Items[y].RemainingEH > 0 ? "#FFFF00" : // yellow
                  this.data[x].Items[y].RemainingEH < 0 ? "#F62C2C" : // red
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
            var headCountUnit=0;
            for (var y = 0; y < units[x].length; y++) {
           
              headCount += Number(this.data[y].Items[x].Operator);
              if(units[x][y].code!="SK")
                headCountUnit += Number(this.data[y].Items[x].Operator);
              remainingEH += Number(this.data[y].Items[x].RemainingEH);
            }
            var week = {
              week: "W" + (x + 1),
              units: units[x],
              headCount: headCount,
              headCountUnit:headCountUnit,
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
        year: this.year.year
      }
      if (this.unit) {
        info.unit = this.unit.Code
      }
      this.service.generateExcel(JSON.stringify(info));
    }
  }

  reset() {
    this.year = "";
    this.unit = "";
  }
}
