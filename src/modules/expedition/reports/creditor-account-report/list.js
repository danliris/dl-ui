import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class List {
    itemYears = [];
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
        sortable: false
    };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];
        this.isEmpty = true;
        this.currency = 'IDR';
        this.mutation = 0;
        this.closingBalance = 0;
        this.itemMonths = [
            { text: 'January', value: 1 },
            { text: 'February', value: 2 },
            { text: 'March', value: 3 },
            { text: 'April', value: 4 },
            { text: 'May', value: 5 },
            { text: 'June', value: 6 },
            { text: 'July', value: 7 },
            { text: 'August', value: 8 },
            { text: 'September', value: 9 },
            { text: 'October', value: 10 },
            { text: 'November', value: 11 },
            { text: 'Desember', value: 12 }
        ];
        this.currentYear = moment().format('YYYY');
        
        for (var i = parseInt(this.currentYear); i >= 2018; i--) {
            this.itemYears.push(i.toString());
        }
    }

    supplierView = (supplier) => {
        return supplier.name;
    }

    async search() {
        if (this.info.supplier && this.info.supplier._id)
            this.info.supplierId = this.info.supplier._id;

        let validationError = false;

        if (this.info && (!this.info.supplier || this.info.supplier._id == null)) {
            this.error.supplier = "Supplier harus diisi";
            validationError = true;
        }
        debugger
        if (!validationError) {
            this.error = {};
            // this.flag = true;
            // this.tableList.refresh();

            let params = {
                supplierId: this.info.supplierId,
                month: this.info.month.value,
                year: this.info.year,
            }

            this.data = await this.service.search(params)
                .then((result) => {
                    let resultDataSet = [];

                    // let sameDate = true;
                    let dailyTotalDebit = 0;
                    let dailyTotalKredit = 0;
                    let previousDate = '';
                    if (result.data && result.data.length > 0) {
                        previousDate = moment(result.data[0].Date).format("DD-MMM-YYYY");
                        this.currency = result.data[0].AccountBankCurrencyCode;
                        this.initialBalance = numeral(result.data[0].BeforeNominal).format('0,0.0000');
                        this.closingBalance = numeral(result.data[result.data.length - 1].AfterNominal).format('0,0.0000');
                    }
                    let index = 0;
                    for (let data of result.data) {
                        let date = moment(data.Date).format("DD-MMM-YYYY");

                        if (moment(previousDate).diff(moment(date), 'days') != 0 || index == result.data.length) {
                            let dailyTotalDataSet = {
                                DailyTotalTitle: "Total Harian",
                                AccountBankCurrencyCode: data.AccountBankCurrencyCode,
                                Debit: numeral(dailyTotalDebit).format('0,0.0000'),
                                Kredit: numeral(dailyTotalKredit).format('0,0.0000'),
                                AfterNominal: ""
                            }

                            resultDataSet.push(dailyTotalDataSet);
                            dailyTotalDebit = 0;
                            dailyTotalKredit = 0;
                        }

                        if (data.Status.toString().toLowerCase() == "in") {
                            dailyTotalDebit += data.Nominal;
                        } else {
                            dailyTotalKredit += data.Nominal;
                        }

                        let dataSet = {
                            Date: date,
                            Remark: data.Remark,
                            ReferenceNo: data.ReferenceNo,
                            ReferenceType: data.ReferenceType,
                            AccountBankCurrencyCode: data.AccountBankCurrencyCode,
                            Debit: data.Status.toString().toLowerCase() == "in" ? numeral(data.Nominal).format('0,0.0000') : '',
                            Kredit: data.Status.toString().toLowerCase() == "out" ? numeral(data.Nominal).format('0,0.0000') : '',
                            AfterNominal: numeral(data.AfterNominal).format('0,0.0000')
                        }

                        previousDate = date;

                        resultDataSet.push(dataSet);

                        index++;
                        if (!resultDataSet[resultDataSet.length - 1].DailyTotalTitle && index == result.data.length) {
                            let dailyTotalDataSet = {
                                DailyTotalTitle: "Total Harian",
                                AccountBankCurrencyCode: data.AccountBankCurrencyCode,
                                Debit: numeral(dailyTotalDebit).format('0,0.0000'),
                                Kredit: numeral(dailyTotalKredit).format('0,0.0000'),
                                AfterNominal: ""
                            }

                            resultDataSet.push(dailyTotalDataSet);
                            dailyTotalDebit = 0;
                            dailyTotalKredit = 0;
                        }

                    }

                    this.isEmpty = false;
                    return resultDataSet;
                })
        }
    }

    excel() {
        if (this.info.supplier && this.info.supplier._id)
            this.info.supplierId = this.info.supplier._id;

        let validationError = false;

        if (this.info && (!this.info.supplier || this.info.supplier._id == null)) {
            this.error.supplier = "Supplier harus diisi";
            validationError = true;
        }

        if (!validationError) {
            this.error = {};
            // this.flag = true;
            // this.tableList.refresh();

            let params = {
                supplierId: this.info.supplierId,
                month: this.info.month.value,
                year: this.info.year,
            }

            this.service.getXls(params)
        }
        // this.getExcelData();
    }

    reset() {
        this.error = {};
        this.isEmpty = true;
        // this.flag = false;
        this.info.supplier = undefined;
        this.info.supplierId = "";
        this.currency = 'IDR';
        this.closingBalance = 0;
        this.mutation = 0;
        this.data = [];
        // this.tableList.refresh();
        this.info.year = moment().format("YYYY");
        this.info.month = { text: 'January', value: 1 };
    }

    get supplierLoader() {
        return SupplierLoader;
    }
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
