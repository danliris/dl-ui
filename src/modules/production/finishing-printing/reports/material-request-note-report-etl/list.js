import { inject,bindable } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

const UnitLoader = require('../../../../../loader/unit-loader');

@inject(Service)

export class List {
    @bindable unitFilter = { "DivisionName": "DYEING & PRINTING" };
    constructor(service) {
        this.service = service;
        this.flag = false;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        { field: "index", title: "No",sortable:false },
        { field: "unit", title: "Unit",sortable:false },
        {
            field: "date", title: "Tanggal",sortable:false, formatter: function (value, data, index) {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "productName", title: "Nama Barang",sortable:false },
        { field: "material", title: "Material",sortable:false },
        { field: "threadNumber", title: "No Benang",sortable:false },
        { field: "grade", title: "Grade",sortable:false },
        { field: "spbLength", title: "Panjang SPB",sortable:false },
        { field: "information", title: "Keterangan",sortable:false },
        { field: "analyst", title: "Analisa",sortable:false },
        { field: "orderLength", title: "Panjang Order",sortable:false },
    ];

    search() {
        this.flag = true;
        this.mrnTable.refresh();
    }

    reset() {
        this.unit = undefined;
        this.dateFrom = undefined;
        this.dateTo = undefined;

        this.flag = false;
        this.mrnTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            unit: this.unit ? this.unit.Id : 0,
            startdate: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : undefined,
            finishdate: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : undefined
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        var index=1;
                        for(var a of result.data){
                            a.index=index;
                            index++;
                        }
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    get unitLoader() {
        return UnitLoader;
    }

    ExportToExcel() {
        var args = {
            unit: this.unit ? this.unit.Id : 0,
            startdate: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : undefined,
            finishdate: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : undefined
          };
        this.service.generateExcel(args);
    }
}
