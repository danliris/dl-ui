import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
var SectionLoader = require('../../../../loader/garment-sections-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    section=null;    
    dateFrom = null;
    dateTo = null;
      
    get sectionLoader() {
        return SectionLoader;
    }

    sectionView = (section) => { 
        return `${section.Code}`
    }

    sectionChanged(newValue){
        var selectedSection = newValue;
        if(selectedSection){
            this.data.SectionCodee = selectedSection.Code;
        }
    }

    activate() {
       
    }

    searching() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }
        this.service.search(JSON.stringify(info))
            .then(result => {
                this.data = result;
                console.log(result);

                var dataBySection = {};
                var subTotalSection = {};
    
                  for (var data of result) {
                       var SECTION = data.Section;
                        if (!dataBySection[SECTION]) dataBySection[SECTION] = [];                 
                            dataBySection[SECTION].push({            
                            RO_Number : data.RO_Number,
                            Section : data.Section,
                            UnitName : data.UnitName,
                            BuyerCode : data.BuyerCode,
                            BuyerName : data.BuyerName,
                            BrandCode : data.BrandCode,
                            BrandName : data.BrandName,
                            Article : data.Article,
                            Comodity : data.Comodity,
                            ComodityDescription : data.ComodityDescription,
                            FabAllow : data.FabAllow,
                            AccAllow : data.AccAllow,
                            DeliveryDate : moment(data.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.DeliveryDate).format("DD MMM YYYY"),                          
                            Profit : data.Profit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),              
                            Quantity : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),              
                            UOMUnit : data.UOMUnit,
                            ConfirmPrice : data.ConfirmPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4}),
                            CMPrice : data.CMPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4}),
                            FOBPrice : data.FOBPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4}),
                            Amount : data.Amount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2}),
                         });
                    
                        if (!subTotalSection[SECTION]) {
                           subTotalSection[SECTION] = 0;
                           } 
                           subTotalSection[SECTION] += data.Amount;
                        }    

               var Sections = [];
               this.AmountTotal = 0;
                   
               for (var data in dataBySection) {
                   Sections.push({
                   data: dataBySection[data],
                   SECTION: dataBySection[data][0].Section,
                   subTotal: (subTotalSection[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                });
                   this.AmountTotal += subTotalSection[data];                                     
               }
               
               this.AmountTotal = this.AmountTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.Sections = Sections;

                });        
    }
          
    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.section = null;
        this.Sections = [];
        this.AmountTotal = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}