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
    }

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];

        this.isEmpty = true;
        this.totalCredit = 0;
        this.totalDebit = 0;

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


    async search() {
        
        let arg = {
            month : this.info.month.value,
            year : this.info.year
        }

        this.data = await this.service.search(arg)
            .then((result) => {
                if (result.data.length == 0)
                    this.isEmpty = true;
                else
                    this.isEmpty = false;

                var newData = [];
                for (var item of result.data) {
                    var newVM = {
                        Date: item.Date ? moment(item.Date).format('DD MMM YYYY') : "-",
                        COAName: item.COAName ? item.COAName : "-",
                        COACode: item.COACode ? item.COACode : "-",
                        Remark: item.Remark ? item.Remark : "-",
                        Debit: item.Debit ? numeral(item.Debit).format('0,0.0000') : '0',
                        Credit: item.Credit ? numeral(item.Credit).format('0,0.0000') : '0'
                    }
                    newData.push(newVM);
                }

                this.totalCredit = numeral(result.info.TotalCredit).format('0,0.0000');
                this.totalDebit = numeral(result.info.TotalDebit).format('0,0.0000');

                return newData;
            });
        //console.log(this.data);

    }

    excel() {

        // this.flag = true;
        // this.tableList.refresh();

        let params = {
            supplierName: this.info.supplierName,
            month: this.info.month.value,
            year: this.info.year,
        }

        this.service.getXls(params)

        // this.getExcelData();
    }

    reset() {
        this.error = {};
        this.info.year = moment().format("YYYY");
        this.info.month = { text: 'January', value: 1 };

        this.isEmpty = true;
        // this.flag = false;
        this.totalCredit = 0;
        this.totalDebit = 0;
        this.data = [];
        // this.tableList.refresh();
    }
}
export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
