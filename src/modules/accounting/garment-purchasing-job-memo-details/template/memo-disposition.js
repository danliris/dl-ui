import { inject, bindable } from 'aurelia-framework'
import { Service } from '../service';

var GarmentDebtLoader = require('../../../../loader/garment-debt-loader');
var GarmentDebtLoaderBillsNo = require('../../../../loader/garment-debt-loader-bills-no');
var GarmentDebtLoaderPaymentBills = require('../../../../loader/garment-debt-loader-payment-bills');

@inject(Service)
export class MemoDetailPurchasedItem {
    @bindable dataDebt;

    get garmenDebtLoader() {
        return GarmentDebtLoader;
    }

    get garmentDebtLoaderBillsNo() {
        return GarmentDebtLoaderBillsNo;
    }

    get garmentDebtLoaderPaymentBills() {
        return GarmentDebtLoaderPaymentBills;
    }

    constructor() { }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (!this.data.MemoDetailGarmentPurchasingDetail) {
            this.data.MemoDetailGarmentPurchasingDetail = {};
        }
        if (this.data.MemoDetailGarmentPurchasingDetail) {
            this.dataDebt = this.data.MemoDetailGarmentPurchasingDetail;
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get addItems() {
        return (event) => {
            this.data.MemoDetailGarmentPurchasingDetail.push({});
        };
    }

    itemsColumns = [
        { header: "No. Surat Jalan", value: "Product" },
        { header: "No. Nota Intern", value: "Quantity" },
        { header: "No. BP Besar", value: "AvailableQuantity" },
        { header: "No. BP Kecil", value: "Weight" },
        { header: "Kode Supplier", value: "WeightTotal" },
        { header: "Keterangan", value: "Length" },
        { header: "Mata Uang", value: "LengthTotal" },
        { header: "Rate Bayar", value: "Remark" },
        { header: "Rate Beli", value: "Notes" },
        { header: "Saldo Akhir", value: "Notes" },
        { header: "Jumlah", value: "Notes" },
        { header: "Jumlah dalam Rupiah", value: "Notes" }
    ]
}