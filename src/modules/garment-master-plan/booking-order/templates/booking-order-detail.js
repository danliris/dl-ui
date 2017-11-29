import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import moment from 'moment';
var unitLoader = require('../../../../loader/unit-loader');
var weeklyLoader = require('../../../../loader/garment-master-plan-weekly-plan-loader');
var weekLoader = require('../../../../loader/garment-master-plan-weekly-plan-by-year-loader');

export class DetailItem {

  
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;

    
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  @computedFrom("data.weeklyPlan")
  get filter(){
    var yearFilter={};
    if(this.data.weeklyPlan){
      yearFilter={
        year:this.data.weeklyPlan.year,
        unit:this.data.weeklyPlan.unit.code
      }
    }
    return yearFilter;
  }

  @computedFrom("data.unit")
  get filterYear(){
    var filter={};
    if(this.data.unit){
      filter={
        "unit.code":this.data.unit.code
      }
    }
    return filter;
  }


  get loader() {
    return unitLoader;
  }
  get weeklyloader() {
    return weeklyLoader;
  }
  get weekloader() {
    return weekLoader;
  }

  weekView = (week) => {
      var endDate=moment(week.items.endDate).format("DD MMM YYYY");
      var startDate=moment(week.items.startDate).format("DD MMM YYYY");
        return `W${week.items.weekNumber} - ${startDate} s/d ${endDate}`;
    }
}
