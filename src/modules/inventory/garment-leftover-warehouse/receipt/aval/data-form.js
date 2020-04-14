import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../../../loader/garment-units-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedUnitFrom;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "Nomor RO", value: "RONo" },
    ]

    avalTypes=["AVAL FABRIC", "AVAL ACCESSORIES"];

    get unitLoader() {
        return UnitLoader;
    }

    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true 
        }

        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Code: this.data.UnitFrom.Code,
                Name: this.data.UnitFrom.Name
            };
            var roList=[];
            for (const item of this.data.Items) {
                var detail={};
                if(roList.length==0){
                    detail.RONo=item.RONo;
                    detail.FabricItems=[];
                    detail.FabricItems.push({
                        Product:item.Product,
                        ProductRemark:item.ProductRemark,
                        Quantity:item.Quantity,
                        Uom:item.Uom,
                        GarmentAvalProductId:item.GarmentAvalProductId,
                        GarmentAvalProductItemId:item.GarmentAvalProductItemId,
                        IsSave:true
                    });
                    roList.push(detail);
                }
                else{
                    var dup=roList.find(a=>a.RONo==item.RONo);
                    if(!dup){
                        detail.RONo=item.RONo;
                        detail.FabricItems=[];
                        detail.FabricItems.push({
                            Product:item.Product,
                            ProductRemark:item.ProductRemark,
                            Quantity:item.Quantity,
                            Uom:item.Uom,
                            GarmentAvalProductId:item.GarmentAvalProductId,
                            GarmentAvalProductItemId:item.GarmentAvalProductItemId,
                            IsSave:true
                        });
                        roList.push(detail);
                    }
                    else{
                        var idx= roList.indexOf(dup);
                        dup.FabricItems.push({
                            Product:item.Product,
                            ProductRemark:item.ProductRemark,
                            Quantity:item.Quantity,
                            Uom:item.Uom,
                            GarmentAvalProductId:item.GarmentAvalProductId,
                            GarmentAvalProductItemId:item.GarmentAvalProductItemId,
                            IsSave:true
                        });
                        
                        roList[idx]=dup;
                        
                    }
                }
            }
            this.data.ROList=roList;
        }
    }

    selectedUnitFromChanged(newValue){
        if (this.data.Id) return;

        this.data.UnitFrom = newValue;

        this.data.ROList.splice(0);
    }

    get addItems() {
        return (event) => {
            this.data.ROList.push({
                UnitId: this.data.UnitFrom? this.data.UnitFrom.Id : 0,
                RONo:""
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.ROList){
            for(var item of this.data.ROList){
                for(var detail of item.FabricItems){
                    if(detail.IsSave)
                        qty += detail.Quantity;
                }
            }
        }
        return qty;
    }
}
