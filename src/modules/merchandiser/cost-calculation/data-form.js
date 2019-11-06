import { Router } from "aurelia-router";
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { ServiceEffeciency } from './service-efficiency';
import { RateService } from './service-rate';
import { ServiceCore } from './service-core';


import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const rateNumberFormat = "0,0.000";
var PreSalesContractLoader = require('../../../loader/garment-pre-sales-contracts-loader');
var SizeRangeLoader = require('../../../loader/size-range-loader');
var ComodityLoader = require('../../../loader/garment-comodities-loader');
var UOMLoader = require('../../../loader/uom-loader');
var UnitLoader = require('../../../loader/garment-units-loader');
@inject(Router, BindingEngine, ServiceEffeciency, RateService, Element, ServiceCore)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable disabled = "true";
  @bindable OLCheck;
  @bindable OTL1Check;
  @bindable OTL2Check;
  @bindable OTL3Check;
  @bindable Quantity;
  @bindable data = {};
  @bindable error = {};
  @bindable SelectedRounding;
  @bindable isCopy = false;
 
  leadTimeList = ["", "30 hari", "45 hari"];

  
  defaultRate = { Id: 0, Value: 0, CalculatedValue: 0 };
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


  costCalculationGarment_MaterialsInfo = {
    columns: [
      { header: "Kategori", value: "Category" },
      { header: "Kode Barang", value: "ProductCode" },
      { header: "Komposisi", value: "Composition" },
      { header: "Konstruksi", value: "Construction" },
      { header: "Yarn", value: "Yarn" },
      { header: "Width", value: "Width" },
      { header: "Deskripsi", value: "Description" },
      { header: "Detail Barang", value: "ProductRemark" },
      { header: "Kuantitas", value: "Quantity" },
      { header: "Satuan", value: "SatuanQuantity" },
      { header: "Price", value: "Price" },
      { header: "Satuan", value: "SatuanPrice" },
      { header: "Konversi", value: "Conversion" },
      { header: "Total", value: "Total" },
      { header: "Ongkir (%)", value: "ShippingFeePortion" },
      { header: "Jumlah Ongkir", value: "TotalShippingFee" },
      { header: "Kuantitas Budget", value: "BudgetQuantity" },
    ],
    onAdd: function () {
      this.data.CostCalculationGarment_Materials.push({
        QuantityOrder: this.data.Quantity,
        FabricAllowance: this.data.FabricAllowance,
        AccessoriesAllowance: this.data.AccessoriesAllowance,
        Rate: this.data.Rate,
        SMV_Cutting: this.data.SMV_Cutting,
        SMV_Sewing: this.data.SMV_Sewing,
        SMV_Finishing: this.data.SMV_Finishing,
        THR: this.data.THR,
        Wage: this.data.Wage,
        SMV_Total: this.data.SMV_Total,
        Efficiency: this.data.Efficiency
      });
    }.bind(this),
    options: {}
  }
  radio = {
    Dollar: "Dollar",
    Rupiah: "Rupiah"
  }

  preSalesContractFilter = {
    IsPosted: true,
    SCType: "JOB ORDER"
  }

  constructor(router, bindingEngine, serviceEffeciency, rateService, element, serviceCore) {
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.efficiencyService = serviceEffeciency;
    this.rateService = rateService;
    this.element = element; 
    this.selectedRate = "USD"
    this.serviceCore = serviceCore;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.selectedSMV_Cutting = this.data.SMV_Cutting ? this.data.SMV_Cutting : 0;
    this.selectedSMV_Sewing = this.data.SMV_Sewing ? this.data.SMV_Sewing : 0;
    this.selectedSMV_Finishing = this.data.SMV_Finishing ? this.data.SMV_Finishing : 0;
    this.quantity = this.data.Quantity ? this.data.Quantity : 1;
    this.fabricAllowance = this.data.FabricAllowance ? this.data.FabricAllowance : 0;
    this.accessoriesAllowance = this.data.AccessoriesAllowance ? this.data.AccessoriesAllowance : 0;
    this.data.Risk = this.data.Risk ? this.data.Risk : 5;
    this.imageSrc = this.data.ImageFile = this.isEdit || this.isCopy ? (this.data.ImageFile || "#") : "#";
    this.selectedLeadTime = this.data.LeadTime ? `${this.data.LeadTime} hari` : "";
    this.selectedUnit = this.data.Unit?this.data.Unit:"";
    this.data.OTL1 = this.data.OTL1 ? this.data.OTL1 : Object.assign({}, this.defaultRate);
    this.data.OTL2 = this.data.OTL2 ? this.data.OTL2 : Object.assign({}, this.defaultRate);
    this.data.ConfirmPrice =this.data.ConfirmPrice ? this.data.ConfirmPrice .toLocaleString('en-EN', { minimumFractionDigits: 4}):0 ;
    let promises = [];

    let wage;
    if (this.data.Wage) {
      wage = new Promise((resolve, reject) => {
        resolve(this.data.Wage);
      });
      this.data.Wage.Value=this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    }
    else {
      this.data.Wage = this.defaultRate;
      wage = this.rateService.search({ filter: "{Name:\"OL\"}" })
        .then(results => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
          return result;
        });
        this.data.Wage.Value=this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    }
    promises.push(wage);

    let THR;
    if (this.data.THR) {
      THR = new Promise((resolve, reject) => {
        resolve(this.data.THR);
      });
    }
    else {
      this.data.THR = this.defaultRate;
      THR = this.rateService.search({ filter: "{Name:\"THR\"}" })
        .then(results => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
          return result;
        });
    }
    promises.push(THR);

    let rate;
    if (this.data.Rate) {
      rate = new Promise((resolve, reject) => {
        resolve(this.data.Rate);
      });
    }
    else {
      this.data.Rate = this.defaultRate;
      rate = this.rateService.search({ filter: "{Name:\"USD\"}" })
        .then(results => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
          return result;
        });
    }
    promises.push(rate);

    let all = await Promise.all(promises);
    this.data.Wage = all[0];
    this.data.Wage.Value=this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    this.data.THR = all[1];
    this.data.Rate = all[2];

    // this.selectedRate = this.data.Rate ? this.data.Rate.Name : "";
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.QuantityOrder = this.data.Quantity;
        item.FabricAllowance = this.data.FabricAllowance;
        item.AccessoriesAllowance = this.data.AccessoriesAllowance;
        item.Rate = this.data.Rate;
        item.SMV_Cutting = this.data.SMV_Cutting;
        item.SMV_Sewing = this.data.SMV_Sewing;
        item.SMV_Finishing = this.data.SMV_Finishing;
        item.THR = this.data.THR;
        item.Wage = this.data.Wage;
        item.SMV_Total = this.data.SMV_Total;
        item.Efficiency = this.data.Efficiency;
      })
    }
  }

  get preSalesContractLoader() {
    return PreSalesContractLoader;
  }

  get sizeRangeLoader() {
    return SizeRangeLoader;
  }

  get comodityLoader() {
    return ComodityLoader;
  }
  comodityView = (comodity) => {
    return`${comodity.Code} - ${comodity.Name}`
  }

  get uomLoader() {
    return UOMLoader;
  }

  get unitLoader() {
    return UnitLoader;
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`
  }

  uomView =(uom)=>{
    return uom?`${uom.Unit}` : '';
  }

  get dataSection() {
    return (this.data.Section || this.data.SectionName) ? `${this.data.Section} - ${this.data.SectionName}` : "-";
  } 

  get dataBuyer() {
    return this.data.Buyer ? this.data.Buyer.Name : "-";
  } 

  get dataBuyerBrand() {
    return this.data.BuyerBrand ? this.data.BuyerBrand.Name : "-";
  }

  @bindable selectedPreSalesContract;
  async selectedPreSalesContractChanged(newValue, oldValue) {
    if (newValue) {
      this.data.PreSCId = newValue.Id;
      this.data.PreSCNo = newValue.SCNo;
      this.data.Section = newValue.SectionCode;
      const section = await this.serviceCore.getSection(newValue.SectionId);
      this.data.SectionName = section.Name;
      this.data.Buyer = {
        Id: newValue.BuyerAgentId,
        Code: newValue.BuyerAgentCode,
        Name: newValue.BuyerAgentName
      };
      this.data.BuyerBrand = {
        Id: newValue.BuyerBrandId,
        Code: newValue.BuyerBrandCode,
        Name: newValue.BuyerBrandName
      };
    } else {
      this.data.PreSCId = 0;
      this.data.PreSCNo = null;
      this.data.Section = null;
      this.data.SectionName = null;
      this.data.Buyer = null;
      this.data.BuyerBrand = null;
    }
  }

  @bindable selectedComodity = "";
  selectedComodityChanged(newVal) {
    this.data.Comodity = newVal;
    if (newVal) {
     this.data.ComodityId=newVal.Id;
     this.data.ComodityCode=newVal.Code;
     this.data.ComodityName=newVal.Name;
    }
  }

  @bindable selectedLeadTime = "";
  selectedLeadTimeChanged(newVal) {
 
    if (newVal === "30 hari")
    {
      this.data.LeadTime = 30;
    }
    else if (newVal === "45 hari")
    {      
      this.data.LeadTime = 45;
      
    }
    else
      this.data.LeadTime = 0;
     
  }

  @bindable imageUpload;
  @bindable imageSrc;
  imageUploadChanged(newValue) {
    let imageInput = document.getElementById('imageInput');
    let reader = new FileReader();
    reader.onload = event => {
      let base64Image = event.target.result;
      this.imageSrc = this.data.ImageFile = base64Image;
    }
    reader.readAsDataURL(imageInput.files[0]);
  }

  @bindable selectedRate;
  // selectedRateChanged(newValue, oldValue) {
  //   if (newValue && newValue.toUpperCase() === "RUPIAH") {
  //     this.data.Rate = { Id: 0, Value: 1, CalculatedValue: 1 };
  //   }
  //   else {
  //     this.data.Rate = this.RateDollar;
  //   }
  // }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || 0) != 0;
  }
  @computedFrom("error.CostCalculationGarment_MaterialTable")
  get hasError() {
    return (this.error.CostCalculationGarment_MaterialTable ? this.error.CostCalculationGarment_MaterialTable.length : 0) > 0;
  }

  get lineLoader() {
    return lineLoader;
  }

  @bindable quantity;
  async quantityChanged(newValue) {
    this.data.Quantity = newValue;
    this.data.Efficiency = await this.efficiencyService.getEffByQty(this.data.Quantity);
    this.data.Efficiency.Value=this.data.Efficiency.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    let index = this.data.Efficiency.Value ? 100 / this.data.Efficiency.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) : 0;
    this.data.Index = numeral(numeral(index).format()).value().toLocaleString('en-EN', { minimumFractionDigits: 2 });
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.QuantityOrder = this.data.Quantity;
        item.Efficiency = this.data.Efficiency;
      })
      this.context.itemsCollection.bind()
    }
  }

  @bindable fabricAllowance;
  fabricAllowanceChanged(newValue) {
    this.data.FabricAllowance = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.FabricAllowance = this.data.FabricAllowance;
      })
    }
  }

  @bindable accessoriesAllowance;
  accessoriesAllowanceChanged(newValue) {
    this.data.AccessoriesAllowance = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.AccessoriesAllowance = this.data.AccessoriesAllowance;
      })
    }
  }

  @bindable selectedSMV_Cutting;
  selectedSMV_CuttingChanged(newValue) {
    this.data.SMV_Cutting = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Cutting = this.data.SMV_Cutting;
      })
      this.context.itemsCollection.bind()
    }
  }

  @bindable selectedSMV_Sewing;
  selectedSMV_SewingChanged(newValue) {
    this.data.SMV_Sewing = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Sewing = this.data.SMV_Sewing;
      })
      this.context.itemsCollection.bind()
    }
  }

  @bindable selectedSMV_Finishing;
  selectedSMV_FinishingChanged(newValue) {
    this.data.SMV_Finishing = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Finishing = this.data.SMV_Finishing;
      })
      this.context.itemsCollection.bind()
    }
  }

 

  @bindable selectedUnit;
  async selectedUnitChanged(newVal) {
    this.data.Unit = newVal;
    this.data.UnitId=newVal.Id;
    this.data.UnitCode=newVal.Code;
    this.data.BuyerName=newVal.Name;
    if (newVal) {
      let UnitCode = newVal.Code;

      let promises = [];
      let OTL1 = this.rateService.search({ filter: JSON.stringify({ Name: "OTL 1", UnitCode: UnitCode }) }).then((results) => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
        return result;
      });
      promises.push(OTL1);

      let OTL2 = this.rateService.search({ filter: JSON.stringify({ Name: "OTL 2", UnitCode: UnitCode }) }).then((results) => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
        return result;
      });
      promises.push(OTL2);

      let results = await Promise.all(promises);

      this.data.OTL1 = results[0];
      this.data.OTL2 = results[1];
      this.data.UnitCode=newVal.Code;
      this.data.UnitId=newVal.Id;
      this.data.UnitName=newVal.Name;
    }
  }


  @computedFrom('data.SMV_Cutting', 'data.SMV_Sewing', 'data.SMV_Finishing')
  get SMV_Total() {
    let SMV_Total = this.data.SMV_Cutting + this.data.SMV_Sewing + this.data.SMV_Finishing;
    SMV_Total = numeral(SMV_Total).format();
    this.data.SMV_Total = numeral(SMV_Total).value();

    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Finishing = this.data.SMV_Total;
      })
    }

    return SMV_Total;
  }

  @computedFrom('data.CommissionPortion', 'data.ConfirmPrice', 'data.Freight', 'data.Insurance', 'data.Rate')
  get commissionRate() {
    let CommissionRate = this.data.CommissionPortion / 100 * (this.data.ConfirmPrice - this.data.Insurance - this.data.Freight) * this.data.Rate.Value;
    CommissionRate = numeral(CommissionRate).format();
    this.data.CommissionRate=numeral(CommissionRate).value();
    return CommissionRate;
  }

  @computedFrom('data.OTL1', 'data.SMV_Total')
  get calculatedRateOTL1() {
    let calculatedRateOTL1 = this.data.SMV_Total ? this.data.OTL1.Value * this.data.SMV_Total * 60 : 0;
    calculatedRateOTL1 = numeral(calculatedRateOTL1).format();
    this.data.OTL1.CalculatedValue = numeral(calculatedRateOTL1).value();
    return calculatedRateOTL1;
  }

  @computedFrom('data.OTL2', 'data.SMV_Total')
  get calculatedRateOTL2() {
    let calculatedRateOTL2 = this.data.SMV_Total ? this.data.OTL2.Value * this.data.SMV_Total * 60 : 0;
    calculatedRateOTL2 = numeral(calculatedRateOTL2).format();
    this.data.OTL2.CalculatedValue = numeral(calculatedRateOTL2).value();
    return calculatedRateOTL2;
  }

  @computedFrom('data.Wage', 'data.SMV_Sewing', 'data.Efficiency' + 'data.SMV_Cutting', 'data.SMV_Finishing', 'data.THR', 'data.SMV_Total')
  get productionCost() {
    let productionCost = this.data.Efficiency ?
      (this.data.Efficiency.Value ? this.data.Wage.Value * this.data.SMV_Sewing * 100 / this.data.Efficiency.Value +
        this.data.Wage.Value * this.data.SMV_Cutting * 100 / 75 +
        this.data.Wage.Value * this.data.SMV_Finishing * 100 / 90 +
        this.data.THR.Value * this.data.SMV_Total : 0)
      : 0;
    productionCost = numeral(productionCost).format();
    this.data.ProductionCost = numeral(productionCost).value();
    return productionCost;
  }

  @computedFrom('data.ConfirmPrice', 'data.Insurance', 'data.Freight', 'data.Rate', 'data.CommissionRate')
  get NETFOB() {
    let NETFOB = (this.data.ConfirmPrice - this.data.Insurance - this.data.Freight) * this.data.Rate.Value - this.data.CommissionRate;
    NETFOB = numeral(NETFOB).format();
    this.data.NETFOB = numeral(NETFOB).value();
    return NETFOB;
  }

  get freightCost() {
    let freightCost = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        freightCost += item.TotalShippingFee;
      })
    }
    freightCost = numeral(freightCost).format();
    this.data.FreightCost = numeral(freightCost).value();
    
    return freightCost;
  }



  get NETFOBP() {
    let allMaterialCost = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        allMaterialCost += item.Total;
      })
    }
    let subTotal = allMaterialCost !== 0 ? (allMaterialCost + this.data.OTL1.CalculatedValue + this.data.OTL2.CalculatedValue) * (100 + this.data.Risk) / 100 + this.data.FreightCost : 0;
    let NETFOBP = this.data.NETFOB && subTotal !== 0 ? (this.data.NETFOB - subTotal) / subTotal * 100 : 0;
    NETFOBP = numeral(NETFOBP).format();
    this.data.NETFOBP = numeral(NETFOBP).value();
    return NETFOBP;
  }
}
