import { bindable, computedFrom } from 'aurelia-framework'
import { factories } from 'powerbi-client';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var UomLoader = require('../../../../loader/uom-loader');

const resource = 'master/garmentProducts';
const POresource = 'garment-internal-purchase-orders';
export class PurchaseOrderItem {
  @bindable selectedDealUom;
  @bindable price;
  @bindable qty;
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isUseVat = this.context.context.options.isUseVat || false;
    this.checkOverBudget = this.context.context.options.checkOverBudget;
    this.kurs = this.context.context.options.kurs;
    this.selectedDealUom = this.data.dealUom;
    this.price = this.data.PricePerDealUnit;
    this.qty = this.data.DealQuantity;
    this.isEdit = this.context.context.options.isEdit || false;
    if (!this.data.budgetUsed) {
      this.data.budgetUsed = 0;
    }
    if (!this.data.totalBudget) {
      this.data.totalBudget = 0;
    }
    if (this.data.DealUom) {
      this.selectedDealUom = this.data.DealUom;
    }
    if (!this.data.SmallUom && this.data.Product) {
      if (this.data.Product.Id) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var productUri = `${resource}/${this.data.Product.Id}`;
        await endpoint.find(productUri)
          .then((result) => {
            var product = result.data;
            this.data.SmallUom = product.UOM;
          });
      }
    }
    this.data.SmallQuantity = parseFloat(this.data.DealQuantity * this.data.Conversion).toFixed(2);
    if (!this.data.UsedBudget) {
      this.data.budgetUsed = (this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate);
    }
    else {
      this.data.budgetUsed = this.data.UsedBudget;
    }
    // this.data.DefaultQuantity = parseFloat(this.data.DefaultQuantity).toFixed(2);
    // this.data.DealQuantity = parseFloat(this.data.DealQuantity).toFixed(2);
    // if(this.data.Id){
    //   if(this.data.POId){
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("purchasing-azure");
    //     var pOUri=`${POresource}/${this.data.POId}`;
    //     await endpoint.find(pOUri)
    //         .then((result) => {
    //           var PO=result.data;
    //           this.data.Initial=PO.remainingBudget+this.data.;
    //         });
    //   }
    // }
    if (this.options.readOnly) {
      this.data.PricePerDealUnit = parseFloat(this.data.PricePerDealUnit).toFixed(4);
    }

    // Store default values for comparison later
    if (this.data.Id) {
      this.defaultPricePerDealUnit = this.data.BudgetPrice;
    }
    else {
      this.defaultPricePerDealUnit = this.data.DefaultPricePerDealUnit;
    }
    this.defaultDealQuantity = this.data.DefaultQuantity;

    if (!this.options.readOnly)
      this.checkIsOverBudget();
  }

  bind() {
    if (this.context.context.options.resetOverBudget == true) {
      this.price = this.data.BudgetPrice;
      this.qty = this.data.DefaultQuantity;
      this.context.context.options.resetOverBudget = false;
      if (this.error) {
        if (this.error.overBudgetRemark) {
          this.error.overBudgetRemark = "";
        }
      }
    }
  }

  // checkIsOverBudget() {
  //   if (!this.options.readOnly)
  //     if (this.context.context.options.checkOverBudget) {
  //       this.data.UsedBudget = parseFloat(this.data.budgetUsed.toFixed(4));
  //       //this.data.budgetUsed=(this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate);
  //       //var totalDealPrice = ((this.data.DealQuantity * this.price * this.kurs.Rate) + this.data.budgetUsed).toFixed(4);
  //       var totalDealPrice = parseFloat((this.data.remainingBudget - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));
  //       //var totalBudget=parseInt(this.data.totalBudget.toFixed(4));
  //       //this.data.RemainingBudget=totalDealPrice;

  //       if (this.data.UENItemId) {
  //         totalDealPrice = parseFloat((this.data.BudgetFromUEN - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));
  //       }
  //       if (totalDealPrice < 0) {
  //         this.data.IsOverBudget = true;

  //         //calculate over budget amount and type
  //         let overBudgetAmount = [];
  //         //calculate over budget type and amount when deal quantity and price per deal unit is different from default value
  //         if (this.defaultDealQuantity < this.data.DealQuantity && this.defaultPricePerDealUnit < (this.data.PricePerDealUnit * this.kurs.Rate)) {
  //           let remark = ["Selisih Qty", "Selisih Harga"];

  //           // set over budget remark string
  //           this.data.OverBudgetType = remark.map(r => `- ${r}`).join('\n');

  //           // calculate over budget amount
  //           let OBQty = parseFloat((this.data.DealQuantity - this.defaultDealQuantity) * this.data.PricePerDealUnit);
  //           let OBPrice = parseFloat(((this.data.PricePerDealUnit * this.kurs.Rate) - this.defaultPricePerDealUnit) * this.defaultDealQuantity);

  //           // set over budget amount
  //           overBudgetAmount.push(OBQty, OBPrice);
  //           // sum over budget amount from OBQty and OBPrice
  //           this.data.OverBudgetAmount = parseFloat((OBQty + OBPrice).toFixed(4));
  //         }
  //         // calculate over budget type and amount when deal quantity is different from default value
  //         else if (this.defaultDealQuantity < this.data.DealQuantity) {
  //           this.data.OverBudgetType = "- Selisih Qty";
  //           this.data.OverBudgetAmount = parseFloat((this.data.DealQuantity - this.defaultDealQuantity) * this.data.PricePerDealUnit).toFixed(4);
  //           overBudgetAmount.push(this.data.OverBudgetAmount);
  //         }
  //         // calculate over budget type and amount when price per deal unit is different from default value
  //         else if (this.defaultPricePerDealUnit < (this.data.PricePerDealUnit * this.kurs.Rate)) {
  //           this.data.OverBudgetType = "- Selisih Harga";
  //           this.data.OverBudgetAmount = parseFloat(((this.data.PricePerDealUnit * this.kurs.Rate) - this.defaultPricePerDealUnit) * this.data.DealQuantity).toFixed(4);
  //           console.log("OverBudgetAmount", this.data.OverBudgetAmount);
  //           overBudgetAmount.push(this.data.OverBudgetAmount);
  //         }

  //         // set over budget remark string 
  //         this.data.OverBudgetAmountStr = overBudgetAmount.map(r => `- ${r}`).join("\n")

  //       } else {
  //         this.data.IsOverBudget = false;
  //         this.data.OverBudgetRemark = "";
  //         //set default value
  //         this.data.OverBudgetType = "";
  //         this.data.OverBudgetAmountStr = "";
  //         this.data.OverBudgetAmount = 0;
  //       }
  //     }
  // }

  checkIsOverBudget() {
  if (!this.options.readOnly)
    if (this.context.context.options.checkOverBudget) {
      this.data.UsedBudget = parseFloat(this.data.budgetUsed.toFixed(4));

      var totalDealPrice = parseFloat((this.data.remainingBudget - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));

      if (this.data.UENItemId) {
        totalDealPrice = parseFloat((this.data.BudgetFromUEN - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));
      }
      if (totalDealPrice < 0) {
        this.data.IsOverBudget = true;

        let overBudgetAmount = [];
        if (this.defaultDealQuantity < this.data.DealQuantity && this.defaultPricePerDealUnit < (this.data.PricePerDealUnit * this.kurs.Rate)) {
          let remark = ["Selisih Qty", "Selisih Harga"];

          this.data.OverBudgetType = remark.map(r => `- ${r}`).join('\n');

          let OBQty = parseFloat((this.data.DealQuantity - this.defaultDealQuantity) * (this.data.PricePerDealUnit * this.kurs.Rate));
          let OBPrice = parseFloat(((this.data.PricePerDealUnit * this.kurs.Rate) - this.defaultPricePerDealUnit) * this.defaultDealQuantity);

          overBudgetAmount.push(OBQty, OBPrice);
          this.data.OverBudgetAmount = parseFloat((OBQty + OBPrice).toFixed(4));
        }
        else if (this.defaultDealQuantity < this.data.DealQuantity) {
          this.data.OverBudgetType = "- Selisih Qty";

          this.data.OverBudgetAmount = parseFloat((
            (this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate) -
            (this.defaultDealQuantity * this.defaultPricePerDealUnit)
          ).toFixed(4));

          overBudgetAmount.push(this.data.OverBudgetAmount);
        }
        else if (this.defaultPricePerDealUnit < (this.data.PricePerDealUnit * this.kurs.Rate)) {
          this.data.OverBudgetType = "- Selisih Harga";

          this.data.OverBudgetAmount = parseFloat((
            (this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate) -
            (this.defaultDealQuantity * this.defaultPricePerDealUnit)
          ).toFixed(4));

          //console.log("OverBudgetAmount", this.data.OverBudgetAmount);
          overBudgetAmount.push(this.data.OverBudgetAmount);
        }

        this.data.OverBudgetAmountStr = overBudgetAmount.map(r => `- ${r}`).join("\n")

      } else {
        this.data.IsOverBudget = false;
        this.data.OverBudgetRemark = "";
        this.data.OverBudgetType = "";
        this.data.OverBudgetAmountStr = "";
        this.data.OverBudgetAmount = 0;
      }
    }
}

  updatePrice() {
    // if (this.data.UseIncomeTax) {
    //   this.data.PricePerDealUnit = (100 * this.price) / 110;
    // } else {
    //   this.data.PricePerDealUnit = this.price;
    // }
    this.checkIsOverBudget();
  }

  selectedDealUomChanged(newValue) {
    if (newValue.Id) {
      this.data.DealUom = newValue;
    }
  }

  get quantityConversion() {
    this.data.SmallQuantity = parseFloat(parseFloat(this.data.DealQuantity) * this.data.Conversion).toFixed(2);
    return this.data.SmallQuantity;
  }

  conversionChanged(e) {
    this.data.SmallQuantity = parseFloat(parseFloat(this.data.DealQuantity) * this.data.Conversion).toFixed(2);
  }

  priceChanged(e) {
    if (e.detail)
      this.data.budgetUsed = parseFloat(e.detail) * parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    else {
      this.data.budgetUsed = parseFloat(this.data.PricePerDealUnit) * parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    }
    this.checkIsOverBudget();
  }

  qtyChanged(e) {
    if (e.detail)
      this.data.budgetUsed = parseFloat(e.detail) * parseFloat(this.data.PricePerDealUnit) * this.kurs.Rate;
    else {
      this.data.budgetUsed = parseFloat(this.data.PricePerDealUnit) * parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    }
    // this.data.budgetUsed=parseFloat(e.srcElement.value)* this.data.PricePerDealUnit * this.kurs.Rate;
    this.checkIsOverBudget();
  }

  useIncomeTaxChanged(e) {
    this.checkIsOverBudget();
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  get prNo() {
    return `${this.data.PRNo} - ${this.data.PO_SerialNumber} - ${this.data.Article}`;
  }

  get product() {
    return this.data.Product.Name;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}