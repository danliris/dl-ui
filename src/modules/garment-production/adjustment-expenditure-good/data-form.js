import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,PurchasingService } from "./service";
import { Item } from "../../accounting/journal-transaction/templates/item";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service,purchasingService) {
        this.service = service;
        this.purchasingService= purchasingService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 6
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit: this.isEdit,
            checkedAll: true,
            readOnly:this.readOnly
        }
      
        if (this.data.Id ) {
            this.selectedRO= this.data.RONo;
            this.data.Items.forEach(
                item => {
               
                    item.IsSave = true; 
                     
                }
            );
            
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    ROView=(ro) => {
        return `${ro.RONo}`;
    }

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword
              //filter: JSON.stringify({UnitId: this.data.Unit.Id,"Items.Any(Quantity>0)":true})
            };
            return this.service.searchFinishedGoodStock(info)
                .then((result) => {
                    var roList=[];
                   
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= roList.find(d=>d.RONo==a.RONo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                        }
                        return roList;
                });
        }
    }
    

    get unitLoader() {
        return UnitLoader;
    }


    selectedUnitChanged(newValue){
        this.selectedRO=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.Price=0;
        this.data.Items.splice(0);
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.selectedRO=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.Price=0;
            this.data.Items.splice(0);
        }
    }

    async selectedROChanged(newValue, oldValue){
       
        if(newValue){
            if(this.context.isCreate) {
             
                if(this.data.Items.length>0){
                    this.data.Items.splice(0);
                }
                this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity = {
                 Name:   newValue.ComodityName,
                 Id: newValue.ComodityId,
                 Code : newValue.ComodityCode
                }
                let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
                let buyerResult = await this.purchasingService.getBuyerCode({ size: 1, filter: JSON.stringify({ RONo:  newValue.RONo  }) });
                this.data.BuyerCode = buyerResult.data[0].Buyer.Name;

                if(priceResult.data.length>0){
                    this.data.Price= priceResult.data[0].Price;
                }
                else{
                    this.data.Price=0;
                }
                
                Promise.resolve(this.service.searchFinishedGoodStockComplete({ filter: JSON.stringify({ RONo: newValue.RONo, UnitCode: this.data.Unit.Code }) }))
                    .then(result => { 
                        for(var finishingIn of result.data){
                                let item={};
                                    item.Quantity=finishingIn.Quantity;
                                    item.Uom= {
                                        Id :finishingIn.UomId,
                                        Code : finishingIn.UomCode,
                                        Unit : finishingIn.UomUnit
                                    }
                                    item.Size= {
                                        Id :finishingIn.SizeId,
                                        Code : finishingIn.SizeCode,
                                        Size : finishingIn.SizeName
                                    }
                                    item.Description ="";
                                    item.RONo= this.data.RONo;
                                    item.BasicPrice=finishingIn.BasicPrice;
                                    item.ComodityPrice=this.data.Price;
                                    item.FinishedGoodStockId=finishingIn.Id;
                                    item.AdjustmentType='BARANG JADI';
                                    item.RemainingQuantity= finishingIn.Quantity;
                                    this.data.Items.push(item);
                        }
                    });
                
            }
            {
                console.log(newValue);
                let buyerResult = await this.purchasingService.getBuyerCode({ size: 1, filter: JSON.stringify({ RONo:  newValue  }) });
                this.data.BuyerCode = buyerResult.data[0].Buyer.Name;
              
                for(var qty of this.data.Items)
                {  
                    let remaingQtyResult = await this.service.searchRemaining(qty.FinishedGoodStockId);  
                    qty.Description= qty.Color;
                 
                    qty.RemainingQuantity= qty.Quantity + remaingQtyResult.Quantity;
                }
            }
           
           
        }  else {
                this.context.selectedROViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Items.splice(0);
            }
        
        

    }

    itemsInfo = {
        columns: [
           
            "Size",
            "Jumlah Tersedia",
            "Jumlah Keluar",
            "Satuan",
            "Keterangan",
        ]
    }

    itemsInfoView = {
        columns: [
           
            "Size",
            "Jumlah Keluar",
            "Satuan",
            "Keterangan",
        ]
    }


    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave)
                    qty += item.Quantity;
            }
        }
        return qty;
    }
}