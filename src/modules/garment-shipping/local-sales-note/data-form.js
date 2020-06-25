import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const TransactionTypeLoader = require('../../../loader/garment-transaction-type-loader');
const BuyerLoader = require('../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

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
            "Kode - Nama Barang",
            "Quantity",
            "Satuan",
            "Harga",
            "Total"
        ],
        onAdd: function () {
            this.data.items.push({});
        }.bind(this),
        options: {
        }
    };

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

    buyerNPWPView = (data) => {
        return data.NPWP || data.npwp;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    get dueDate() {
        if (!this.data.date) {
            return null;
        }

        this.data.dueDate = new Date(this.data.date || new Date());
        this.data.dueDate.setDate(this.data.dueDate.getDate() + this.data.tempo);
        
        return this.data.dueDate;
    }

    get totalAmount() {
        this.data.totalAmount = (this.data.items || []).reduce((acc, cum) => acc + cum.amount, 0);
        
        return this.data.totalAmount;
    }
}
