import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
import {Service} from './service';

var InstructionLoader = require('../../../../loader/instruction-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable readOnly = false;
  @bindable data;
  @bindable error;

  @bindable title;

  @bindable carts;
  @bindable productionOrderDetails = [];

  @bindable cancel;
  @bindable delete;
  @bindable save;
  @bindable edit;

  constructor(bindingEngine, service, element) {
      this.bindingEngine = bindingEngine;
      this.service = service;
      this.element = element;
      this.index = 0;
  }

  bind() {
    this.data = this.data || {};
    this.carts = this.carts || [];

    if (this.data.productionOrder && this.data.productionOrder.details && this.data.productionOrder.details.length > 0){
        this.productionOrderDetails = this.data.productionOrder.details;
        this._mapProductionOrderDetail();
    }
  }

  cartInfo = {
    columns : [
      { header : "No", value : "no"},
      { header : "Qty", value : "qty"},
      { header : "Pcs", value : "pcs"},
    ],
    onAdd: function () {
      this.index++;
      this.carts.push({ no : this.index, qty : 0, pcs : 0});
      console.log("add, index : " + this.index);
    }.bind(this),
    onRemove: function () {
      this.index = this.index - 1;
      console.log("remove, index : " + this.index);
    }.bind(this)
  };

  stepInfo = {
    columns : [
      { header : "Process", value : "process"},
    ],
    onAdd: function () {
      this.data.instruction.steps = this.data.instruction.steps || [];
      this.data.instruction.steps.push({ process : "", stepIndicators : []});
    }.bind(this),
    onRemove: function () {
      console.log("step removed");
    }.bind(this)
  };

  stepIndicatorColumns = [
      { header : "Name", value : "name"},
      { header : "Value", value : "value"},
    ];

  async productionOrderChanged(e) {
    this.productionOrderDetails = [];

    var productionOrder = e.detail;
    if (productionOrder) {
      this.productionOrderDetails = await this.service.getProductionOrderDetails(productionOrder.orderNo);

      if (!this.data.selectedProductionOrderDetail && this.hasProductionOrderDetails) {
        this._mapProductionOrderDetail();
        this.data.selectedProductionOrderDetail = {};
        this.data.selectedProductionOrderDetail = this.productionOrderDetails[0];
      }
    }
    else {
      delete this.data.selectedProductionOrderDetail;
    }
  }

  get hasProductionOrderDetails() {
    return this.productionOrderDetails.length > 0;
  }

  get hasColor(){
    return this.data.selectedProductionOrderDetail;
  }

  get hasInstruction(){
    return this.data.instruction;
  }

  get hasStepIndicators(){
    return this.isStepSelected && this.data.instruction.steps[this.selectedStepIndex].stepIndicators;
  }

  get isStepSelected(){
    return this.data.instruction 
      && this.data.instruction.steps 
      && this.data.instruction.steps.length > 0 
      && this.data.instruction.steps[0].selectedIndex != null;
  }

  get selectedStepIndex(){
    return this.isStepSelected ? this.data.instruction.steps[0].selectedIndex : -1;
  }

  get stepIndicatorTitle(){
    return this.hasInstruction ? this.data.instruction.steps[this.selectedStepIndex].process + " - step indicator" : "";
  }

  get stepIndicators(){
    return this.data.instruction.steps[this.selectedStepIndex].stepIndicators || [];
  }

  // set stepIndicators(stepIndicators){
  //   this._stepIndicators = stepIndicators;
  // }

  get instructionLoader(){
    return InstructionLoader;
  }

  _mapProductionOrderDetail()
  {
      this.productionOrderDetails.map(detail => {
          detail.toString = function(){
              return `${this.colorRequest}`;  
          }
          return detail;
      });
  }  

  onInstructionChanged($event){
    console.log("instructionChanged");
    console.log($event);
    console.log(this.data.instruction);
  }

  moveItemUp(event){
    var steps = this.data.instruction.steps;
    if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex > 0){
      var selectedSteps = steps.splice(steps[0].selectedIndex, 1);
      steps.splice(steps[0].selectedIndex - 1, 0, selectedSteps[0])
      this.setCurrentIndex(steps[0].selectedIndex - 1);
    }
  }

  moveItemDown(event){
    var steps = this.data.instruction.steps;
    if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex < steps.length){
      var selectedSteps = steps.splice(steps[0].selectedIndex, 1);
      steps.splice(steps[0].selectedIndex + 1, 0, selectedSteps[0])
      this.setCurrentIndex(steps[0].selectedIndex + 1);
    }
  }

  setCurrentIndex(currentIndex){
    for (var step of this.data.instruction.steps){
      step.selectedIndex = currentIndex;
    }
  }
}