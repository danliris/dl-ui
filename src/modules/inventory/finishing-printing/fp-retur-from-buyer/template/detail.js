import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from '../service';
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');


@inject(Service, BindingEngine, BindingSignaler)
export class Detail {
    @bindable productionOrder;
    selectedProductionOrder;
    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.filterBuyer = context.context.options;
        this.productionOrder =  this.data.selectedProductionOrder;
        if(this.data && this.data.productionOrderId && !this.data.isAdd){
            this.productionOrder = {_id : this.data.productionOrderId, orderNo : this.data.productionOrderNo}
        }
    }

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    itemColumns = [ 
        { header : "Barang", value : "productName" },
        { header : "Design", value : "designNumber" }, 
        { header : "CW", value : "colorWay" }, 
        { header : "Keterangan", value : "remark" }, 
        { header : "Jumlah Retur", value : "returQuantity" }, 
        { header : "Satuan", value : "uom" }, 
        { header : "Panjang (Meter)", value : "length" }, 
        { header : "Total Panjang", value : "totLength" }, 
        { header : "Berat (Kg)", value : "weight" }, 
        { header : "Total Berat", value : "totWeight"} ]

    newProductColumns = [ 
        { header : "Barang", value : "productName" }, 
        { header : "Design", value : "designNumber" }, 
        { header : "CW", value : "colorWay" }, 
        { header : "Konstruksi Finish", value : "construction" }, 
        { header : "Lot", value : "lot" }, 
        { header : "Grade", value : "grade" }, 
        { header : "Keterangan Produk", value : "description" }, 
        { header : "Keterangan", value : "remark" }, 
        { header : "Jumlah Retur", value : "returQuantity" }, 
        { header : "Satuan", value : "uom" }, 
        { header : "Panjang (Meter)", value : "length" }, 
        { header : "Total Panjang", value : "totLength" }, 
        { header : "Berat (Kg)", value : "weight" }, 
        { header : "Total Berat", value : "totWeight"} ]

    async productionOrderChanged(newValue, oldValue){
        var dataSelected = newValue;
        if(!this.options.readOnly){
            if(dataSelected && dataSelected._id){
                this.data.selectedProductionOrder = dataSelected;
                this.data.productionOrderId = dataSelected._id;
                this.data.productionOrderNo = dataSelected.orderNo;
                var items = await this.service.getProductShipment(this.data.productionOrderNo, (this.filterBuyer && this.filterBuyer.buyer ? this.filterBuyer.buyer : ''));
                var products = [];
                if(items.length > 0){
                    for(var a of items){
                        var product = {
                            productCode : a._id.productCode,
                            productName : a._id.productName,
                            productId : a._id.productId,
                            designCode : a._id.designCode,
                            designNumber : a._id.designNumber,
                            colorWay : a._id.colorWay,
                            remark : "",
                            returQuantity : 0,
                            uom : a._id.uom,
                            uomId : a._id.uomId,
                            length : 0,
                            weight : 0
                        }
                        products.push(product);
                    }
                }else{
                    alert("Tidak ada data pengiriman");
                }
                this.data.items = products;
            }else{
                this.data.items = [];
                this.data.productionOrderId = "";
                this.data.productionOrderNo = "";
                this.designCode = "";
                this.designNumber = "";
                this.colorWay = "";
            }
            if(this.data && this.data.newProducts && this.data.newProducts.length > 0){
                for(var a = this.data.newProducts.length; a >= 0; a--){
                    this.data.newProducts.splice((a-1), 1);
                }
            }
        }
    }

    get hasProductionOrder(){
        return this.data && this.data.productionOrderId && this.data.productionOrderId !== "";
    }

    get hasNewProduct(){
        return this.data && this.data.productionOrderId && this.data.productionOrderId !== "" && this.data.isAdd;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get addNewProducts(){
        return (event) => {
            if(this.data && this.data.items && this.data.items.length > 0){
                console.log(this.productionOrder);
                this.data.newProducts.push({
                        designCode :this.productionOrder && this.productionOrder.designCode ? this.productionOrder.designCode : "", 
                        designNumber : this.productionOrder && this.productionOrder.designNumber ? this.productionOrder.designNumber : "",
                        colorWay : this.productionOrder && this.productionOrder.details ? this.productionOrder.details[0].colorTemplate : "",
                        construction : {},
                        uom : {}
                    });
            }else{
                alert("Tidak ada data pengiriman");
            }
        };
    }

    // packingLoaderView = (packing) => {
    //     if(packing.code!="" && packing.productionOrderNo!="")
    //     return `${packing.code} - ${packing.productionOrderNo}`;
    //     //return packing.productionOrderNo
    // }

    controlOptions = {
        control: {
        length: 12
        }
    };
}