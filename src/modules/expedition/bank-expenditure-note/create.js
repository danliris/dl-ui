import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../components/dialog/dialog';
import { Router } from 'aurelia-router';
import { AzureService } from './service';
import { activationStrategy } from 'aurelia-router';

import SupplierLoader from '../../../loader/supplier-loader';
import BankLoader from '../../../loader/account-banks-loader';

import Service from './service';

@inject(Router, Service, Dialog)
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

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.data = {};

        this.collection = {
            columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Category', 'Divisi', 'PPN', 'PPh', 'Total Harga ((DPP + PPN) - PPh)', 'Mata Uang', ''],
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
        this.data.Details = this.UPOResults.filter((detail) => detail.Select);
        var dataPrep = this.data;
        this.dialog.prompt("Apakah anda yakin akan menyimpan data?", "Simpan Data")
            .then(response => {
                if (response == "ok") {
                    this.service.create(this.data)
                        .then(result => {
                            alert('Data berhasil dibuat');
                            this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                        })
                        .catch(e => {
                            this.error = e;
                        });
                }
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
            if (this.selectedBank && this.selectedBank.Currency.Code) {
                let arg = {
                    page: 1,
                    size: Number.MAX_SAFE_INTEGER,
                    filter: JSON.stringify({ "Position": 7, "SupplierCode": newVal.code, "Currency": this.selectedBank.Currency.Code, "IsPaid": false }) //CASHIER DIVISION
                };

                this.UPOResults = await this.service.searchAllByPosition(arg)
                    .then((result) => {
                        let resultData = result.data && result.data.length > 0 ? result.data.filter((datum) => datum.PaymentMethod && datum.PaymentMethod.toLowerCase() != "cash") : [];

                        return resultData;
                    });
            }
        } else {
            // if (this.selectedBank && this.selectedBank.Currency.Code) {
            //     let arg = {
            //         page: 1,
            //         size: Number.MAX_SAFE_INTEGER,
            //         filter: JSON.stringify({ "Position": 7, "Currency": this.selectedBank.Currency.Code, "IsPaid": false }) //CASHIER DIVISION
            //     };

            //     this.UPOResults = await this.service.searchAllByPosition(arg)
            //         .then((result) => {
            //             let resultData = result.data && result.data.length > 0 ? result.data.filter((datum) => datum.PaymentMethod && datum.PaymentMethod.toLowerCase() != "cash") : [];

            //             return resultData;
            //         });
            // }

            this.UPOResults = [];
        }
    }

    @computedFrom("selectedBank && selectedSupplier")
    get isExistBankAndSupplier() {
        if (this.selectedBank && this.selectedSupplier)
            return true;
        else
            return false;
    }

    @bindable selectedBank;
    // isExistBankAndSupplier = false;
    UPOResults = [];
    currency = "";
    async selectedBankChanged(newVal) {
        this.data.Bank = newVal;
        if (newVal) {

            let arg = {
                page: 1,
                size: Number.MAX_SAFE_INTEGER,
                filter: this.selectedSupplier && this.selectedSupplier.code ? JSON.stringify({ "Position": 7, "SupplierCode": this.selectedSupplier.code, "Currency": newVal.Currency.Code, "IsPaid": false }) : JSON.stringify({ "Position": 7, "Currency": newVal.Currency.Code, "IsPaid": false }) //CASHIER DIVISION
            };

            if (this.selectedSupplier)
                this.UPOResults = await this.service.searchAllByPosition(arg)
                    .then((result) => {
                        let resultData = result.data && result.data.length > 0 ? result.data.filter((datum) => datum.PaymentMethod && datum.PaymentMethod.toLowerCase() != "cash") : [];

                        return resultData;
                    });

            // this.isExistBankAndSupplier = true;
            this.currency = newVal.Currency.Code;
        } else {
            this.currency = "";
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
        // console.log(result);
        this.data.GrandTotal = result;
        return result;
    }

    bankView(bank) {
        return bank.AccountName ? `${bank.AccountName} - A/C : ${bank.AccountNumber}` : '';
    }
}
