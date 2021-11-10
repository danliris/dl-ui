import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const ContractLoader = require('../../../loader/garment-subcon-contract-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCustomsType;
    @bindable selectedSubconType;
    @bindable itemOptions = {};
    @bindable selectedContract;

    customsOutTypeOptions = ['2.6.1','2.7.Out'];
    subconTypeOptions = ['SUBCON BAHAN BAKU','SUBCON CUTTING', 'SUBCON JASA'];

    @computedFrom("data.SubconType")
    get contractFilter() {
        return {
            ContractType :this.data.SubconType,
            IsUsed:true
        } 
    }

    contractView = (contract) => {
        console.log(contract)
        return `${contract.ContractNo}`;
    }

    get contractLoader() {
        return ContractLoader;
    }

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
            "No SJ Keluar",
            "Jumlah"
        ],
        
    }
   
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
       
    }

    selectedSubconTypeChanged(newValue){
        if(!this.data.Id){
            this.data.SubconContractId=null;
            this.data.SubconContractNo=null;
            this.data.Supplier=null;
            if(this.data.Items){
                this.data.Items.splice(0);
            }
            this.context.selectedContractViewModel.editorValue="";
        }
        
        this.data.SubconType=newValue;
    }

    selectedContractChanged(newValue){
        this.data.SubconContractId=null;
        this.data.SubconContractNo=null;
        this.data.Supplier=null;
        if(this.data.Items){
            this.data.Items.splice(0);
        }
        if(newValue){
            this.data.SubconContractId=newValue.Id;
            this.data.SubconContractNo=newValue.ContractNo;
            this.data.Supplier=newValue.Supplier;
            Promise.resolve(this.service.searchDeliveryLetterOut({ filter: JSON.stringify({ ContractNo: this.data.SubconContractNo, IsUsed:false}) }))
                    .then(result => {
                        for(var dl of result.data){
                            var item={};
                            item.SubconDLOutNo=dl.DLNo;
                            item.SubconDLOutId=dl.Id;
                            item.Quantity=0;
                            for(var a of dl.Items){
                                item.Quantity+=a.Quantity;
                            }
                            this.data.Items.push(item);
                        }
                        
                    });
        }
        else{
            this.data.SubconContractId=null;
            this.data.SubconContractNo=null;
            this.data.Supplier=null;
            if(this.data.Items){
                this.data.Items.splice(0);
            }
            this.context.selectedContractViewModel.editorValue="";
        }
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave){
                    qty += item.Quantity;
                }
            }
        }
        return qty;
    }
}