import { Router } from "aurelia-router";
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { ServiceEffeciency } from './service-efficiency';
import { RateService } from './service-rate';
import { Service } from './service';

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
var ProductionOrderLoader = require('../../../../loader/production-order-loader');
var InstructionLoader = require('../../../../loader/instruction-loader');
var ProductLoader = require('../../../../loader/product-null-tags-loader');

@inject(Router, BindingEngine, ServiceEffeciency, RateService, Element, Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable disabled = "true";
  @bindable data = {};
  @bindable error = {};
  @bindable selectedProductionOrder;
  @bindable buyer;
  @bindable color;
  @bindable material;
  @bindable selectedInstruction;
  @bindable orderQuantityWithUOM;
  @bindable sales;
  @bindable date;
  @bindable directLaborTotal;
  @bindable selectedGreige;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  directLaborData = {};
  length0 = {
    label: {
      align: "left"
    }
  }
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  }
  length6 = {
    label: {
      align: "left",
      length: 6
    }
  }
  length8 = {
    label: {
      align: "left",
      length: 8
    }
  }

  machines = {
    columns: [
      { header: "Proses", value: "Process" },
      { header: "Mesin", value: "Machine" },
      { header: "Biaya Chemical", value: "Chemical" },
      { header: "Biaya Utility", value: "Utility" },
      { header: "Biaya Depresiasi", value: "Depretiation" },
      { header: "Total", value: "Total" },
    ]
  }
  machineOptions = {};
  constructor(router, bindingEngine, serviceEffeciency, rateService, element, service) {
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.efficiencyService = serviceEffeciency;
    this.rateService = rateService;
    this.element = element;
    this.service = service;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.machineOptions.readOnly = this.readOnly;
  }

  get productionOrderLoader() {
    return ProductionOrderLoader;
  }

  get instructionLoader() {
    return InstructionLoader;
  }

  get productLoader() {
    return ProductLoader;
  }



  async selectedProductionOrderChanged(newValue, oldValue) {
    if (newValue) {
      // this.data.ProductionOrder = {};
      this.data.ProductionOrderId = this.selectedProductionOrder.Id;
      this.data.ProductionOrderNo = this.selectedProductionOrder.OrderNo;

      this.data.BuyerName = this.selectedProductionOrder.Buyer.Name;
      this.color = this.selectedProductionOrder.Details[0].ColorRequest;

      // this.data.Material = {};
      // this.data.Material.Id = this.selectedSPP.Material.Id;
      // this.data.Material.Name = this.material;

      // this.data.Buyer = {};
      // this.data.Buyer.Id = this.selectedSPP.Buyer.Id;
      // this.data.Buyer.Name = this.Buyer;

      // this.data.Color = this.color;

      // this.sales = this.selectedSPP.Account.UserName;
      // this.date = this.selectedSPP.DeliveryDate;
      this.orderQuantityWithUOM = this.selectedProductionOrder.OrderQuantity + " " + this.selectedProductionOrder.Uom.Unit;

      // this.data.Sales = {};
      // this.data.Sales.Id = this.selectedSPP.Account.Id;
      // this.data.Sales.UserName = this.sales;
      // this.data.DeliveryDate = this.date;
      // this.data.OrderQuantity = this.selectedSPP.OrderQuantity;

      // this.data.Uom = {};
      // this.data.Uom.Id = this.selectedSPP.Uom.Id;
      // this.data.Uom.Unit = this.selectedSPP.Uom.Unit;

      var directLaborDate = new Date(this.selectedProductionOrder.DeliveryDate);

      this.directLaborData = await this.service.getDirectLaborCost(directLaborDate.getMonth() + 1, directLaborDate.getFullYear());
    } else {
      this.data = {};
      this.color = "";
      this.orderQuantityWithUOM = "";

    }
  }

  directLaborTotalChanged(n, o) {
    if (this.directLaborTotal) {
      this.data.DirectLaborTotal = this.directLaborTotal;
      this.data.SalaryTotal = this.data.DirectLaborTotal * (this.directLaborData.WageTotal / this.directLaborData.LaborTotal);
    }
  }

  get salaryTotal() {
    if (this.data.TKLQuantity > 0) {
      return this.data.TKLQuantity * (this.directLaborData.WageTotal / this.directLaborData.LaborTotal);
    } else {
      return 0;
    }
  }

  selectedInstructionChanged(newValue, oldValue) {
    if (newValue) {
      this.data.Machines = this.selectedInstruction.Steps.map((step) => { return { "step": step }; });
      console.log(this.data.Machines);
      this.data.InstructionId = this.selectedInstruction.Id;
      this.data.InstructionName = this.selectedInstruction.Name;
    } else {
      this.data.Machines = [];
      this.data.InstructionId = 0;
      this.data.InstructionName = "";
    }
  }

  selectedGreigeChanged(newValue, oldValue) {
    if (newValue) {
      this.data.GreigeId = newValue.Id;
    } else {
      this.data.GreigeId = 0;
    }

  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || 0) != 0;
  }

  @computedFrom("error.Machines")
  get hasError() {
    return (this.error.Machines ? this.error.Machines.length : 0) > 0;
  }

}
