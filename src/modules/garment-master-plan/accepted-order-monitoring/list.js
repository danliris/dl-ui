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
      
      this.service.search(JSON.stringify(info))
        .then(result => {
          this.data = result;
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
            var week={
              weeknumber:'W'+(x+1)
            }
            this.weeks.push(week);
            for(var y of this.units){
              var unit={};
              var grup= this.data.find(o=>o.Unit==y && o.WeekNumber == (x+1));
              if(grup){
                unit={
                  code:y,
                  week:x+1,
                  quantity:grup.Quantity,
                }
              } else {
                unit={
                  code:y,
                  week:x+1,
                  quantity:'-'
                }
              }
              
              obj.push(unit);

            }
            this.qty.push(obj);
            
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
