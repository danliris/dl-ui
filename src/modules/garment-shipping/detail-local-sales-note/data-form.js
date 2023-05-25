import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, CoreService } from "./service";

const TransactionTypeLoader = require('../../../loader/garment-transaction-type-loader');
const BuyerLoader = require('../../../loader/garment-leftover-warehouse-buyer-loader');
const SalesContractLoader=require('../../../loader/garment-shipping-local-sales-contract-loader');
const SalesNoteLoader=require('../../../loader/garment-shipping-local-sales-note-loader');

@inject(Service, CoreService)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedTransactionType;
    @bindable selectedSalesNote;

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
  
    items = {
        columns: [
            "Unit - Nama Unit",
            "Quantity",
            "Satuan",
            "Amount",           
        ],
        onAdd: function () {
            this.data.items.push({});
        }.bind(this)
        // options: {
        //     transactionTypeId: 0
        // }
    };

    filter={
        IsCL:true,
        IsDetail:false
    };

    get salesNoteLoader() {
        return SalesNoteLoader;
    }

    get transactionTypeLoader() {
        return TransactionTypeLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    transactionTypeView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    async bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if(this.data.id){       
            this.selectedSalesContract={
                salesContractNo:this.data.salesContractNo,
                id:this.data.localSalesContractId
            }     
            this.selectedSalesNote={
                noteNo:this.data.noteNo,
                id:this.data.id
            }                 
        }                    
    }

    selectedTransactionTypeChanged(newValue, oldValue) {
        if (newValue) {
            this.data.transactionType = newValue;
            this.items.options.transactionTypeId = newValue.Id;

            if (oldValue && newValue.Id != oldValue.Id) {
                this.data.items.splice(0);
            }
        } else {
            this.data.transactionType = null;
            this.data.items.splice(0);
        }
    }

    async selectedSalesNoteChanged(newValue, oldValue){
        if(!this.data.id)
           // this.data.items.splice(0);
              
        if (newValue) {                                     
                this.data.localSalesNoteId=newValue.id;
                this.data.noteNo=newValue.noteNo;                
                this.data.date=newValue.date;
                this.data.localSalesContractId=newValue.localSalesContractId;
                this.data.salesContractNo = newValue.salesContractNo;
                this.data.transactionType=newValue.transactionType;
                this.data.buyer=newValue.buyer;              
                console.log(newValue); 
                var TotalAmount = 0;

                    for(var a of newValue.items){
                         TotalAmount = TotalAmount + (a.quantity * a.price);
                    }

               
               this.data.amount = TotalAmount;
               //console.log(this.data.amount); 
        }
        else {
            this.data.transactionType = null;
            this.data.items.splice(0);
            this.data.buyer=null;     
            this.data.vat=null;  
            this.data.salesContractNo="";
            this.data.localSalesContractId=0;
        }
    }

    get subtotal() {               
        this.data.subTotal = (this.data.items || []).reduce((acc, cum) => acc + cum.amount, 0);
        
        return this.data.subTotal;
    }

    @computedFrom('data.subTotal')
    get total() {
        var total=0;
        if(this.data.subTotal){
                total=this.data.subTotal;
           }
        return total;
    }
}
