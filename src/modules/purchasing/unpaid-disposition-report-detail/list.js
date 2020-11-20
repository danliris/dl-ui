import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

var CategoryLoader = require('../../../loader/category-loader');
var DivisionLoader = require('../../../loader/division-loader');
var UnitLoader = require('../../../loader/unit-loader');
var AccountingCategoryLoader = require('../../../loader/accounting-category-loader');
var AccountingUnitLoader = require('../../../loader/accounting-unit-loader');
var UnitReceiptNoteLoader = require('../../../loader/unit-receipt-note-basic-loader');

@inject(Router, Service)
export class List {
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    tableOptions = {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
    }

    columns = [{
            field: 'DispositionDate',
            title: 'Tgl Disposisi',
            formatter: function(value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: 'DispositionNo', title: 'No Disposisi' },
        { field: 'URNNo', title: 'No SPB' },
        { field: 'UPONo', title: 'No BP' },
        { field: 'InvoiceNo', title: 'No Invoice' },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'CategoryName', title: 'Kategori' },
        { field: 'AccountingUnitName', title: 'Unit' },
        {
            field: 'PaymentDueDate',
            title: 'Jatuh Tempo',
            formatter: function(value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: 'CurrencyCode', title: 'Currency' },
        {
            field: 'Total',
            title: 'Saldo',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: "right"
        }
    ];

    columnsUnitValas = [
        { header: 'Unit', value: 'Unit' },
        { header: 'Currency', value: 'CurrencyCode' },
        { header: 'Total (IDR)', value: 'Total' }
    ];

    columnsUnit = [
        { header: 'Unit', value: 'Unit' },
        { header: 'Total (IDR)', value: 'Total' }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    titles = [
        "Lokal",
        "Lokal Valas",
        "Import"
    ];

    activeTitle = "Lokal";
    isValas = false;
    isImport = false;
    unitSummary = [];

    bind() {}

    changeTable(title) {
        console.log(title);
        this.isSearch = false;
        if (title !== this.activeTitle) {
            this.activeTitle = title;
            this.unitSummary = [];

            switch (title) {
                case "Lokal":
                    this.isValas = false;
                    this.isImport = false;
                    break;
                case "Lokal Valas":
                    this.isValas = true;
                    this.isImport = false;
                    break;
                case "Import":
                    this.isValas = false;
                    this.isImport = true;
                    break;
                default:
                    isValas = false;
                    isImport = false;
                    break;
            }

            this.tableList.refresh();
        }
    }

    search() {
        this.isSearch = true;
        this.tableList.refresh();
    }

    reset() {
        console.log("reset");
        this.division = null;
        this.accountingCategory = null;
        this.accountingUnit = null;
        this.dateTo = null;
        this.isSearch = false;
        this.unitSummary = {};
        this.tableList.refresh();
    }

    getExcel() {
        let arg = {
            categoryId: this.category ? this.category.Id : 0,
            accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
            divisionId: this.division ? this.division.Id : 0,
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            isValas: this.isValas,
            isImport: this.isImport
        };

        return this.service.generateExcel(arg)
            .catch(e => {
                alert(e.replace(e, "Error: ", ""))
            });
    }

    getPdf() {
        let arg = {
            categoryId: this.category ? this.category.Id : 0,
            accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
            divisionId: this.division ? this.division.Id : 0,
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            isValas: this.isValas,
            isImport: this.isImport
        };

        return this.service.generatePdf(arg)
            .catch(e => {
                alert(e.replace(e, "Error: ", ""))
            });
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    categoryLoaderView = (CategoryLoader) => {
        return `${CategoryLoader.Code} - ${CategoryLoader.Name}`
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    // get unitLoader() {
    //     return UnitLoader;
    // }

    // get accountingCategoryLoader() {
    //     return AccountingCategoryLoader;
    // }
    // accountingCategoryView = (AccountingCategoryLoader) => {
    //     return `${AccountingCategoryLoader.Code} - ${AccountingCategoryLoader.Name}`
    // }

    get accountingUnitLoader() {
        return AccountingUnitLoader;
    }
    accountingUnittView = (accountingUnit) => {
        return `${accountingUnit.Code} - ${accountingUnit.Name}`
    }

    loader = (info) => {
        let order = {};

        let arg = {
            categoryId: this.category ? this.category.Id : 0,
            accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
            divisionId: this.division ? this.division.Id : 0,
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            isValas: this.isValas,
            isImport: this.isImport
        };

        this.unitSummary = this.unitSummary.splice(0, this.unitSummary.length);

        if (this.isSearch)
            return this.service.search(arg)
                .then(result => {
                    if (result && result.UnitSummaries.length > 0)
                        this.unitSummary = result.UnitSummaries.map(
                            (item) => ({
                                Unit: item.Unit,
                                CurrencyCode: item.CurrencyCode,
                                Total: numeral(item.SubTotal).format("0,000.00"),
                            })
                        );
                    return {
                        total: result.Reports.length,
                        data: result.Reports
                    }
                });
        else
            return {
                total: 0,
                data: []
            }
    }
}