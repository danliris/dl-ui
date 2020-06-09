import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service  } from "../service";
import { SalesService  } from "../service-sales";
var CostCalLoader = require('../../../../loader/cost-calculation-garment-loader');

@inject(Service, SalesService)
export class items {
  @bindable roNo;
  controlOptions = {
    control: {
        length: 12
    }
};

constructor( service, salesService) {
    this.service = service;
    this.salesService = salesService;
    console.log(this.salesService,this.service);
}

    activate(context) {
      this.context = context;
      this.saveAll=false;
      this.data = context.data;
      this.error = context.error;
      this.options = this.context.options;
      this.roNo= this.data.roNo;
     console.log(this.context);
    
    }
  get costCalLoader() {
      return CostCalLoader;
  }

  costCalView = (cc) => {
    console.log(cc)
      return `${cc.RO_Number}`;
  }

 
async roNoChanged(newValue, oldValue) {
  var selectedRo = newValue;
  console.log(selectedRo);
  if (selectedRo) {
      this.data.buyerBrand =
      {
        id : selectedRo.BuyerBrand.Id,
        code : selectedRo.BuyerBrand.Code,
        name : selectedRo.BuyerBrand.Name
      }
      this.data.comodity ={
        id : selectedRo.Comodity.Id,
        code : selectedRo.Comodity.Code,
        name : selectedRo.Comodity.Name
      }
      this.data.quantity = selectedRo.Quantity;
      this.data.currencyCode ="USD",
      this.data.unit= {
        id : selectedRo.Unit.Id,
        code : selectedRo.Unit.Code,
        name : selectedRo.Unit.Name
      }
      this.data.uom={
        id : selectedRo.UOM.Id,
        code : selectedRo.UOM.Code,
        name : selectedRo.UOM.Name
      }
      var garmentSC= await this.salesService.getbyRO(selectedRo.RO_Number);
     this.data.scNo= garmentSC.SalesContractNo;
     this.data.amount = garmentSC.Amount;
     this.data.price= garmentSC.Price;
     this.data.priceRO= garmentSC.Price;
      console.log(this.data);
  }
}
}