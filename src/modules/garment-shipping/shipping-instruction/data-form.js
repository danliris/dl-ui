import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service,CoreService } from "./service";

var EMKLLoader= require('../../../loader/garment-emkl-loader');
var InvoiceLoader= require('../../../loader/garment-shipping-invoice-loader');

@inject(Service,CoreService)
export class DataForm {

    constructor(service,coreService) {
        this.service = service;
        this.coreService=coreService;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedEMKL;
    @bindable selectedInvoice;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    filter= {
        IsUsed:false
    }
    get emklLoader(){
        return EMKLLoader;
    }

    emklView = (data) => {
        return `${data.Name || data.name}`;
    }

    get invoiceLoader(){
        return InvoiceLoader;
    }

    invoiceView = (data) => {
        return `${data.invoiceNo}`;
    }

    ShipOptions=["BY SEA", "BY AIR", "BY SEA - AIR"];
    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if(this.data.id){
            this.selectedEMKL={
                Id: this.data.emkl.id,
                Code: this.data.emkl.code,
                Name:this.data.emkl.name,
                Attention:this.data.attn,
                FaxNumber:this.data.fax
            };
            this.selectedInvoice={
                invoiceNo: this.data.invoiceNo
            }
        }
        
    }

    selectedEMKLChanged(newValue){
        this.data.emkl=null;
        this.data.attn="";
        this.data.fax="";
        if(newValue){
            this.data.emkl={
                id: newValue.Id,
                code:newValue.Code,
                name:newValue.Name
            };
            this.data.attn=newValue.Attention;
            this.data.fax=newValue.FaxNumber;
        }
    }
    
    selectedInvoiceChanged(newValue){
        if(this.data.id) return;
        if(newValue){
            this.data.invoiceNo=newValue.invoiceNo;
            this.data.invoiceId=newValue.id;
            this.data.bankAccountId= newValue.bankAccountId;
            this.data.bankAccountName=newValue.bankAccount;
            this.data.buyerAgent=newValue.buyerAgent;
            this.data.shippingStaffName=newValue.shippingStaff;
            this.data.shippingStaffId=newValue.shippingStaffId;
            this.service.searchPackingList({filter : JSON.stringify({ InvoiceNo: this.data.invoiceNo })})
            .then(result=>{
                var pl= result.data[0];
                this.data.truckingDate=pl.truckingDate;
                this.coreService.getBuyerById(this.data.buyerAgent.id)
                .then(buyer=>{
                    var city= buyer.City==null ? "": "\n" + buyer.City ;
                    var country=buyer.Country==null? "" : "\n" + buyer.Country;
                    this.data.buyerAgentAddress= buyer.Address + city + country;
                
                });
            });
        }
    }
}
