import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import moment from 'moment';
var UnitLoader = require('../../../../loader/unit-loader');
var weeklyLoader = require('../../../../loader/garment-master-plan-weekly-plan-loader');
var weekLoader = require('../../../../loader/garment-master-plan-weekly-plan-by-year-loader');

export class Item {
    @bindable selectedUnit;
    @bindable selectedWeeklyPlan;
    @bindable selectedWeek;
  
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    if(this.data.unit)
      this.selectedUnit = this.data.unit;
    if(this.data.weeklyPlanYear)
      this.selectedWeeklyPlan = {year:this.data.weeklyPlanYear};
    if(this.data.week)
      this.selectedWeek = {items:this.data.week};
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  @computedFrom("data.weeklyPlanYear")
  get filterYear(){
    var yearFilter={};
    if(this.data.weeklyPlanYear && this.data.unit && this.data.unit.code){
      yearFilter={
        year:this.data.weeklyPlanYear,
        unit:this.data.unit.code
      }
    }
    console.log(yearFilter);
    return yearFilter;
  }

  @computedFrom("data.unit")
  get filterUnit(){
    var filter={};
    if(this.data.unit && this.data.unit.code){
      filter={
        "unit.code":this.data.unit.code
      }
    }
    return filter;
  }

  selectedUnitChanged(newValue){
      var _selectedData = newValue;
      if(_selectedData){
        this.data.unitId = _selectedData._id;
        this.data.unit = _selectedData;
      }
      console.log(this.data.unit);
  }

  selectedWeeklyPlanChanged(newValue){
      var _selectedData = newValue;
      if(_selectedData){
        this.data.weeklyPlanYear = _selectedData.year;
        this.data.weeklyPlanId = _selectedData._id;
      }
      console.log(this.data.weeklyPlanYear);
  }

  selectedWeekChanged(newValue){
      var _selectedData = newValue;
      if(_selectedData){
        this.data.week = _selectedData.items;
      }
  }

  get unitLoader() {
    return UnitLoader;
  }
  get weeklyloader() {
    return weeklyLoader;
  }
  get weekloader() {
    return weekLoader;
  }

  get totalSH(){
      var total = (this.data.shCutting || 0) + (this.data.shSewing || 0) + (this.data.shFinishing || 0);
      return total;
  }

  weekView = (week) => {
      var endDate=moment(week.items.endDate).format("DD MMM YYYY");
      var startDate=moment(week.items.startDate).format("DD MMM YYYY");
        return `W${week.items.weekNumber} - ${startDate} s/d ${endDate}`;
    }
}
