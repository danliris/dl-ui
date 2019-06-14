import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const BankLoader = require('../../../../loader/account-banks-loader');

@inject(Service)
export class List {

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    monthList = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    yearList = [];

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
        this.currency = '';
        this.initialBalance = '';
        this.closingBalance = '';

        let dateNow = new Date();
        this.monthNow = dateNow.getMonth();
        this.info.month = this.monthList[this.monthNow];

        this.yearNow = dateNow.getFullYear();
        this.info.year = this.yearNow;
        for (var i = this.yearNow - 3; i <= this.yearNow; i++) {
            this.yearList.push(i);
        }
    }

    bankView = (bank) => {
        return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
    }

    async search() {
        if (this.info.dateFrom == 'Invalid Date')
            this.info.dateFrom = undefined;
        if (this.info.dateTo == 'Invalid Date')
            this.info.dateTo = undefined;
        if (this.info.bank && this.info.bank.Id)
            this.info.bankId = this.info.bank.Id;

        let validationError = false;

        if (this.info && (!this.info.bank || this.info.bank.Id == null)) {
            this.error.bank = "Bank harus diisi";
            validationError = true;
        }

        if (!validationError) {
            this.error = {};
            // this.flag = true;
            // this.tableList.refresh();

            let params = {
                bankId: this.info.bankId,
                month: this.monthList.indexOf(this.info.month) + 1,
                year: this.info.year,
            }

            this.data = await this.service.search(params)
                .then((result) => {
                    let resultDataSet = [];

                    // let sameDate = true;
                    let dailyTotalDebit = 0;
                    let dailyTotalKredit = 0;
                    let previousDate = '';
                    this.initialBalance = "";
                    this.closingBalance = "";
                    this.currency = "";
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
        if (this.info.dateFrom == 'Invalid Date')
            this.info.dateFrom = undefined;
        if (this.info.dateTo == 'Invalid Date')
            this.info.dateTo = undefined;
        if (this.info.bank && this.info.bank.Id)
            this.info.bankId = this.info.bank.Id;

        let validationError = false;

        if (this.info && (!this.info.bank || this.info.bank.Id == null)) {
            this.error.bank = "Bank harus diisi";
            validationError = true;
        }

        if (!validationError) {
            this.error = {};
            // this.flag = true;
            // this.tableList.refresh();

            let params = {
                bankId: this.info.bankId,
                month: this.monthList.indexOf(this.info.month) + 1,
                year: this.info.year
            }

            this.service.getXls(params)
        }
        // this.getExcelData();
    }

    reset() {
        this.error = {};
        this.isEmpty = true;
        // this.flag = false;
        this.info.bank = undefined;
        this.info.bankId = "";
        this.info.month = this.monthList[this.monthNow];
        this.info.year = this.yearNow;
        this.currency = "";
        this.initialBalance = "";
        this.closingBalance = "";
        this.data = [];
        // this.tableList.refresh();
    }

    get bankLoader() {
        return BankLoader;
    }
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
