import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    shiftOptions = [
      { text: "I", value: 1 },
      { text: "II", value: 2 },
      { text: "III", value: 3 } 
  ];
    MCNOOptions = [
    { text: "WP 1", value: 3 },
    { text: "WP 2", value: 3 },
    { text: "WP 3", value: 3 } 
  ];
  
    searching() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            mcNo : this.info.mcNo ? this.info.mcNo.text: "",
            sp: this.info.sp ? this.info.sp: "",
            code: this.info.code ? this.info.code: "",
            threadNo : this.info.threadNo ? this.info.threadNo: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : "",
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") : ""
        }
        console.log(info);
        this.service.getReportData(info)
            .then(result => {
              this.data= result.data;
                // this.data=[];
                // console.log(result);
                // for(var _data of result){
                //   this.data.push(_data);

                //  }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
    }
    get sumStock()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.stock;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumReceipt()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.receipt;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    get sumMainFabricExpenditure()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.mainFabricExpenditure;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }

    get sumNonMainFabricExpenditure()
    {
        var sum=0;
        if(this.data)
        { for(var item of this.data)
            {
                sum += item.nonMainFabricExpenditure;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }

    get sumExpenditure()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.expenditure;
            }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    get sumAval()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.aval;
            } 
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumRemainQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.remainQty;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    
}