import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "../service";

const InvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');

@inject(Service)
export class invoice {
    @bindable selectedInvoice;

    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.isFreightCharged=context.context.options.data.isFreightCharged;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
        if(this.data.invoiceNo){
            this.selectedInvoice={
                invoiceNo:this.data.invoiceNo,
                id:this.data.invoiceId
            }
        }
        this.filter={
            BuyerAgentCode: this.data.buyer.Code || this.data.buyer.code
        }
        if(this.data.id){
            var invoice = await this.service.getInvoiceById(this.data.invoiceId);
            this.data.items=invoice.items;
        }
    }
    
    
    get invoiceLoader() {
        return InvoiceLoader;
    }

    async selectedInvoiceChanged(newValue){
        if(newValue){
            this.data.invoiceNo=newValue.invoiceNo;
            this.data.invoiceId=newValue.id;
            this.data.amount=newValue.totalAmount;
            this.data.quantity=0;
            var invoice = await this.service.getInvoiceById(this.data.invoiceId);
            for(var item of invoice.items){
                this.data.quantity+=item.quantity;
            }
            this.data.items=invoice.items;
            this.data.totalCarton=0;
            var coverLetter=await this.service.getCoverLetterByInvoice({ filter: JSON.stringify({ InvoiceNo: this.data.invoiceNo})});
            console.log(coverLetter)
            if(coverLetter.data.length>0){
                for(var cv of coverLetter.data){
                    this.data.totalCarton+=cv.cartoonQuantity;
                }
            }
        }
    }
}