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

        // console.log(this.data)
        this.error = context.error;

        //console.log(this.data);
        this.options = context.context.options;
        //console.log(this.options);
        this.isShowing = true;

        this.TotalPrice = this.data.TotalPrice;
        this.selectedDL = this.data.DLNo;
        this.datas = context.context.options.datas;
        this.data.TotalNW = this.data.TotalNW;
        this.data.TotalGW = this.data.TotalGW;
        // console.log(this.data.TotalNW);
        // console.log(this.data.TotalGW);

        //console.log(this.datas);
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
        //this.data.NettWeight = this.datas.NettWeight;
        //console.log(this.data.NettWeight);

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
            //this.data.NettWeight = this.datas.NettWeight;
            //console.log(newValue);
            
            var UOM = [];
            this.quantity = 0;
            for(var item of this.DL.Items)
            {
                this.data.Product = item.Product;

                this.data.DesignColor = item.DesignColor;

                if(this.DL.SubconCategory == "SUBCON BB SHRINKAGE/PANEL"){
                  this.quantity += item.SmallQuantity; 

                  this.data.TotalNW += this.datas.NW*item.SmallQuantity;
                  this.data.TotalGW += this.datas.GW*item.SmallQuantity;
                }else{
                  this.quantity += item.Quantity; 

                  this.data.TotalNW += this.datas.NW*item.Quantity;
                  this.data.TotalGW += this.datas.GW*item.Quantity;
                }

                this.data.TotalPrice = this.datas.CIF*item.Quantity;

                // this.data.TotalNW += this.datas.NW*item.Quantity;
                // this.data.TotalGW += this.datas.GW*item.Quantity;
 
                UOM.push(item.Uom);
            }
            this.UOM = UOM;
            this.data.Quantity = this.quantity;

        }
    }

    CIFChanged(newValue)
    {
        if (newValue) {
            this.data.TotalPrice = newValue*this.data.Quantity;
        
        }
    }


    get totalNettWeight() {
        if (this.context.data.length > 0) {
          var total = this.context.data
            .map((items) => {
              if (items.data.item instanceof Array) {
                var qty = items.data.item
                  .map((item) => {
                    if(item.isSave==true)
                     return (item.Quantity) * (item.TotalNW);
                    else return 0
                  });
                  console.log(item.Quantity);
                return qty
                  .reduce((prev, curr, index) => { 
                    // console.log(prev)
                    return prev +  curr }, 0);
              }
              else {
                return 0
              }
            });
          return total
            .reduce((prev, curr, index) => { return prev +  (curr) }, 0);
        }
        else {
          return 0
        }
      }
      

    // itemsColumnsCreate = ["Keterangan", "Jumlah", "Jumlah Keluar", ""];

    // itemsColumns = ["Keterangan", "Jumlah Keluar", ""];

    toggle() {
        if (!this.isShowing) this.isShowing = true;
        else this.isShowing = !this.isShowing;
    }


}
