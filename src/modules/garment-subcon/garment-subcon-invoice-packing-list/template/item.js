import { inject, bindable, computedFrom } from "aurelia-framework";
import { concat, forEach } from "../../../../routes/general";
import { Service } from "../service";

var DLLoader = require('../../../../loader/garment-subcon-delivery-letter-out-loader');


@inject(Service)
export class Item {
    @bindable selectedDL;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.options = context.context.options;

        this.isShowing = true;

        this.TotalPrice = this.data.TotalPrice;
        this.selectedDL = this.data.DLNo;
        this.datas = context.context.options.datas;
        if(this.options.isCreate){
            this.data.CIF = this.datas.CIF;
            this.filter = {
                ContractNo:this.datas.ContractNo
            }
        }else if(this.options.isEdit){
            this.filter ={
            ContractNo:this.options.selectedContract
            }
            // this.data.CIF = this.datas.Items.CIF; 
        } 

        // console.log("fillheader",context.context.options);

    }

    get dlLoader() {
        return DLLoader;
    }

    dlView = (dl) => {
        return `${dl.DLNo}`;
    }

    get Uomm(){
        return (this.UOM).toUpperCase();
    }
    set Uomm(value){
        this.data.UOM=value.toUpperCase();
    }

    // get uomLoader(){
    //     console.log("UOM",this.UOM);
    //     return this.UOM;
        
    // }

    // uomView = (uom) => {
    //     console.log("UOM",uom)
    //     return `${uom.Unit}`;
    // }


    selectedDLChanged(newValue){
        if (newValue) {
            this.DL = newValue;
            this.data.DLNo=newValue.DLNo;
            this.data.DLDate =newValue.DLDate;
            
            var UOM = [];
            for(var item of this.DL.Items)
            {
                this.data.Product = item.Product;

                this.data.DesignColor = item.DesignColor;
                this.data.Quantity = item.Quantity;
                this.data.TotalPrice = this.datas.CIF*item.Quantity;

                
                UOM.push(item.Uom);
                // this.TotalHarga = item.Quantity
            }
            this.UOM = UOM;

   
            
        }
    }

    CIFChanged(newValue)
    {
        if (newValue) {
            this.data.TotalPrice = newValue*this.data.Quantity;
        
        }
    }

    // itemsColumnsCreate = ["Keterangan", "Jumlah", "Jumlah Keluar", ""];

    // itemsColumns = ["Keterangan", "Jumlah Keluar", ""];

    toggle() {
        if (!this.isShowing) this.isShowing = true;
        else this.isShowing = !this.isShowing;
    }


}
