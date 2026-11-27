import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const BUKLoader = require('../../../loader/garment-unit-expenditure-note-wip-loader');

@inject(Service,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedRO;
    @bindable selectedUnit;
    @bindable selectedUnitTo;
    @bindable itemOptions = {};
    @bindable selectedFinishingTo;
    @bindable selectedBUK;

    bukList = [];

    finishingToOptions = ['GUDANG JADI','SEWING'];

    constructor(service,purchasingService) {
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
            length: 5
        }
    };
    
    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Size",
            "Jumlah",
            "Satuan",
            "Warna"
        ],
        
    }
    
    columnsSameSize=[
        "Kode Barang",
        "Keterangan",
        "Size",
        "Jumlah",
        "Jumlah Keluar",
        "Satuan",
        "Warna"
    ]
    

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isEdit: this.context.isEdit,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true 
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }

        // susun ulang daftar BUK dari UENNo yang tersimpan (mode lihat / ubah)
        this.bukList = [];
        if (this.data && this.data.UENNo) {
            this.bukList = this.data.UENNo
                .split(',')
                .map(x => x.trim())
                .filter(x => x !== "")
                .map(x => ({ UENNo: x }));
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    ROView=(ro) => {
        return `${ro.RONo}`;
    }

    bukView = (buk) => {
        return `${buk.UENNo}`;
    }

    // daftar BUK yang boleh dipilih: belum dipakai, PROSES, GUDANG EMBALASE, dan RO sama
    get bukLoader() {
        return (keyword) => {
            if (!this.data || !this.data.RONo) {
                return Promise.resolve([]);
            }
            var filter = {
                IsUsedWIP: false,
                ExpenditureType: "PROSES",
                StorageName: "GUDANG EMBALASE",
                RONo: this.data.RONo
            };
            return BUKLoader(keyword, filter).then(result => {
                var chosen = this.bukList.map(b => b.UENNo);
                return (result || []).filter(b => !chosen.includes(b.UENNo));
            });
        };
    }

    selectedBUKChanged(newValue) {
        if (newValue && newValue.UENNo) {
            var exists = this.bukList.find(b => b.UENNo === newValue.UENNo);
            if (!exists) {
                this.bukList.push({ UENNo: newValue.UENNo });
                this.updateUENNo();
            }
            // kosongkan kotak pilihan supaya bisa pilih BUK berikutnya
            if (this.context && this.context.selectedBUKViewModel) {
                this.context.selectedBUKViewModel.editorValue = "";
            }
        }
    }

    removeBUK(buk) {
        var index = this.bukList.indexOf(buk);
        if (index > -1) {
            this.bukList.splice(index, 1);
            this.updateUENNo();
        }
    }

    updateUENNo() {
        this.data.UENNo = this.bukList.map(b => b.UENNo).join(", ");
    }

    get unitLoader() {
        return UnitLoader;
    }

    selectedFinishingToChanged(newValue){
        this.data.FinishingTo=newValue;
        if(newValue=="GUDANG JADI"){
            this.data.UnitTo=this.data.Unit;
            this.selectedUnitTo=this.data.UnitTo;
        }
        else{
            this.data.UnitTo=null;
            this.selectedUnitTo=this.data.UnitTo;
        }
    }

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
            if(this.selectedFinishingTo=="GUDANG JADI"){
                this.data.UnitTo=this.data.Unit;
                this.selectedUnitTo=this.data.UnitTo;
            }
        }
        else{
            this.context.selectedROViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Buyer =null;
            this.data.Items.splice(0);
        }
        this.context.selectedROViewModel.editorValue = "";
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Buyer =null;
        this.data.Items.splice(0);
        if (this.context && this.context.isCreate) {
            this.bukList.splice(0);
            this.updateUENNo();
        }
    }

    selectedUnitToChanged(newValue){
        if(newValue){
            this.data.UnitTo=newValue;
        }
        else{
            this.data.UnitTo= null;
        }
    }

    async selectedROChanged(newValue, oldValue){
        if(this.context.isCreate){
            this.bukList.splice(0);
            this.updateUENNo();
            if(newValue) {
                if(this.data.Items.length>0){
                    this.data.Items.splice(0);
                }
                this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity = {
                    Id:newValue.ComodityId,
                    Code:newValue.ComodityCode,
                    Name: newValue.ComodityName
                }
                let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
                
                if(priceResult.data.length>0){
                    this.data.Price= priceResult.data[0].Price;
                }
                else{
                    this.data.Price=0;
                }

                Promise.resolve(this.service.searchFinishingInComplete({size:1000,filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id ,"Items.Any(RemainingQuantity>0)":true}) }))
                    .then(result => {
                        for(var finishingIn of result.data){
                            this.data.FinishingInDate=!this.data.FinishingInDate ? finishingIn.FinishingInDate : finishingIn.FinishingInDate<this.data.FinishingInDate ? finishingIn.FinishingInDate : this.data.FinishingInDate;
                            for(var finishingInItem of finishingIn.Items){
                                var item={};
                                if(finishingInItem.RemainingQuantity>0){
                                    item.FinishingInDate=finishingIn.FinishingInDate;
                                    item.FinishingInItemId=finishingInItem.Id;
                                    item.FinishingInId=finishingIn.Id;
                                    item.Quantity=this.data.IsDifferentSize?finishingInItem.RemainingQuantity : 0;
                                    item.qty=finishingInItem.RemainingQuantity;
                                    item.Product=finishingInItem.Product;
                                    item.Uom=finishingInItem.Uom;
                                    item.Size=finishingInItem.Size;
                                    item.SizeName=finishingInItem.Size.Size;
                                    item.FinishingInQuantity=finishingInItem.RemainingQuantity;
                                    item.Color=finishingInItem.Color;
                                    item.DesignColor=finishingInItem.DesignColor;
                                    item.BasicPrice=finishingInItem.BasicPrice;
                                    item.ComodityPrice=this.data.Price;
                                    item.NoPackage= finishingInItem.NoPackage;
                                    item.LocationCode = finishingInItem.LocationCode;
                                    this.data.Items.push(item);
                                }
                            }
                        }
                        this.data.Items.sort((a, b)=>a.Color.localeCompare( b.Color) || a.SizeName.localeCompare( b.SizeName));
                    });
            }
            else {
                this.context.selectedROViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Buyer =null;
                this.data.Items.splice(0);
            }
            this.data.Items.splice(0);
        }
    }

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.Unit.Id,"Items.Any(RemainingQuantity>0)":true})
            };
            return this.service.searchFinishingInByRo(info)
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

    changeChecked(){
        if(this.data.Items){
            for(var a of this.data.Items){
                a.qty= a.FinishingInQuantity;
                a.Quantity=a.FinishingInQuantity;
                a.IsSave=false;
                if(!this.data.IsDifferentSize){
                    a.Quantity=0;
                }
            }
        }
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                item.IsSave=item.Quantity>0;
                if(item.IsSave){
                    if(this.data.IsDifferentSize){
                        if(item.Details){
                            for(var detail of item.Details){
                                qty += detail.Quantity;
                            }
                        }
                    }
                    else{
                        qty += item.Quantity;
                    }
                }
            }
        }
        return qty;
    }
}