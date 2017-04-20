import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

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

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() !== '';
    }

    async bind(context) {
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        var productionOrderId = this.data.productionOrderId;
        // var productionOrderId = "58c8f8287b915900364dd2b0";
        if (productionOrderId) {
            this.selectedProductionOrder = await this.service.getProductionOrderById(productionOrderId, this.productionOrderFields);
        }
        console.log(this.selectedProductionOrder);
    }
    errorChanged() {
        console.log(this.error)
    }
    itemColumns = ["Lot", "Grade", "Weight", "Length", "Quantity", "Remark"];
    packingUomOptions = ["ROLL", "PCS"]
    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
            this.data.productionOrderId = this.selectedProductionOrder._id;
            var color = this.selectedProductionOrder.details && this.selectedProductionOrder.details.length > 0 ? this.selectedProductionOrder.details[0] : {};
            this.data.colorCode = color.code;
        }
        else {
            this.data.productionOrderId = null;
            this.data.colorCode = null;
        }
    }

    productionOrderTextFormatter = (productionOrder) => {
        return `${productionOrder.orderNo} / ${productionOrder.orderNo}`
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
    addItemCallback = (e) => {
        this.data.items = this.data.items || [];
        this.data.items.push({})
    };

    removeItemCallback(item, event) {
        item.context.items.splice(item.context.items.indexOf(item.data), 1);
    }

    console() {
        console.log(this.data);
    }
} 