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


      this.previewWeeklyPlan = await this.service.getWeeklyPlan(info.year.year);
      this.service.search(info)
        .then(result => {
          this.data = result;
          this.units = [];
          this.weeks = [];
          this.qty = [];
          this.item_unit = [];
          // this.unit_code=this.data._id.unitcode;
          console.log(this.data);
          for(var item of this.previewWeeklyPlan){
            if(this.units.length<=0){
              this.units.push(item.unit.code);
            }
            var u=this.units.find(i=> i==item.unit.code);
            if(!u){
              this.units.push(item.unit.code);
            }
          }

          for(var weekly of this.previewWeeklyPlan){
            this.length_week= weekly.items.length;
            break;
          }
          var z=0;
          //var group=[];
          

          for(var x=0;x<this.length_week;x++){
            var obj=[];
            week={
              weeknumber:'W'+(x+1)
            }
            this.weeks.push(week);
            for(var y of this.units){
              var unit={};
              var grup= this.data.find(o=>o._id.unitcode==y && o._id.week == x);
              if(grup){
                unit={
                  code:y,
                  week:x,
                  quantity:grup.qty
                }
              } else {
                unit={
                  code:y,
                  week:x,
                  quantity:'-'
                }
              }
              obj.push(unit);
            }
            this.qty.push(obj);
          
          }
          console.log(this.qty);
          // for(var x=0;x<this.length_week;x++){
          //   var week_row=x+1;
          //   var unit=[];
          //   // var week = {
          //   //   weeknumber:"W"+(week_row),
          //   // }

          //   // this.weeks.push(week.weeknumber);

          //   for(var y=0;y<this.units.length;y++){
          //     if(this.data[z]){
          //       this.a=this.data[z]._id.unitcode;
          //       this.b=this.data[z]._id.week;
          //     }
          //     if(this.units[y]==this.a && week_row==this.b){
          //       unit = {
          //         code: this.data[z]._id.unitcode,
          //         quantity: this.data[z].qty,
          //         weeknumber:"W"+(week_row),
          //       }
          //       this.qty.push(unit);
          //       z++;
          //     } else {
          //       // var blank='-';
          //       unit = {
          //         code: '-',
          //         quantity: '-',
          //         weeknumber:"W"+(week_row),
          //       }
          //       this.qty.push(unit);
          //     }
          //   }
          //   // for (var y=0; y < this.units.length; y++){
          //   //   //   this.weeks.push(this.qty[y]);
          //   //       var week = {
          //   //         units:this.qty[y]
          //   //       }
          //   //       this.weeks.push(week);
          //   //     }
          // }

          // console.log(this.qty);
          // function push_week(object){
          //   for (var x = 0; x < this.length_week; x++) {
          //     for (var y=0; y < this.units.length; y++){
          //   // //   this.weeks.push(this.qty[y]);
          //       var week = {
          //         units:this.qty[y]
          //       }
          //       this.weeks.push(week,push_week(this.weeks));
          //     }
          //   }

          // // // //   var week = {
          // // // //     weeknumber:"W"+(x+1),
          // // // //     // units:qty[y]
          // //   this.item_unit.push(this.weeks[x])
          // }
          // console.log(this.item_unit);
          // //   this.weeks.push(week);
          // }
          // console.log(this.weeks);
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
