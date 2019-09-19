import { Router } from "aurelia-router";
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { ServiceEffeciency } from './service-efficiency';
import { RateService } from './service-rate';
import { Service } from './service';

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
var SPPLoader = require('../../../../loader/production-order-loader');
var InstructionLoader = require('../../../../loader/instruction-loader');
var ProductLoader = require('../../../../loader/product-null-tags-loader');

@inject(Router, BindingEngine, ServiceEffeciency, RateService, Element, Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable disabled = "true";
  @bindable data = {};
  @bindable error = {};
  @bindable selectedSPP;
  @bindable buyer;
  @bindable color;
  @bindable material;
  @bindable selectedInstruction;
  @bindable orderQuantity;
  @bindable sales;
  @bindable date;
  @bindable directLaborTotal;
  @bindable selectedProduct;

 
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
    console.log(this.data);
    this.error = this.context.error;
  }

  get sppLoader() {
    return SPPLoader;
  }

  get instructionLoader() {
    return InstructionLoader;
  }

  get productLoader() {
    return ProductLoader;
  }


  async selectedSPPChanged(n, o) {
    if (this.selectedSPP) {
      this.data.ProductionOrder = {};
      this.data.ProductionOrder.Id = this.selectedSPP.Id;
      this.data.ProductionOrder.OrderNo = this.selectedSPP.OrderNo;

      this.buyer = this.selectedSPP.Buyer.Name;
      this.material = this.selectedSPP.Material.Name;
      this.color = this.selectedSPP.Details[0].ColorRequest;

      this.data.Material = {};
      this.data.Material.Id = this.selectedSPP.Material.Id;
      this.data.Material.Name = this.material;

      this.data.Buyer = {};
      this.data.Buyer.Id = this.selectedSPP.Buyer.Id;
      this.data.Buyer.Name = this.Buyer;

      this.data.Color = this.color;

      this.sales = this.selectedSPP.Account.UserName;
      this.date = this.selectedSPP.DeliveryDate;
      this.orderQuantity = this.selectedSPP.OrderQuantity + " " + this.selectedSPP.Uom.Unit;

      this.data.Sales = {};
      this.data.Sales.Id = this.selectedSPP.Account.Id;
      this.data.Sales.UserName = this.sales;
      this.data.DeliveryDate = this.date;
      this.data.OrderQuantity = this.selectedSPP.OrderQuantity;

      this.data.Uom = {};
      this.data.Uom.Id = this.selectedSPP.Uom.Id;
      this.data.Uom.Unit = this.selectedSPP.Uom.Unit;

      var directLaborDate = new Date(this.date);

      this.directLaborData = await this.service.getDirectLaborCost(directLaborDate.getMonth() + 1, directLaborDate.getFullYear());
    }
  }

  directLaborTotalChanged(n, o) {
    if (this.directLaborTotal) {
      this.data.DirectLaborTotal = this.directLaborTotal;
      this.data.SalaryTotal = this.data.DirectLaborTotal * (this.directLaborData.WageTotal / this.directLaborData.LaborTotal);
    }
  }

  selectedInstructionChanged(n, o) {
    if (this.selectedInstruction) {
      this.data.Machines = this.selectedInstruction.Steps;
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
