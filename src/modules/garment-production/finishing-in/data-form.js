import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service,)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedSewingOut;
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service) {
        this.service = service;
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
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.FinishingInType="SEWING";
        this.itemOptions = {
            isEdit: this.isEdit,
            checkedAll: true
        }
        // if(this.data.SewingOutId){
        //     this.selectedSewingOut= await this.service.getSewingOutbyId(this.data.SewingOutId);
        // }

        if (this.data && this.data.Items) {
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

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id})
            };
            return this.service.searchSewingOut(info)
                .then((result) => {
                    console.log(result)
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= result.data.find(d=>d.RONo==a.RONo);
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

    get sewingOutLoader() {
        return SewingOutLoader;
    }

    @computedFrom("data.Unit")
    get filter(){
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id
            };
        } else {
            return {
                UnitId: 0
            };
        }
    }

    selectedUnitChanged(newValue){
        this.selectedSewingOut=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.UnitFrom=null;
        this.data.SewingOutId=null;
        this.data.SewingOutNo=null;
        this.data.Items = [];
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.selectedSewingOut=null;
            this.selectedSewingOut=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.UnitFrom=null;
            this.data.SewingOutId=null;
            this.data.SewingOutNo=null;
            this.data.Items = [];
        }
    }

    async selectedSewingOutChanged(newValue, oldValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.UnitFrom=null;
        this.data.SewingOutId=null;
        this.data.SewingOutNo=null;
        this.data.Items = [];
        if(newValue) {
            console.log(newValue)
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            this.data.UnitFrom=newValue.Unit;
            this.data.SewingOutId=newValue.Id;
            this.data.SewingOutNo=newValue.SewingOutNo;
            var items=[];
            Promise.resolve(this.service.searchSewingOut({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id }) }))
                    .then(result => {
                        console.log(result)
                        for(var sewingOut of result.data){
                            for(var sewingOutItem of sewingOut.Items){
                                var item={};
                                if(sewingOutItem.RemainingQuantity>0){
                                    if(sewingOut.IsDifferentSize){
                                        for(var sewingOutDetail of sewingOutItem.Details){
                                            item.SewingOutItemId=sewingOutItem.Id;
                                            item.SewingOutDetailId=sewingOutDetail.Id;
                                            item.Quantity=sewingOutDetail.Quantity;
                                            item.Product=sewingOutItem.Product;
                                            item.Uom=sewingOutItem.Uom;
                                            item.Size=sewingOutDetail.Size;
                                            item.Color=sewingOutItem.Color;
                                            item.DesignColor=sewingOutItem.DesignColor;
                                            item.RemainingQuantity=sewingOutDetail.Quantity;
                                            this.data.Items.push(item);
                                        }
                                    }
                                    else{
                                        item.SewingOutItemId=sewingOutItem.Id;
                                        item.Quantity=sewingOutItem.Quantity;
                                        item.Product=sewingOutItem.Product;
                                        item.Uom=sewingOutItem.Uom;
                                        item.Size=sewingOutItem.Size;
                                        item.Color=sewingOutItem.Color;
                                        item.DesignColor=sewingOutItem.DesignColor;
                                        item.RemainingQuantity=sewingOutItem.Quantity;
                                        this.data.Items.push(item);
                                    }
                                
                                }
                            }
                        
                    }
                    console.log(this.data.Items);
                });
            }
        
        
        else {
            this.context.selectedSewingOutViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.UnitFrom=null;
            this.data.SewingOutId=null;
            this.data.SewingOutNo=null;
            this.data.Items = [];
        }
    }
    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Size",
            "Jumlah",
            "Satuan",
            "Warna",
        ]
    }

    ROView=(ro) => {
        return `${ro.RONo}`;
    }
}