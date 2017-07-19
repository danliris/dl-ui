import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var BuyersLoader = require("../../../../loader/buyers-loader");
var MaterialConstructionLoader = require("../../../../loader/material-loader");

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;


    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() !== '';
    }

    get isSolid() {
        return (this.data.orderType || "").toString().toLowerCase() === "solid";
    }

    async bind(context) {
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        this.error = this.context.error;

        var productionOrderId = this.data.productionOrderId;
        // var productionOrderId = "58c8f8287b915900364dd2b0";
        if (productionOrderId) {
            this.selectedProductionOrder = await this.service.getProductionOrderById(productionOrderId, this.productionOrderFields);
        }

        var buyerId = this.data.buyerId;
        if (buyerId) {
            this.selectedBuyer = await this.service.getBuyerById(buyerId, this.buyerFields);
        }

        var materialConstructionId = this.data.materialConstructionFinishId;
        if (materialConstructionId) {
            this.selectedMaterialConstructionFinish = await this.service.getMaterialConstructionById(materialConstructionId, this.materialConstructionFields);
        }
    }
    errorChanged() {
        console.log(this.error)
    }

    itemColumns = ["Lot", "Grade", "Kuantitas", "Berat Satuan", "Berat Total", "Panjang Satuan", "Panjang Total", "Remark"];
    packingUomOptions = ["", "ROLL", "PCS", "POT", "SETS", "SLP", "BDL", "KRG", "LBR"];

    @bindable selectedProductionOrder;
    async selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
            this.data.productionOrderId = this.selectedProductionOrder._id;
            var color = this.selectedProductionOrder.details && this.selectedProductionOrder.details.length > 0 ? this.selectedProductionOrder.details[0] : {};
            // console.log(this.selectedProductionOrder);//"selectedProductionOrderChanged")
            this.data.colorCode = color.code;
            this.data.colorName = color.colorRequest;
            this.data.colorType = color.colorType && color.colorType.name ? color.colorType.name : null;
            this.data.orderType = this.selectedProductionOrder.orderType.name;
            this.data.designNumber = (this.data.orderType || "").toString().toLowerCase() === "printing" ? this.selectedProductionOrder.designNumber : null;
            this.data.designCode = (this.data.orderType || "").toString().toLowerCase() === "printing" ? this.selectedProductionOrder.designCode : null;
            if (!this.data.buyerId && this.selectedProductionOrder && this.selectedProductionOrder.buyer && this.selectedProductionOrder.buyer._id) {
                if (!this.selectedBuyer) {
                    this.selectedBuyer = await this.service.getBuyerById(this.selectedProductionOrder.buyer._id);
                }
            }
            if (!this.data.materialWidthFinish) {
                this.data.materialWidthFinish = this.selectedProductionOrder.finishWidth;
            }
        }
        else {
            this.data.productionOrderId = null;
            this.data.colorCode = null;
            this.data.colorName = null;
            this.data.colorType = null;
            this.data.orderType = null;
            this.data.designNumber = null;
            this.data.designCode = null;
        }
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        }
        else
            return true;
    }

    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        if (this.selectedBuyer && this.selectedBuyer._id) {
            // console.log(this.selectedBuyer); //Buyer Changed
            this.data.buyerId = this.selectedBuyer._id;
        }
        else {
            this.data.buyerId = null;
        }
    }

    @bindable selectedMaterialConstructionFinish
    selectedMaterialConstructionFinishChanged(newValue, oldValue) {
        if (this.selectedMaterialConstructionFinish && this.selectedMaterialConstructionFinish._id) {
            // console.log(this.selectedMaterialConstructionFinish); //Material Changed
            this.data.materialConstructionFinishId = this.selectedMaterialConstructionFinish._id;
        }
        else {
            this.data.materialConstructionFinishId = null;
        }
    }

    productionOrderTextFormatter = (productionOrder) => {
        return `${productionOrder.orderNo}`
    }

    get productionOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.productionOrderFields };
            return this.service.searchProductionOrder(info)
                .then(result => {
                    return result.data;
                });
        }
    }

    get buyersLoader() {
        return BuyersLoader;
    }
    get materialConstructionFinishLoader() {
        return MaterialConstructionLoader;
    }

    // get weightTotal() {
    //     return this.data.items.map((item) => {
    //         return item.weight * item.quantity;
    //     })
    // }

    addItemCallback = (e) => {
        this.data.items = this.data.items || [];
        this.data.items.push({})
    };

    removeItemCallback(item, event) {
        this.data.items.splice(item.context.items.indexOf(item.data), 1);
    }

    console() {
        console.log(this.data);
    }

    widthChanged(e) {
        console.log(this.data.materialWidthFinish);
    }
} 