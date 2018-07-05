import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AzureService } from './service';
import { activationStrategy } from 'aurelia-router';

import SupplierLoader from '../../../loader/supplier-loader';
import BankLoader from '../../../loader/banks-loader';

import Service from './service';

@inject(Router, Service)
export class Create {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    formOptions = {
        cancelText: 'Kembali',
        saveText: 'Simpan',
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};

        this.collection = {
            columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Divisi', 'PPN', 'Total Harga (DPP + PPN)', 'Mata Uang', ''],
        };
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    onCheckAll(event) {
        for (var item of this.UPOResults) {
            item.Select = event.detail.target.checked;
        }
    }

    saveCallback(event) {
        this.data.Details = this.UPOResults.filter((detail) => detail.Select)
        this.service.create(this.data)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get bankLoader() {
        return BankLoader;
    }

    @bindable selectedSupplier;   
    async selectedSupplierChanged(newVal, oldVal) {
        this.data.Supplier = newVal;
        if (newVal) {
            if (this.selectedBank && this.selectedBank.currency.code) {
                let arg = {
                    page: 1,
                    size: Number.MAX_SAFE_INTEGER,
                    filter: JSON.stringify({ "Position": 7, "SupplierCode": newVal.code, "Currency": this.selectedBank.currency.code, "IsPaid": false }) //CASHIER DIVISION
                };
    
                this.UPOResults = await this.service.searchAllByPosition(arg)
                    .then((result) => {
                        return result.data;
                    });    
            }
        } else {
            if (this.selectedBank && this.selectedBank.currency.code) {
                let arg = {
                    page: 1,
                    size: Number.MAX_SAFE_INTEGER,
                    filter: JSON.stringify({ "Position": 7, "Currency": this.selectedBank.currency.code, "IsPaid": false }) //CASHIER DIVISION
                };
    
                this.UPOResults = await this.service.searchAllByPosition(arg)
                    .then((result) => {
                        return result.data;
                    });    
            }
        }
    }

    @bindable selectedBank;
    isExistBank = false;
    UPOResults = [];
    async selectedBankChanged(newVal) {
        this.data.Bank = newVal;
        if (newVal) {

            let arg = {
                page: 1,
                size: Number.MAX_SAFE_INTEGER,
                filter: this.selectedSupplier && this.selectedSupplier.code ? JSON.stringify({ "Position": 7, "SupplierCode": this.selectedSupplier.code, "Currency": newVal.currency.code, "IsPaid": false }) : JSON.stringify({ "Position": 7, "Currency": newVal.currency.code, "IsPaid": false }) //CASHIER DIVISION
            };

            this.UPOResults = await this.service.searchAllByPosition(arg)
                .then((result) => {
                    return result.data;
                });

            this.isExistBank = true;
        } else {
            this.UPOResults = [];
        }
    }

    get grandTotal() {
        let result = 0;
        if (this.UPOResults && this.UPOResults.length > 0) {
            for (let detail of this.UPOResults) {
                if (detail.Select)
                    result += detail.TotalPaid;
            }
        }
        this.data.GrandTotal = result;
        return result;
    }

    bankView(bank) {
        return bank.accountName ? `${bank.accountName} - ${bank.bankName} - ${bank.accountNumber} - ${bank.currency.code}` : '';
    }
}
