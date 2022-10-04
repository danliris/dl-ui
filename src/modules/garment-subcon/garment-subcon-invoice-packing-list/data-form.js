import { bindable, inject, computedFrom, BindingEngine } from "aurelia-framework";
import { Service } from "./service";

var BuyerLoader = require('../../../loader/garment-buyers-loader');
const SupplierLoader = require('../../../loader/garment-supplier-loader');
const ContractLoader = require('../../../loader/garment-subcon-contract-loader');
const UomLoader = require("../../../loader/uom-loader");

@inject(Service,BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    @bindable selecteBCType;
    @bindable selectedContract;
    @bindable selectedSupplier;
    
 

    BCType = ["", "BC 2.6.2","BC 2.6.1"];
    constructor(service,bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;

    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    columns= [
        "No SJ",
        "Tanggal SJ",
        // "Kode Barang",
        // "Nama Barang",
        // "Keterangan Barang",
        // "Design Color",
        "Jumlah",
        // "Satuan",
        "Harga Satuan",
        "Harga Total",
    ];

    controlOptions = {
        label: {
            length: 5,
        },
        control: {
            length: 7,
        },
    };
    
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.itemOptions = {
            datas : this.data,
            selectedContract :this.data.ContractNo,
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,
          };

        if(this.isEdit){
            this.data.ContractNo = this.selectedContract;
        }

        console.log("edit",this.isEdit);
        console.log("editsss", this.data.ContractNo);
        // else{
        //     this.data.ContractNo = this.selectedContract;
        // }
        this.error = this.context.error;
        // this.itemOptions = {
            // this.isCreate= this.context.isCreate,
            // this.isView= this.context.isView,
            // this.checkedAll= this.context.isCreate == true ? false : true,
            // this.isEdit= this.isEdit,
            // filter: this.filter,
        //   };
        this.isItems=true;
        this.selecteBCType=this.data.BCType;
        this.selectedContract = this.data.ContractNo;
        this.selectedSupplier = this.data.Supplier;
    }

    // @computedFrom("data.ContractNo")
    // get filter() {
    //     var filter = {
    //         "ContractNo" : this.data.ContractNo ? this.data.ContractNo : "",
    //     }
     
    //     return filter;
        
    // }

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name=supplier.name || supplier.Name;
        return `${code} - ${name}`;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    Supplier = null;
    selectedSupplierChanged(newValue){
        var selectedSupplier = newValue;
        if (newValue) {
            this.Supplier = selectedSupplier;

            this.data.Supplier = this.Supplier;
            
            
        }
    }

    get contractLoader() {
        return ContractLoader;
    }

    contractView = (contract) => {
        return `${contract.ContractNo}`;
    }

    selecteBCTypeChanged(newValue){
        if(this.data.BCType!=newValue){
            this.data.BCType=newValue;

        }
    }

    selectedContractChanged(newValue){
        var selectedContract = newValue;
        if (newValue) {
            this.data.ContractNo = selectedContract.ContractNo;
            this.data.CIF = newValue.CIF;
            // console.log(this.data.CIF)
            // if(this.data.Items){
            //     this.data.Items.splice(0);
            // }
  
        }
    }

    get addItems() {
        return (event) => {
          this.data.Items.push({});
        };
      }
    
      get removeItems() {
        return (event) => {
          this.error = null;
        };
      }
    
}