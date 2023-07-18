import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var TrackLoader = require("../../../loader/track-loader");

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;

        this.flag = false;

    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    //context = ["detail"];
    units = ["", "DYEING", "PRINTING"];
   
    columns = [
        { field: "productionOrderNo", title: "No. Spp", sortable: false},
       
        
       
        { field: "productPackingCode", title: "Barcode", sortable: false},
        { field: "grade", title: "Grade", sortable: false},
       
        { field: "packagingQtyRemains", title: "Sisa Qty Pack", sortable: false},
        { field: "packagingLength", title: "Panjang Per Pack", sortable: false},
        { field: "packagingUnit", title: "Jenis Packing", sortable: false},
        { field: "balanceRemains", title: "Sisa Qty", sortable: false},
        { field: "uomUnit", title: "Satuan", sortable: false},
        { field: "description", title: "Keterangan", sortable: false},
        
        
       
    ];

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }


    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }

    search() {
        this.error = {};

        console.log(this.dateFrom);
        console.log(this.dateTo);

         if (this.dateFrom && this.dateTo && (this.dateFrom <= this.dateTo) || (!this.dateFrom && !this.dateTo)) {

            if (Object.getOwnPropertyNames(this.error).length === 0) {
                this.flag = true;
                this.Table.refresh();
            }
        }
        else if(this.dateFrom > this.dateTo)
        {
            this.error.dateFrom = "Tanggal Awal Harus Lebih Kecil dari Tanggal Akhir";

        } 
        else if(this.dateTo && !this.dateFrom )
        {
            this.error.dateFrom = "Tanggal tidak boleh hanya salah satu yang terisi";
        }else {
            this.error.dateTo = "Tanggal tidak boleh hanya salah satu yang terisi";
        }
    }
  

    reset(){
        this.productionOrder = null;
        this.productPackingCode = null;
       
        this.error = {};
        this.flag = false;
    }


    /*loader = (info) => {
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            productionOrderId: this.productionOrder ? this.productionOrder.Id :null,
            unit: this.unit,
            dateFrom: moment(this.dateFrom).format("MM-DD-YYYY"),
            dateTo: moment(this.dateTo).format("MM-DD-YYYY")
        }
        console.log(productionOrder);
        console.log(arg);

        return this.service.search(arg)
            .then((result) => {
                var data = {};
                data.data = result.data;
                data.total = result.total;

                return data;
            });

    } */

    loader = (info) => {
        
        
            var order = {};

            if (info.sort)
                order[info.sort] = info.order;
            let args = {
                page: parseInt(info.offset / info.limit, 10) + 1,
                size: info.limit,
                productionOrderId: this.productionOrder ? this.productionOrder.Id: null,
                productPackingCode : this.productPackingCode ? this.productPackingCode : null
                
            };
          
            return this.flag ?
                (
                    this.service.searchPreInput(args)
                        .then(result => {
                            var index=0;
                            for(var data of result.data){
                                index++;
                                data.index=index;
                            
                            }
                            return {
                                total: result.total,
                                data: result.data
                            };
                        })
                ) : { total: 0, data: [] };
        
            
    }
    get trackLoader(){
        return TrackLoader;
    }

    trackView = (track) => {
        console.log(track);
        if(track.Type === undefined){

            return `${track.type} - ${track.name} - ${track.box}` ; 
          }else{
      
            return `${track.Type} - ${track.Name} - ${track.Box}`;
          }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    /*excel() {
        this.info = {};
        if (this.filter) {
            this.info.productionOrderId = this.filter.productionOrder ? this.info.productionOrder.Id : "";
            this.info.unit = this.filter.unit ? this.filter.unit : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        this.service.generateExcel(this.info);
    }*/
    excel() {
        this.error = {};
        if (this.dateFrom && this.dateTo && (this.dateFrom <= this.dateTo) || (!this.dateFrom && !this.dateTo)) {

            if (Object.getOwnPropertyNames(this.error).length === 0) {
                let args = {
                    productionOrderId: this.productionOrder ? this.productionOrder.Id: null,
                    productPackingCode: this.productPackingCode ? this.productPackingCode : "",
                    
            };

                this.service.generateExcelPreInput(args)
                    .catch(e => {
                        alert(e.replace(e, "Error: ", ""));
                    });
            }

        }
        else if(this.dateFrom > this.dateTo)
        {
            this.error.dateFrom = "Tanggal Awal Harus Lebih Kecil dari Tanggal Akhir";

        } 
        else if(this.dateTo && !this.dateFrom )
        {
            this.error.dateFrom = "Tanggal tidak boleh hanya salah satu yang terisi";
        }else{
            this.error.dateTo = "Tanggal tidak boleh hanya salah satu yang terisi";
        }
    }

    


    

}
