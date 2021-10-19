import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

var BuyerLoader = require('../../../loader/garment-buyers-loader');
const SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};

    ContractTypeOptions = ["SUBCON BAHAN BAKU", "SUBCON CUTTING", "SUBCON JASA"];

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
    
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName = buyer.Name || buyer.name;
        var buyerCode = buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name=supplier.name || supplier.Name;
        return `${code} - ${name}`;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get JobType(){
        return (this.data.JobType || "").toUpperCase();
    }
    set JobType(value){
        this.data.JobType=value.toUpperCase();
    }

    get BPJNo(){
        return (this.data.BPJNo || "").toUpperCase();
    }
    set BPJNo(value){
        this.data.BPJNo=value.toUpperCase();
    }
    
    get FinishedGoodType(){
        return (this.data.FinishedGoodType || "").toUpperCase();
    }
    set FinishedGoodType(value){
        this.data.FinishedGoodType=value.toUpperCase();
    }
    
    get AgreementNo(){
        return (this.data.AgreementNo || "").toUpperCase();
    }
    set AgreementNo(value){
        this.data.AgreementNo=value.toUpperCase();
    }
    
    // get ContractNo(){
    //     return (this.data.ContractNo || "").toUpperCase();
    // }
    set ContractNo(value){
        this.data.ContractNo=value.toUpperCase();
    }
    
}