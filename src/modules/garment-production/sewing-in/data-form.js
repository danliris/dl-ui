import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const ComodityLoader = require('../../../loader/garment-comodities-loader');
const LoadingLoader = require('../../../loader/garment-loading-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedLoading;
    @bindable itemOptions = {};

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
            "Warna",
        ]
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.data.Items.reduce((acc, curr) => acc && cur.IsSave, false)
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }

        if(this.context.isView){
            this.service.getLoadingById(this.data.LoadingId)
            .then((loadingNo) => {
                this.selectedLoading = loadingNo;
            });
        }
    }

    LoadingView=(loading)=>{
        var colorList=[];
        var sizeList=[];
        for(var a of loading.Items){
            if(colorList.length==0){
                colorList.push(a.Color);
            }
            else{
                var dup=colorList.find(d=> d==a.Color);
                if(!dup){
                    colorList.push(a.Color);
                }
            }
            if(sizeList.length==0){
                sizeList.push(a.Size.Size);
            }
            else{
                var duplicate=sizeList.find(d=> d==a.Size.Size);
                if(!duplicate){
                    sizeList.push(a.Size.Size);
                }
            }
        }
        return `${loading.LoadingNo} - ${loading.RONo} - ${colorList.join(", ")} - ${sizeList.join(", ")}`
    }

    async selectedLoadingChanged(newValue){
        if(this.context.isCreate){
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.UnitFrom = null;
            if(newValue) {
                if(this.data.Items.length > 0){
                    this.data.Items.splice(0);
                }
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                this.data.Comodity= newValue.Comodity;
                this.data.UnitFrom = newValue.Unit;
                this.data.LoadingId = newValue.Id;
                this.data.LoadingNo = newValue.LoadingNo;
                for(var item of newValue.Items){
                    var a = {};
                    a.Product = item.Product;
                    a.LoadingItemId = item.Id;
                    a.DesignColor = item.DesignColor;
                    a.Size = item.Size;
                    a.Quantity = item.RemainingQuantity;
                    a.Uom = item.Uom;
                    a.Color = item.Color;
                    a.RemainingQuantity = item.RemainingQuantity;
                    this.data.Items.push(a);
                }
            }
            else {
                this.context.selectedLoadingViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.UnitFrom = null;
                this.data.Items.splice(0);
            }        
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get loadingLoader() {
        return LoadingLoader;
    }
}