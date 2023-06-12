import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var UnitReceiptNoteLoader = require('../../../loader/garment-unit-receipt-note-loader');
var moment = require('moment');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable unitReceiptNote;
    @bindable unit;
    @bindable storage;
    @bindable correctionType;
    @bindable collectionOptions;

    filter={
        IsStorage:true,
        URNType: "PEMBELIAN"
    };

    constructor(service) {
        this.service = service;

        this.formOptions = {
            cancelText: "Kembali"
        };

        this.typeData = ["Jumlah", "Konversi"];

        this.controlOptions = {
            label: {
                length: 4
            },
            control: {
                length: 5
            }
        };
        
        
        this.itemHeader = {
            columns: [
                "Barang",
                "Keterangan Barang",
                "Jumlah Bon",
                "Satuan",
                "Jumlah Sisa",
                "Satuan",
                "Jumlah Koreksi (+/-)",
                "Satuan",
                "Konversi",
                "Jumlah Kecil",
                "Satuan Kecil",
                "Design Color"
            ]
        };

        this.itemHeaderQty = {
            columns: [
                "Barang",
                "Keterangan Barang",
                "Jumlah Bon",
                "Satuan",
                "Jumlah Sisa",
                "Satuan",
                "Jumlah Koreksi (+/-)",
                "Satuan",
                "Konversi",
                "Jumlah Kecil",
                "Satuan Kecil",
                "Design Color",
                "Warna"
            ]
        };

        this.itemHeaderConv = {
            columns: [
                "Barang",
                "Keterangan Barang",
                "Jumlah Bon",
                "Satuan",
                "Jumlah Sisa",
                "Satuan",
                "Konversi",
                "Jumlah Kecil",
                "Satuan Kecil",
                "Design Color",
                "Warna"
            ]
        };
        
        this.itemsTemp = [];

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.collectionOptions = {
            readOnly:this.readOnly
        };
        if(this.data.CorrectionType=="Jumlah"){
            this.collectionOptions.Qty=true;
            this.collectionOptions.Conv=false;
            this.itemHeader=this.itemHeaderQty;
        }
        else{
            this.collectionOptions.Qty=false;
            this.collectionOptions.Conv=true;
            this.itemHeader=this.itemHeaderConv;
        }
        // if (!this.readOnly) {
        //     this.itemHeader.columns.push({ header: "" });
        // }
        
        // if (this.data && this.data.Items) {
        //     this.collectionOptions.checkedAll = this.data.Items.reduce((acc, curr) => acc && curr.IsSave, true);
        // }
    }

    
    async unitReceiptNoteChanged(newValue, oldValue) {
        var selectedURN = newValue;
        if (selectedURN) {
            var urn = await this.service.getURNByIdforCorrection(selectedURN.Id);
            console.log("urn",urn);
            this.data.URNId = selectedURN.Id;
            this.data.URNNo = selectedURN.URNNo;
            this.data.Unit=selectedURN.Unit;
            this.data.Storage=selectedURN.Storage;

            this.data.Items=[];
            for(var i of urn.Items ){
                var item={};
                item.Product=i.Product;
                // item.Product.Id=i.ProductId;
                // item.Product.Code=i.ProductCode;
                // item.Product.Name=i.ProductName;

                item.ProductCode=i.Product.Code;
                item.ProductId=i.Product.Id;
                item.ProductName=i.Product.Name;
                item.ProductRemark=i.Product.Remark.trim();
                item.URNItemId = i.Id;
                item.RONo = i.RONo;
                item.OrderQuantity=i.OrderQuantity;
                item.Quantity=i.ReceiptCorrection;
                item.SmallQuantity=i.SmallQuantity;
                item.UomId=i.Uom.Id;
                item.UomUnit=i.Uom.Unit;
                item.Conversion=i.CorrectionConversion;
                item.DODetailId=i.DODetailId;
                item.EPOItemId=i.EPOItemId;
                item.POItemId=i.POItemId;
                item.PRItemId=i.PRItemId;
                item.POSerialNumber=i.POSerialNumber;
                item.SmallUomId=i.SmallUom.Id;
                item.SmallUomUnit=i.SmallUom.Unit;
                item.PricePerDealUnit=i.PricePerDealUnit;
                item.DesignColor=i.DesignColor;
                item.leftOverQty=i.ReceiptCorrection-(i.OrderQuantity/i.CorrectionConversion);
                item.OriginConversion=i.CorrectionConversion;
                item.IsSave=false;
                item.QuantityCheck=item.leftOverQty;
                item.CorrectionConversion=i.CorrectionConversion;
                item.DOItemsId = i.DOItemsId;
                item.Colour = i.Colour;
                this.data.Items.push(item);
            }

        }
        else{
            this.data.Unit=null;
            this.data.Storage=null;
            this.data.Items=[];
        }
    }

    correctionTypeChanged(newValue, oldValue) {
        this.data.CorrectionType = newValue;

        if (this.data.CorrectionType === "Jumlah") {
            this.collectionOptions.Qty = true;
            this.collectionOptions.Conv = false;
            this.collectionOptions.checkedAll=false;
            this.itemHeader=this.itemHeaderQty;
            for(var a of this.data.Items){
                a.isDO=false;
                a.IsSave=false;
            }
        }
        else{
            this.collectionOptions.Qty = false;
            this.collectionOptions.Conv = true;
            this.itemHeader=this.itemHeaderConv;
            this.collectionOptions.checkedAll=false;
            for(var a of this.data.Items){
                a.CorrectionConversion=a.Conversion;
                a.IsSave=false;
                if(a.OrderQuantity>0){
                    a.isDO=true;
                }
            }
        }

    }

    @computedFrom("data.URNId")
    get hasItems() {
        return this.data.Items ? this.data.Items.length > 0 : false;
    }

    get unitReceiptNoteLoader() {
        return UnitReceiptNoteLoader;
    }

    urnView= (urn) => {
        return urn.URNNo;
    }
}
