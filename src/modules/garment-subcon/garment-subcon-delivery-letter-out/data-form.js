import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service,PurchasingService,CoreService } from "./service";

const ContractLoader = require('../../../loader/garment-subcon-contract-loader');
const UENLoader = require('../../../loader/garment-unit-expenditure-note-loader');

@inject(Service,PurchasingService,CoreService)
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
    @bindable selectedContractType;
    @bindable selectedServiceType;

    constructor(service,purchasingService,coreService) {
        this.service = service;
        this.purchasingService=purchasingService;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };
    dlTypes=["PROSES","RE PROSES"];
    contractTypes=["SUBCON BAHAN BAKU","SUBCON CUTTING","SUBCON JASA"];
    serviceTypes=["SUBCON JASA KOMPONEN", "SUBCON JASA GARMENT WASH", "SUBCON JASA SHRINKAGE PANEL","SUBCON JASA FABRIC WASH"];
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
            "Satuan Keluar",
        ],
        columnsCutting:[
            "RO",
            "No Cutting Out Subcon",
            "Plan PO",
            "Jumlah",
        ],
        columnsServiceCutting:[
            "No Subcon Jasa Komponen",
            "Tgl Subcon",
            "Asal Unit",
            "Jenis Subcon",
            "Jumlah",
        ],
        columnsServiceSewing:[
            "No Subcon Jasa Garment Wash",
            "Tgl Subcon",
            //"Asal Unit",
            "Jumlah",
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
            isSubconCutting:this.data.ServiceType=="SUBCON JASA KOMPONEN"?true : false,
            serviceType:this.data.ServiceType
        }

        if (this.data.Id) {
            if(this.data.ContractType=="SUBCON BAHAN BAKU"){
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
    }

    selectedDLTypeChanged(newValue){
        this.data.DLType=newValue;
        this.selectedUEN=null;
        this.data.UENId = 0;
        this.data.UENNo = "";
        this.selectedContract=null;
        this.data.ContractNo="";
        this.data.SubconContractId=0;

        this.itemOptions.DLType = this.data.DLType;
        this.data.ContractQty=0;
        this.data.UsedQty=0;
        this.data.QtyUsed=0;
        this.data.Items.splice(0);
        this.context.selectedContractViewModel.editorValue="";
    }

    selectedContractTypeChanged(newValue){
        this.data.ContractType=newValue;
        this.selectedUEN=null;
        this.data.UENId = 0;
        this.data.UENNo = "";
        this.selectedContract=null;
        this.data.ContractNo="";
        this.data.SubconContractId=0;
        this.data.ContractQty=0;
        this.data.UsedQty=0;
        this.data.QtyUsed=0;
        this.data.Items.splice(0);
        this.context.selectedContractViewModel.editorValue="";
        this.data.ServiceType="";
        this.selectedServiceType=null;
    }

    selectedServiceTypeChanged(newValue){
        this.data.ServiceType=newValue;
        this.selectedUEN=null;
        this.data.UENId = 0;
        this.data.UENNo = "";
        this.data.ContractNo="";
        this.data.SubconContractId=0;
        this.data.ContractQty=0;
        this.data.UsedQty=0;
        this.data.QtyUsed=0;
        this.data.Items.splice(0);
        this.context.selectedContractViewModel.editorValue="";
        this.itemOptions.isSubconCutting=this.data.ServiceType=="SUBCON JASA KOMPONEN"?true : false;
        this.itemOptions.serviceType=this.data.ServiceType;
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
                            if(this.data.savedItems){
                                var qty= this.data.savedItems.find(a=>a.UENItemId == uenItem.Id );
                                if(this.isEdit) {
                                    item.Id = qty.Id;
                                }
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
                            this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: "PCS" }) })
                            .then((uomResult)=>{
                                item.UomOut={
                                    Id: uomResult.data[0].Id,
                                    Unit: uomResult.data[0].Unit
                                };
                            });
                            
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

    async selectedContractChanged(newValue){
        this.selectedUEN=null;
        this.data.UENId = 0;
        this.data.UENNo = "";
        this.data.ContractQty=0;
        if(this.data.ContractType!='SUBCON CUTTING')
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
            this.context.selectedContractViewModel.editorValue="";
            if(this.data.ContractType!='SUBCON CUTTING')
                this.data.Items.splice(0);
        }
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            if(this.data.Items.length>0){
                for(var item of this.data.Items){
                    qty += item.Quantity;
                }

            }
            this.data.TotalQty=qty ? qty:0;
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

    get addItems() {
        return (event) => {
            this.data.Items.push({DLType:this.data.DLType});
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }
}