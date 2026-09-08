import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../../components/dialog/dialog';
import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const GarmentProductLoader = require('../../../../../loader/garment-product-loader');
const GarmentCategoryLoader = require('../../../../../loader/garment-category-loader');
import { Service } from '../../service';
import { ServiceCore } from '../../service-core';
import { PRMasterDialog } from './pr-master-dialog';

const rateNumberFormat = "0,0.000";

const UomLoader = require('../../../../../loader/uom-loader');

@inject(Dialog, Service, ServiceCore)
export class CostCalculationMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    controlOptions2 = {
        control: {
            length: `12 text-center text-uppercase`
        }
    };

    constructor(dialog, service, serviceCore) {
        this.dialog = dialog;
        this.service = service;
        this.serviceCore = serviceCore
    }

    @bindable categoryName = "";
    @bindable isProcess = false;
    @bindable categoryNames = "";
    @bindable isEdit = false;
    @bindable isCopy = false;
    @bindable fabricCM;
    @bindable selectedUOMPrice;
    @bindable selectedUOMQuantity;
    @bindable productCode = "";
    @bindable selectedComposition;
    @bindable selectedConstruction;
    @bindable selectedYarn;
    @bindable selectedCategory;
    @bindable selectedWidth;
    @bindable OTLRate;
    @bindable listProcess = ["PROCESS", "PROCESS SEWING", "PROCESS CUTTING", "PROCESS FINISHING"]
    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.OTLRate = this.context.context.options.OTLRate || 0;
        console.log(this.OTLRate);
        this.readOnly = this.options.readOnly || false;
        this.isEdit = this.context.context.options.IsEditMaterial  || false;
        this.isCopy = this.context.context.options.IsCopyCC || false;
        this.data.showDialog = this.data.showDialog === undefined ? (this.data.Category === undefined ? true : false) : (this.data.showDialog === true ? true : false);
        this.data.isFabricCM = this.data.isFabricCM ? this.data.isFabricCM : false;
        this.categoryNames = this.data.Category ? (this.data.Category.name || this.data.Category.Name || "").toString().trim().toUpperCase() : "";
        if (this.data.Category) {
            this.selectedCategory = this.data.Category;
            if(this.data.CCType != "SUBCON KELUAR"){
                if (this.categoryNames == 'PROCESS') {
                    this.data.Price = this.calculateProcessPrice();
                }else if (this.categoryNames == 'PROCESS SEWING') {
                    this.data.Price = this.calculateProcessPriceSewing();
                }else if (this.categoryNames == 'PROCESS CUTTING') {
                    this.data.Price = this.calculateProcessPriceCutting();
                }else if (this.categoryNames == 'PROCESS FINISHING') {
                    this.data.Price = this.calculateProcessPriceFinishing();
                }
            }else if(this.data.CCType == "SUBCON KELUAR" && this.categoryNames == 'PROCESS'){
                this.data.Price = this.calculateProcessPriceSubconOut();
            }
        }

        if (this.data.Product) {
                this.productCode = this.data.Product.Code;
            if (this.data.Product.Composition) {
                this.selectedComposition = Object.assign({}, this.data.Product);
            }
            if (this.data.Product.Const) {
                this.selectedConstruction = Object.assign({}, this.data.Product);
            }
            if (this.data.Product.Yarn) {
                this.selectedYarn = Object.assign({}, this.data.Product);
            }
            if (this.data.Product.Width) {
                this.selectedWidth = Object.assign({}, this.data.Product);
            }
        }

        if(this.data.UOMPrice){
            this.selectedUOMPrice = this.data.UOMPrice.Unit;
        }
        if(this.data.UOMQuantity){
            this.selectedUOMQuantity = this.data.UOMQuantity.Unit;
        }

        if(this.data.Id || this.data.isCopy)
        {
            if (this.data.Category && this.categoryNames !== "FABRIC") {
                this.isReadOnly = true;
            }
        }
        if (this.data.Category && typeof this.data.Category === "object") {
            this.data.Category.Code = this.data.Category.code || this.data.Category.Code;
            this.data.Category.Name = this.data.Category.name || this.data.Category.Name;
            this.data.Category = this.data.Category;
        }
    }

    bind() {

    }



    //SEMENTARA RUMUS PERHITUNGAN DIPISAHKAN BY TYPE PROCESS NYA
    calculateProcessPriceCutting() {
        let CuttingFee = (this.data.Wage.Value * (100 / 70)) + this.OTLRate;
        let THR = this.data.THR.Value;
        let result = CuttingFee + THR;
        return numeral(numeral(result).format(rateNumberFormat)).value();
    }
    calculateProcessPriceSewing() {
        let SewingFee = (this.data.Wage.Value * (100 / this.data.Efficiency.Value)) + this.OTLRate;
        let THR = this.data.THR.Value;
        let result = SewingFee + THR;
        return numeral(numeral(result).format(rateNumberFormat)).value();
    }
    calculateProcessPriceFinishing() {
        let FinishingFee = (this.data.Wage.Value * (100 / 92)) + this.OTLRate;
        let THR = this.data.THR.Value;
        let result = FinishingFee + THR;
        return numeral(numeral(result).format(rateNumberFormat)).value();
    }

    
    calculateProcessPrice() {
        let CuttingFee = this.data.Wage.Value * this.data.SMV_Cutting * (100 / 70);
        let SewingFee = this.data.Wage.Value * this.data.SMV_Sewing * (100 / this.data.Efficiency.Value);
        let FinishingFee = this.data.Wage.Value * this.data.SMV_Finishing * (100 / 92);
        let THR = this.data.THR.Value * this.data.SMV_Total;
        let result = CuttingFee + SewingFee + FinishingFee + THR;
        return numeral(numeral(result).format(rateNumberFormat)).value();
    }

    calculateProcessPriceSubconOut() {
        let CuttingFee = 0;
        let SewingFee = 0;
        let FinishingFee = 0;
        let THR = 0;
        switch (this.data.SubconType) {
            case "SUBCON SEWING":
                CuttingFee = this.data.Wage.Value * this.data.SMV_Cutting * (100 / 70) + this.OTLRate;
                FinishingFee = this.data.Wage.Value * this.data.SMV_Finishing * (100 / 92) + this.OTLRate;
                // THR = this.data.THR.Value * (this.data.SMV_Cutting + this.data.SMV_Finishing);
                THR = this.data.THR.Value;
                break;
            case "SUBCON CUTTING SEWING":
                FinishingFee = this.data.Wage.Value * this.data.SMV_Finishing * (100 / 92) + this.OTLRate;
                // THR = this.data.THR.Value * this.data.SMV_Finishing;
                THR = this.data.THR.Value;
                break;
            default:
                break;
        }
        let result = CuttingFee + SewingFee + FinishingFee + THR;
        return numeral(numeral(result).format(rateNumberFormat)).value();
    }

    @computedFrom('data.Quantity', 'data.Price', 'data.Conversion', 'data.isFabricCM', 'data.CCType', 'data.Category', 'data.Category.Name', 'data.Category.name', 'data.Allowance', 'data.QuantityBreakdown', 'data.QuantityOrder')
    get total() {
        let allowance = this.data.Allowance ? ((this.data.Allowance / 100) * this.data.Quantity) : 0;
        let total = 0;
        this.categoryNames = this.data.Category ? (this.data.Category.name || this.data.Category.Name || "").toUpperCase() : "";
        if (this.data.CCType != "SUBCON KELUAR") {
            total = this.data.QuantityBreakdown && this.data.Conversion && parseFloat(this.data.Price) && this.data.QuantityOrder && this.data.Quantity ? (((this.data.QuantityBreakdown / this.data.QuantityOrder) * (this.data.Quantity + allowance)) / this.data.Conversion * (parseFloat(this.data.Price))): 0 ; 
            if (this.data.isFabricCM) {
                this.data.Total = 0;
                // this.data.Total = numeral(total).value();
                this.data.TotalTemp = numeral(total).value();
                this.data.CM_Price = numeral(total).value();
            }
            else {
                this.data.Total = numeral(total).value();
                this.data.TotalTemp = numeral(total).value();;
                this.data.CM_Price = null;
            }
        } else if (this.data.CCType == "SUBCON KELUAR" && this.data.Category) {
            if (this.categoryNames === "PROCESS SUBCON") {
                total =  this.data.Price ?  parseFloat(this.data.Price) : 0;
                this.data.Total = numeral(total).value();
                this.data.TotalTemp = numeral(total).value();;
                this.data.CM_Price = null;
            //Calculated Item jika Category bukan PROCESS SUBCON
            } else {
                total = this.data.QuantityBreakdown && this.data.Conversion && parseFloat(this.data.Price) && this.data.QuantityOrder && this.data.Quantity ? (((this.data.QuantityBreakdown / this.data.QuantityOrder) * (this.data.Quantity + allowance)) / this.data.Conversion * (parseFloat(this.data.Price))): 0 ; 
                if (this.data.isFabricCM) {
                    this.data.Total = 0;
                    // this.data.Total = numeral(total).value();
                    this.data.TotalTemp = numeral(total).value();
                    this.data.CM_Price = numeral(total).value();
                }
                else {
                    this.data.Total = numeral(total).value();
                    this.data.TotalTemp = numeral(total).value();;
                    this.data.CM_Price = null;
                }
            }
        }
        total=parseFloat(total).toFixed(2);
        
        return total;
    }

    @computedFrom('data.ShippingFeePortion', 'data.TotalTemp')
    get totalShippingFee() {
        let totalShippingFee = numeral(this.data.ShippingFeePortion / 100 * this.data.TotalTemp).format();
        this.data.TotalShippingFee = numeral(totalShippingFee).value();
        return totalShippingFee;
    }

    @computedFrom('data.Category', 'data.Category.Name', 'data.Category.name', 'data.Quantity', 'data.Conversion', 'data.QuantityOrder', 'data.Allowance')
    get budgetQuantity() {
        let allowance = this.data.Allowance ? ((this.data.Allowance / 100) * this.data.Quantity) : 0;
        this.categoryNames = this.data.Category ? (this.data.Category.name || this.data.Category.Name || "").toUpperCase() : "";

        let budgetQuantity = this.data.QuantityBreakdown && this.data.Conversion && this.data.Quantity ? ((this.data.QuantityBreakdown * (this.data.Quantity + allowance)) / this.data.Conversion)  : 0;
        if (!this.listProcess.includes(this.categoryNames)) {
            budgetQuantity = Math.ceil(budgetQuantity);
            this.data.BudgetQuantity = Math.ceil(budgetQuantity);
        }else {
            budgetQuantity = parseFloat(budgetQuantity.toFixed(2));
            this.data.BudgetQuantity = budgetQuantity;
        }
        return budgetQuantity;
    }

    clickPRMaster() {
        var productCategory = this.data.Category ? this.data.Category.Name : null;
        var productCode = this.data.Product ? this.data.Product.Code : null;
        this.dialog.show(PRMasterDialog, { CCId: this.context.context.options.CCId || 0, 
            BuyerCode: this.context.context.options.BuyerCode || null,
            IsCMT: this.data.isFabricCM || false,  
            CategoryName: productCategory, 
            ProductCode: productCode })
            .then(response => {
                if (!response.wasCancelled) {
                    this.error = {};

                    const result = response.output;

                    this.data.IsPRMaster = true;
                    this.data.PRMasterId = result.PRMasterId;
                    this.data.PRMasterItemId = result.PRMasterItemId;
                    this.data.POMaster = result.POMaster;
                    // this.data.Category = result.Category;
                    // this.data.Product = result.Product;
                    // this.productCode = this.data.Product ? this.data.Product.Code : "";
                    // // this.data.Description = result.Description;
                    // this.data.Price = result.BudgetPrice;
                    // this.data.UOMPrice = result.PriceUom;
                    this.data.AvailableQuantity = result.AvailableQuantity;
                    // this.data.isFabricCM = result.IsCMT;
                    // if(this.data.isFabricCM){
                    //     this.data.ShippingFeePortion = 0;
                    // }
                    // this.categoryNames = this.data.Category ? (this.data.Category.name || this.data.Category.Name || "").toUpperCase() : "";
                    // this.serviceCore.getCategoryId(this.data.Category.Id)
                    //     .then(category => {
                    //         if (category && typeof category === "object") {
                    //             category.Code = category.code || category.Code;
                    //             category.Name = category.name || category.Name;

                    //             this.data.Category = category;
                    //         }
                    //         this.data.showDialog = false;
                    //     });
                     this.data.showDialog = false;
                }
            });
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        }
        else
            return true;
    }
}
