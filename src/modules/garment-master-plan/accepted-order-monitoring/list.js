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
    // this.unit_headers=[1,2,3,4];
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

  @computedFrom("year")
  get filterUnit() {
    if (this.year) {
      this.unit = "";
      return { "Year": this.year.year }
    }
    else {
      return { "Year": "" }
    }
  }

  getMonthName(month) {
    var monthName = '';
    switch (month) {
        case 0:
            monthName = "Januari";
            break;
        case 1:
            monthName = "Februari";
            break;
        case 2:
            monthName = "Maret";
            break;
        case 3:
            monthName = "April";
            break;
        case 4:
            monthName = "Mei";
            break;
        case 5:
            monthName = "Juni";
            break;
        case 6:
            monthName = "Juli";
            break;
        case 7:
            monthName = "Agustus";
            break;
        case 8:
            monthName = "September";
            break;
        case 9:
            monthName = "Oktober";
            break;
        case 10:
            monthName = "November";
            break;
        case 11:
            monthName = "Desember";
            break;
    }
    return monthName;
  }

  async searching() {

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
      
      var yr = {
          Year:this.year.year
       };
      
      this.previewWeeklyPlan = [];
      this.previewWeeklyPlan = await this.service.getWeeklyPlan(yr);
      var monthTotal = "";
      var val = 0;
      var obj2=[];
      var weekStart = 0;
      var weekEnd = 0;
      this.service.search(JSON.stringify(info))
        .then(result => {
          this.data = result;

          var startDateOfYear = new Date(`${this.year.year}-01-01`);
          var endDateOfYear = new Date(`${this.year.year}-12-31`);
          var isSameYear = (moment().year(this.year.year).day("Monday").week(1).toDate()).getFullYear() === this.year.year ? true : false;
          var totalWeek = Math.ceil((((endDateOfYear - startDateOfYear) / 86400000) + 1) / 7);
          this.dts = [];
          for(var i = 1; i <= totalWeek; i++){
            var startDate = i == 1 ? new Date(`${this.year.year}-01-01`) : moment().year(this.year.year).day("Monday").week((i)).toDate();
            var endDate = i == totalWeek ? new Date(`${this.year.year}-12-31`) : moment().year(this.year.year).day("Saturday").week((i)).toDate();
            this.dts.push(this.getMonthName(endDate.getMonth()));
          }

          this.units = [];
          this.weeks = [];
          this.qty = [];
          this.total = [];
          if(!info.unit){
            for(var item of this.previewWeeklyPlan){
              if(this.units.length<=0){
               this.units.push(item.Unit.Code);
              }
              var u=this.units.find(i=> i==item.Unit.Code);
              if(!u){
               this.units.push(item.Unit.Code);
              }
            }
          }
          else if(info.unit){
            this.units.push(info.unit);
          }

          for(var weekly of this.previewWeeklyPlan){
            this.length_week= weekly.Items.length;
            break;
          }
          
          var totalqty=[];
          for(var code of this.units){
            for(var z of this.data){
              if(z.Unit==code){
                if(!totalqty[code]){
                  totalqty[code]=z.Quantity;
                } else {
                  totalqty[code]+=z.Quantity; 
                }
              } 
            }
            if(!totalqty[code]){
              totalqty[code]='-';
            }
          }
          this.total=Object.values(totalqty);
          
          for(var x=0;x<this.length_week;x++){
            var obj=[];
            var Week={
              weeknumber:'W'+(x+1)+' - '+this.dts[x]
            }
            for(var y of this.units){
              var unit={};
              var grup= this.data.find(o=>o.Unit==y && o.WeekNumber == (x+1));
              if(grup){
                unit={
                  code:y,
                  week:x+1,
                  quantity:grup.Quantity,
                  weeks:Week.weeknumber,
                  month:this.dts[x],
                }
              } else {
                unit={
                  code:y,
                  week:x+1,
                  quantity:'-',
                  weeks:Week.weeknumber,
                  month:this.dts[x],
                }
              }
              obj.push(unit);
            }
            if(monthTotal==""){
              monthTotal=this.dts[x]
            }
            if(monthTotal==this.dts[x]){
              this.qty.push(obj);
              if(weekStart==0){
                weekStart = x+1;
              }
              weekEnd = x+1;
            }
            else 
            if(monthTotal!=this.dts[x]){
              obj2=[];  
              for(var k of this.units){
                val = 0;
                  var grup= this.data.find(o=>o.Unit==k && o.WeekNumber == weekStart-1);
                  if(grup){
                    val += grup.Quantity;
                  } else {
                    val += 0;
                  }
                for(var ws=weekStart; ws<=weekEnd; ws++){
                  var grup= this.data.find(o=>o.Unit==k && o.WeekNumber == ws);
                  if(grup){
                    val += grup.Quantity;
                  } else {
                    val += 0;
                  }
                }
                unit={
                  code:y,
                  week:x+1,
                  quantity:val,
                  weeks:"TOTAL " + monthTotal.toUpperCase(),
                  month:"total",
                };
                obj2.push(unit);
              }
              this.qty.push(obj2);
              this.qty.push(obj);
              monthTotal=this.dts[x];
              weekStart=0;
              weekEnd=0;
            }
            if(x+1==this.length_week){
              obj2=[];  
              for(var k of this.units){
                val = 0;
                  var grup= this.data.find(o=>o.Unit==k && o.WeekNumber == weekStart-1);
                  if(grup){
                    val += grup.Quantity;
                  } else {
                    val += 0;
                  }
                for(var ws=weekStart; ws<=weekEnd; ws++){
                  var grup= this.data.find(o=>o.Unit==k && o.WeekNumber == ws);
                  if(grup){
                    val += grup.Quantity;
                  } else {
                    val += 0;
                  }
                }
                unit={
                  code:y,
                  week:x+1,
                  quantity:val,
                  weeks:"TOTAL " + monthTotal.toUpperCase(),
                  month:"total",
                };
                obj2.push(unit);
              }
              this.qty.push(obj2);
            }
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
