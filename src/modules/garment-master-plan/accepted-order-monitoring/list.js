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

  async searching() {

    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year,
        unit: this.unit ? this.unit.code : "",
      }
      var yr = {
        year: { "$in": [this.year.year] }
      }
      console.log(yr);
      this.previewWeeklyPlan = [];
      this.previewWeeklyPlan = await this.service.getWeeklyPlan(yr);
      
      this.service.search(info)
        .then(result => {
          this.data = result;
          this.units = [];
          this.weeks = [];
          this.qty = [];
          this.total = [];
          
          if(info.unit==''){
            for(var item of this.previewWeeklyPlan){
              if(this.units.length<=0){
               this.units.push(item.unit.code);
              }
              var u=this.units.find(i=> i==item.unit.code);
              if(!u){
               this.units.push(item.unit.code);
              }
            }
          }
          else if(info.unit!=''){
            this.units.push(info.unit);
          }

          for(var weekly of this.previewWeeklyPlan){
            this.length_week= weekly.items.length;
            break;
          }
          
          var totalqty=[];
          for(var code of this.units){
            for(var z of this.data){
              if(z._id.unitcode==code){
                if(!totalqty[code]){
                  totalqty[code]=z.qty;
                } else {
                  totalqty[code]+=z.qty; 
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
              var grup= this.data.find(o=>o._id.unitcode==y && o._id.week == (x+1));
              if(grup){
                unit={
                  code:y,
                  week:x+1,
                  quantity:grup.qty,
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
