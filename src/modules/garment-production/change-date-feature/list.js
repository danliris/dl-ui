import {bindable,inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    @bindable selectedProcess;

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    info = { page: 1,size:25};

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    search(){
        this.info.page = 1;
        this.info.total=0;
        this.searching();
    
    }

    bind(context) {
        this.context = context;
    }

    processOptions=["PREPARING", "CUTTING IN", "CUTTING OUT", "LOADING", "SEWING IN", "SEWING OUT",
                    "FINISHING IN", "FINISHING OUT", "PENGELUARAN GUDANG JADI"];

    selectedProcessChanged(newValue){
        this.reset();
    }

    searching() {
        let filter={};
        if(this.unit){
            filter.UnitCode=this.unit.Code;
        }
        if(this.ro){
            filter.RONo=this.ro;
        }
        if(this.no){
            if(this.selectedProcess=="PREPARING")
                filter.UENNo=this.no;
        }
        let args = {
            page: this.info.page,
            size: this.info.size,
            filter: JSON.stringify(filter)
        };
        if(this.selectedProcess=="PREPARING"){
            this.service.searchPreparing(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.UENNo;
                    s.date=s.ProcessDate;
                });
                this.fillTable();
            });
        }
        else if(this.selectedProcess=="CUTTING IN"){
            this.service.searchCuttingIn(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.CutInNo;
                    s.date=s.CuttingInDate;
                });
                this.fillTable();
            });
        }
        else if(this.selectedProcess=="CUTTING OUT"){
            this.service.searchCuttingOut(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.CutOutNo;
                    s.date=s.CuttingOutDate;
                });
                this.fillTable();
            });
        }
        
      }
    
      fillTable() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false, });
        columns.push({ field: 'no', title: 'No Dokumen' });
        columns.push({ field: 'RONo', title: 'No RO' });
        columns.push({ field: 'Article', title: 'Artikel' });
        columns.push({ field: 'UnitCode', title: 'Unit' });
        columns.push({ field: 'TotalQuantity', title: 'Jumlah' });
        columns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });

        var bootstrapTableOptions = {
          columns: columns,
          data: this.data,
          fixedColumns: true,
          fixedNumber: 1
        };
        //bootstrapTableOptions.height = 150;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    reset() {
        this.data = null;
        this.no = null;
        this.unit = null;
        this.ro=null;
        this.info.page = 1;
        this.info.total=0;
        $(this.table).bootstrapTable('refresh')
    }

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    get totalQuantity(){
        var qty=0;
        if(this.data){
            for(var item of this.data){
                if(item.isEdit){
                    qty+=item.TotalQuantity;
                }
            }
        }
        return qty;
    }

    changeDate(newValue){

    }
}