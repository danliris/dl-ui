import {bindable, inject} from 'aurelia-framework'
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';

const PurchasingDispositionLoader = require('../../../../loader/purchase-dispositions-loader');

@inject(Service)
export class Item {
    @bindable selectedPurchaseDisposition;

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'UOM', 'Harga'];
        
    }
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.options = context.options;
        this.filter = {};
        this.error = context.error;
        if(this.data){
            this.selectedPurchaseDisposition = this.data.dispositionNo;
        }
    }


    get purchasingDispositionLoader() {
        return PurchasingDispositionLoader;
    }

    selectedPurchaseDispositionChanged(newValue){
        if(newValue===null){
            this.data.items=[];
            this.error = {};
        } else if(newValue){
            this.data.dispositionDate = newValue.CreatedUtc;
            this.data.currency = {};
            this.data.currency._id = newValue.Currency._id;
            this.data.currency.code = newValue.Currency.code;
            this.data.supplier = {};
            this.data.supplier.code = newValue.Supplier.code;
            this.data.supplier.name = newValue.Supplier.name;
            this.data.paymentDueDate = newValue.PaymentDueDate;
            this.data.incomeTaxVm = {};
            this.data.incomeTaxVm._id = newValue.Items[0].IncomeTax._id;
            this.data.incomeTaxVm.name = newValue.Items[0].IncomeTax.name;
            this.data.incomeTaxVm.rate = newValue.Items[0].IncomeTax.rate;
            this.data.incomeTax = newValue.Amount * this.data.incomeTaxVm.rate;
            this.data.totalAmount = newValue.Amount + this.data.vat;
            this.data.totalPaid = newValue.Amount;
            this.data.invoiceNo = newValue.InvoiceNo;
            this.data.dispositionId = newValue.Id;
            this.data.dispositionNo = newValue.DispositionNo;
            this.data.useIncomeTax = newValue.Items[0].UseIncomeTax;
            this.data.useVat = newValue.Items[0].UseVat;
            this.data.paymentMethod = newValue.PaymentMethod;
            if(this.data.useVat == true){
                this.data.vat = newValue.Amount * 0.1;
            }
            this.data.items= [];
            for (var items of newValue.Items){
                for (var details of items.Details){
                    var item = {
                        price : details.PaidPrice,
                        product : details.Product,
                        quantity : details.PaidQuantity,
                        unit : details.Unit,
                        uom : details.DealUom.unit,
                        purchasingDispositionDetailId : details.Id
                    };
                    this.data.items.push(item);
                }
            }
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    purchasingDispositionView = (purchasingDisposition) => {
        return purchasingDisposition.DispositionNo
    }

    onRemove() {
        this.bind();
    }

}