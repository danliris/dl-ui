import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,PurchasingService } from "./service";

const ContractLoader = require('../../../loader/garment-subcon-contract-loader');
const UENLoader = require('../../../loader/garment-unit-expenditure-note-loader');

@inject(Service,PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedUEN;
    @bindable itemOptions = {};
    @bindable selectedPO;
    @bindable selectedContract;
    @bindable selectedDLType;

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
    dlTypes=["PROSES","RE PROSES"];
    contractTypes=["SUBCON BAHAN BAKU","SUBCON CUTTING","SUBCON JASA"];

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Nama Barang",
            "Keterangan Barang",
            "Design/Color",
            "Jumlah",
            "Satuan",
            "Tipe Fabric",
            "Jumlah Keluar",
        ]
    }

    @computedFrom("data.ContractType")
    get contractFilter() {
        return {
            ContractType :this.data.ContractType
        } 
    }

    @computedFrom("data.DLType")
    get UENFilter() {
        var UENFilter={};
        if(this.data.DLType=="PROSES"){
            UENFilter={
                IsPreparing:false,
                ExpenditureType : "SUBCON"
            };
        }
        else{
            UENFilter={
                ExpenditureType : "SUBCON"
            };
        }
        
        return UENFilter;
    }
    
    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,

        }

        if (this.data.Id) {
            var uen= await this.purchasingService.getUENById(this.data.UENId);
            this.selectedUEN={
                UENNo:this.data.UENNo,
                Id : this.data.UENId,
                UnitDOId: uen.UnitDOId,
                Items:uen.Items
            };
            this.selectedPO={
                PO_SerialNumber: this.data.PONo,
                Id:this.data.EPOItemId
            }
        }
    }

    selectedDLTypeChanged(newValue){
        console.log(newValue)
        this.data.DLType=newValue;
        this.selectedUEN=null;
        this.data.UENId = newValue.Id;
        this.data.UENNo = newValue.UENNo;
        this.data.ContractQty=0;
        this.data.Items.splice(0);
    }

    contractView = (contract) => {
        return `${contract.ContractNo}`;
    }

    uenView = (uen) => {
        return `${uen.UENNo}`
    }

    get contractLoader() {
        return ContractLoader;
    }

    get uenLoader() {
        return UENLoader;
    }

    async selectedUENChanged(newValue, oldValue){
        if(newValue) {
            console.log(newValue)
            if(this.data.Items.length>0){
                this.data.Items.splice(0);
            }
            //this.context.error.Items = [];
            this.data.UENId = newValue.Id;
            this.data.UENNo = newValue.UENNo;
            this.purchasingService.getUnitDeliveryOrderById(newValue.UnitDOId)
            .then((deliveryOrder) => {
                this.service.searchComplete({filter: JSON.stringify({ ContractNo:this.data.ContractNo})})
                .then((contract)=>{
                    var usedQty= 0;
                    if(contract.data.length>0){
                        for(var subcon of contract.data){
                            if(subcon.Id!=this.data.Id){
                                for(var subconItem of subcon.Items){
                                    usedQty+=subconItem.Quantity;
                                }
                            }
                            else{
                                this.data.savedItems=subcon.Items;
                            }
                        }
                    }
                    this.data.QtyUsed=usedQty;
                    if(deliveryOrder){
                        for(var uenItem of newValue.Items){
                            var item={};
                            item.UENItemId=uenItem._id || uenItem.Id;
                            console.log(uenItem,this.data.savedItems)
                            if(this.data.savedItems){
                                var qty= this.data.savedItems.find(a=>a.UENItemId == uenItem.Id );
                                if(qty)
                                    item.Quantity=qty.Quantity;
                            }
                            //item.UENItemId=uenItem.Id;
                            item.Product={
                                Name: uenItem.ProductName,
                                Code: uenItem.ProductCode,
                                Id: uenItem.ProductId
                            };
                            item.Uom={
                                Id: uenItem.UomId,
                                Unit: uenItem.UomUnit
                            };
                            item.ProductRemark=uenItem.ProductRemark;
                            //item.Quantity=uenItem.Quantity;
                            var doItem= deliveryOrder.Items.find(a=>a._id == uenItem.UnitDOItemId );

                            if(doItem){
                                item.DesignColor = doItem.DesignColor;
                            }
                            item.FabricType= uenItem.FabricType;
                            item.ContractQuantity=uenItem.Quantity;
                            this.data.Items.push(item);
                        }
                            
                    }
                });
                
            });
            
        }
        else {
            this.context.selectedUENViewModel.editorValue = "";
            this.data.UENId = null;
            this.data.UENNo = "";
            this.data.Items.splice(0);
        }
        
    }

    selectedContractChanged(newValue){
        this.selectedUEN=null;
        this.data.UENId = newValue.Id;
        this.data.UENNo = newValue.UENNo;
        this.data.ContractQty=0;
        this.data.Items.splice(0);
        if(newValue){
            this.data.ContractNo=newValue.ContractNo;
            this.data.SubconContractId=newValue.Id;
            this.data.ContractQty=newValue.Quantity;
        }
        else{
            this.data.ContractNo="";
            this.data.SubconContractId = null;
            this.selectedUEN=null;
            this.data.UENId = null;
            this.data.UENNo = "";
            this.data.ContractQty=0;
            this.data.Items.splice(0);
        }
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                qty += item.Quantity;
                
            }
            this.data.TotalQty=qty;
        }
        return qty;
    }

    get poLoader() {
        return (keyword) => {
            var infoEPO = {
                keyword: keyword,
                filter: JSON.stringify({ ProductName:"PROCESS"})
            };
            return this.purchasingService.getGarmentEPO(infoEPO)
            .then((epo)=>{
                console.log(epo)
                return epo.data;
            });
                    
        }
    }
    
    POView=(po) => {
        return `${po.PO_SerialNumber}`;
    }

    selectedPOChanged(newValue){
        if(newValue){
            this.data.PONo=newValue.PO_SerialNumber;
            this.data.EPOItemId=newValue.Id;
        }
    }
}