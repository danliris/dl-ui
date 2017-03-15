import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
import {Service} from './service';

var InstructionLoader = require('../../../../loader/instruction-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable readOnly = false;
  @bindable data;
  @bindable error;

  @bindable title;

  @bindable productionOrderDetails = [];
  @bindable instruction;

  @bindable isEdit;
  @bindable isView;

  formOptions = { 
    cancelText : "Kembali",
    saveText : "Simpan",
    editText : "Ubah",
    deleteText : "Hapus",
  };

  constructor(bindingEngine, service, element) {
      this.bindingEngine = bindingEngine;
      this.service = service;
      this.element = element;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.data.carts = this.data.carts || [];

    if (this.data.productionOrder && this.data.productionOrder.details && this.data.productionOrder.details.length > 0){
        this.productionOrderDetails = this.data.productionOrder.details;
        this._mapProductionOrderDetail();
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback; 
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  cartInfo = {
    columns : [
      { header : "Nomor Kereta", value : "cartNumber"},
      { header : "Panjang", value : "qty"},
      { header : "Satuan", value : "uom"},
      { header : "Jumlah PCS", value : "pcs"},
    ],
    onAdd: function () {
      this.data.carts.push({ cartNumber : "", qty : 0, uom : this.data.productionOrder ? this.data.productionOrder.uom.unit : '', pcs : 0});
      console.log("add");
    }.bind(this),
    onRemove: function () {
      console.log("remove");
    }.bind(this)
  };

  stepInfo = {
    columns : [
      { header : "No.", value : "index"},
      { header : "Proses", value : "process"}
    ],
    onAdd: function () {
      this.data.instruction.steps = this.data.instruction.steps || [];
      this.data.instruction.steps.push({ process : "", stepIndicators : []});
    }.bind(this),
    onRemove: function () {
      console.log("step removed");
    }.bind(this)
  };

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

      for (var cart of this.data.carts){
        cart.uom = this.data.productionOrder.uom.unit;
      }
    }
    else {
      for (var cart of this.data.carts){
        cart.uom = '';
      }
      delete this.data.productionOrder;
      delete this.data.productionOrderId;
      delete this.data.selectedProductionOrderDetail;
    }
  }

  instructionChanged(newValue){
    if (newValue){
      this.data.instruction = newValue;
      this.data.instructionId = newValue._id;
    }
    else{
      delete this.data.instruction;
      delete this.data.instructionId;
    }
  }

  get hasProductionOrder(){
    return this.data.productionOrder;
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

  onInstructionChanged(event){
    console.log("instructionChanged");
    console.log(event);
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