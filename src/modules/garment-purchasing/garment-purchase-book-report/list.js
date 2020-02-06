import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.YearItem = [ ,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010
    ,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025
    ,2026,2027,2028,2029,2030];
    }
   
    unit=null;    
    jnsSpl = false;
    payMtd = " ";    
    category= " ";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable KtgrItem;
    @bindable Year;
         
    SupplierType = ['LOCAL', 'IMPORT'];
    KategoriItem = ['','BAHAN BAKU', 'NON BAHAN BAKU'];
    
   
    termPaymentLocal = ['', 'DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE']; 
    termPaymentImport = ['','T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];

    get unitLoader() {
        return UnitLoader;
    }

    activate() {
       
    }

    JenisSplChanged(newvalue) {
        if (newvalue) {
            this.jnsSpl = newvalue === "LOCAL" ? false : true;          
        }
    }

    KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "FABRIC";
            }
           
            else {
                this.category = "NON BAHAN BAKU"; 
            }
        }
    }

    searching() {
        {
            var info = {
            unit : this.unit ? this.unit.Id : "",
            jnsSpl : this.jnsSpl ? this.jnsSpl : "",
            payMtd : this.payMtd ? this.payMtd : "",            
            category : this.category ? this.category : "",
            year : this.Year ? this.Year: 0,
            // dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            // dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];

                for(var _data of result){
                    
                    _data.Qty_Jan=_data.Qty_Jan.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Feb=_data.Qty_Feb.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Mar=_data.Qty_Mar.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Apr=_data.Qty_Apr.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Mei=_data.Qty_Mei.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Jun=_data.Qty_Jun.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Jul=_data.Qty_Jul.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Aug=_data.Qty_Aug.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Sep=_data.Qty_Sep.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Oct=_data.Qty_Oct.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Nov=_data.Qty_Nov.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Dec=_data.Qty_Dec.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Jan=_data.Nominal_Jan.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Feb=_data.Nominal_Feb.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Mar=_data.Nominal_Mar.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Apr=_data.Nominal_Apr.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Mei=_data.Nominal_Mei.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Jun=_data.Nominal_Jun.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Jul=_data.Nominal_Jul.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Aug=_data.Nominal_Aug.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Sep=_data.Nominal_Sep.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Oct=_data.Nominal_Oct.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Nov=_data.Nominal_Nov.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Dec=_data.Nominal_Dec.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                    this.data.push(_data);
                }
                  console.log(this.data);
                 
                
               
             })
        }
    }

    ExportToExcel() {
        {
            var filter = {
                unit : this.unit ? this.unit.Id : "",
                jnsSpl : this.jnsSpl ? this.jnsSpl : "",
                payMtd : this.payMtd ? this.payMtd : "",            
                category : this.category ? this.category : "",
                year : this.Year ? this.Year: 0,
           }

        this.service.generateExcel(filter)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.category = undefined; 
        this.suppliers = undefined;
        this.jnsSpl = null;
        this.JenisSpl ="";
        this.KtgrItem="";
        this.Year =null;
    }

    // dateFromChanged(e) {
    //     var _startDate = new Date(e.srcElement.value);
    //     var _endDate = new Date(this.dateTo);

    //     if (_startDate > _endDate)
    //         this.dateTo = e.srcElement.value;

    // } 
}