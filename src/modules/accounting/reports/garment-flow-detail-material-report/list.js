import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import { Service } from './service';
import { Router } from 'aurelia-router';

//const UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    @bindable KtgrItem;
    KategoriItem = ['','BAHAN BAKU','BAHAN PENDUKUNG', 'BAHAN EMBALACE'];

    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP"; 
            }
            else if (newvalue === "BAHAN EMBALACE") {
                this.category = "BE"; 
            }else if(newvalue === "PROSES"){

                this.category = "";
            }
        }
    }
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
 
    columns = [
        { field: "ProductCode", title: "Kode Barang" , sortable: false},
        { field: "ProductName", title: "Nama Barang" , sortable: false},
        
        { field: "POSerialNumber", title: "No PO", sortable: false },
        { field: "ProductRemark", title: "Keterangan Barang", sortable: false },
        { field: "RONo", title: "No. R/O", sortable: false },
        { field: "Article", title: "Artikel", sortable: false },
        { field: "BuyerCode", title: "Kode Buyer", sortable: false },
        { field: "RONoDO", title: "Untuk RO", sortable: false },
        { field: "ArticleDO", title: "Untuk Artikel", sortable: false },
        { field: "UnitDOType", title: "Tujuan", sortable: false },
        { field: "UENNo", title: "No. Bukti", sortable: false },
         
        { field: "ExpenditureDate", title: "Tanggal", sortable: false, formatter: function (value, data, index) {
            return moment(value).format("DD/MM/YYYY");
        }},
        { field: "Quantity", title: "Quantity", sortable: false },
        { field: "UomUnit", title: "Satuan", sortable: false },
        { field: "Total", title: "Jumlah", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  }
       
    ]   ;

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
    };

    

    loader = (info) => {
        // console.log(this);
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let filter = {};

        if (this.category) {
            filter.category = this.category;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            // filter: JSON.stringify(filter),
            order: order,
            // select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'division.name', 'position'],
        };

        Object.assign(arg, filter);

        return this.flag ? (
            this.service.search(arg)
                .then(result => {
                    // let unitPaymentOrders = result.data.map(p => p.no);

                    // return this.azureService.search({ unitPaymentOrders })
                    // .then(response => {
                    // let expeditions = response.data;

                    // for (let d of result.data) {
                    //     let expedition = expeditions.find(p => p.UnitPaymentOrderNo == d.no);

                    //     if (expedition) {
                    //         Object.assign(d, expedition);
                    //     }
                    // }

                    return {
                        total: result.info.total,
                        data: result.data
                    }
                    // });
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.flag = true;
        this.tableList.refresh();
    }

    reset() {
        this.flag = false;
        this.category = undefined;
        this.KtgrItem ="";
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.tableList.refresh();
    }

    xls() {
        let filter = {};


        if (this.category) {
            filter.category = this.category;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        this.service.xls(filter);
    }


    
}