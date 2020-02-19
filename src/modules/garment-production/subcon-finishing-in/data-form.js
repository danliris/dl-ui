import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var URNLoader = require('../../../loader/garment-unit-receipt-note-loader');

@inject(Service,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedDO;
    @bindable itemOptions = {};
    @bindable selectedUnit;
    @bindable supplier;

    constructor(service, purchasingService) {
        this.service = service;
        this.purchasingService=purchasingService;
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
        this.data.FinishingInType="PEMBELIAN";
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

    get supplierLoader() {
        return SupplierLoader;
    }

    get urnLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({SupplierId: this.data.Supplier.Id,'Items.Any(ProductCode.Contains("PRC001"))':true})
            };
            return this.purchasingService.getGarmentURN(info)
                .then((result) => {
                    var doList=[];
                        for(var a of result.data){
                            if(doList.length==0){
                                doList.push(a);
                            }
                            else{
                                var dup= doList.find(d=>d.DONo==a.DONo);
                                if(!dup){
                                    doList.push(a);
                                }
                            }
                            
                        }
                        return doList;
                    
                });
        }
    }

    urnView=(urn) => {
        return `${urn.DONo}`;
    }

    supplierView = (supplier) => {
        if(!supplier.code)
        return `${supplier.Code} - ${supplier.Name}`
        else
        return `${supplier.code} - ${supplier.name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get sewingOutLoader() {
        return SewingOutLoader;
    }

    @computedFrom("data.Supplier")
    get filter(){
        if (this.data.Supplier) {
            return {
                SupplierId: this.data.Supplier.Id
            };
        } else {
            return {
                SupplierId: 0
            };
        }
    }

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
        }
    }

    supplierChanged(newValue){
        if(newValue){
            this.data.Supplier=newValue;
        }
    }

    async selectedDOChanged(newValue, oldValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.UnitFrom=null;
        this.data.Items.splice(0);
        this.data.Price=0;
        if(newValue) {
            this.data.DOId=newValue.DOId;
            this.data.DONo=newValue.DONo;
            console.log(newValue)
            
            Promise.resolve(this.purchasingService.getGarmentDOById(newValue.DOId))
            .then(result => {
                console.log(result)
                var items=[];
                for(var item of result.items){
                    for(var detail of item.fulfillments){
                        var doItem={};
                        doItem.Product=detail.product;
                        items.push(doItem);
                    }
                }
                this.data.Items=items;
                console.log(this.data.Items)
            });
            
        }
        else {
            this.context.selectedURNViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.UnitFrom=null;
            this.data.SewingOutId=null;
            this.data.SewingOutNo=null;
            this.data.Items = [];
            this.data.Price=0;
        }
    }
    itemsInfo = {
        columns: [
            "Kode Barang",
            "Nama Barang",
            "RO",
            "Plan PO",
            "Jumlah",
            "Satuan",
        ]
    }

    ROView=(ro) => {
        return `${ro.RONo}`;
    }

    // get totalQuantity(){
    //     var qty=0;
    //     if(this.data.Items){
    //         for(var item of this.data.Items){
    //             qty += item.Quantity;
    //         }
    //     }
    //     return qty;
    // }
}