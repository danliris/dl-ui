import { bindable } from "aurelia-framework";

var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

export class ExportItem {
  @bindable Weight;

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.WeightUom = context.context.options.WeightUom;
    this.SalesContractNo = context.context.options.SalesContractNo;
    this.filter={ "SalesContractNo": this.SalesContractNo };

    this.selectedProductionOrder = this.data.ProductionOrder;

    if (!this.data.Packing) {
      this.data.Packing = 0;
    }
    if (!this.data.Weight) {
      this.data.Weight = 0;
    }
    if (!this.data.ConvertionValue) {
      this.data.ConvertionValue = 0;
    }

    this.Packing = this.data.Packing;
    this.Weight = this.data.Weight;
    if (this.WeightUom == "KG") {
      this.getConvertionValue = this.Weight * 0.005;
    } else if (this.WeightUom == "BALE") {
      this.getConvertionValue = this.Weight * 217.72;
    } else {
      this.getConvertionValue = 0;
    }
    this.data.ConvertionValue = this.getConvertionValue;


    if (this.data.ProductionOrder && this.data.ProductionOrder.Id) {
      this.selectedProductionOrder = this.data.ProductionOrder;
    }
  }

  WeightChanged(newValue, oldValue) {
    if (this.Weight && this.Weight > 0) {
      this.data.Weight = {};
      if (this.WeightUom == "KG") {
        this.getConvertionValue = this.Weight * 0.005;
      } else if (this.WeightUom == "BALE") {
        this.getConvertionValue = this.Weight * 217.72;
      } else {
        this.getConvertionValue = 0;
      }
    } else {
      this.getConvertionValue = 0;
    }
    this.data.ConvertionValue = this.getConvertionValue;
    this.data.Weight = this.Weight;
  }

  @bindable selectedProductionOrder;
  async selectedProductionOrderChanged(newValue, oldValue) {
    if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
      
      for (var detailItem of this.selectedProductionOrder.Details) {
        
        this.data.Material = this.selectedProductionOrder.Material;
        this.data.MaterialConstruction = this.selectedProductionOrder.MaterialConstruction;
        this.data.MaterialWidth = this.selectedProductionOrder.MaterialWidth;
        this.data.ColorRequest = detailItem.ColorRequest;
        this.data.ColorTemplate = detailItem.ColorTemplate;
        //this.data.ProductionOrder = this.selectedProductionOrder;
        this.data.ProductionOrder = this.selectedProductionOrder;
        this.data.ProductionOrder.OrderNo = this.selectedProductionOrder.OrderNo;

        this.data.ConstructionName = `${this.selectedProductionOrder.Material.Name} 
        / ${this.selectedProductionOrder.MaterialConstruction.Name} 
        / ${this.selectedProductionOrder.MaterialWidth}
        / ${detailItem.ColorRequest}`

        //this.selectedProductionOrder.OrderNo = newValue;
      }

    }

  }

  productionOrderTextFormatter = (productionOrder) => {
    // console.log(productionOrder);
    return `${productionOrder.OrderNo}`
  }

  get productionOrderLoader() {
    return ProductionOrderLoader;
  }
}
