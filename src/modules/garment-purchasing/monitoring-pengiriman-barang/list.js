import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var PRLoader = require('../../../loader/garment-purchase-request-loader');
var UnitLoader = require('../../../loader/unit-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');

@inject(Router, Service)
export class List {
  
    purchaseRequest = {};
    filter = {isPosted: true};
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        
    }
    attached() {
    }

 activate(params) {
  if (params.dateFrom != null || params.dateTo != null ) {
            this.dateFrom = params.dateFrom;
            this.dateTo = params.dateTo;
     
            var uri = "";
     
            if (this.dateFrom == undefined && this.dateTo == undefined  )
                uri = this.service.search(this.dateFrom, this.dateTo);
            else
                uri = this.service.search(this.dateFrom, this.dateTo);
                
                uri.then(result => {
                this.data = [];
                console.log(result);
                var counter = 1;
                var jumOk=0;
                var tjumOk=0;
                 var jumNotOk=0;
                var tjumNotOk=0;
                 var jumcount=0;
                var tjumcount=0;
                
                for (var _data of result) {
                   _data.supplier =_data._id.supplier ? _data._id.supplier : "-";
            

                    if (_data.Ok != 0 && _data.count != 0 ) {
                    _data.persen = (_data.Ok / _data.count * 100).toFixed(0);
                   
                }
                else {
                    _data.persen = 0;
          
                }


                if (_data.NotOk != 0 && _data.count != 0 ) {
                    _data.persenNot = (_data.NotOk / _data.count * 100).toFixed(0);
                   
                }
                else {
                    _data.persenNot = 0;
          
                }
                        this.data.push(_data);
                }
             
                 for (var scount of result) {
                jumOk += scount.Ok;
                jumNotOk += scount.NotOk;
                jumcount += scount.count;

            }
            this.tjumOk = jumOk;
            this.tjumNotOk = jumNotOk;
            this.tjumcount = jumcount;

  

              var  tperOk = (this.tjumOk / this.tjumcount * 100).toFixed(0);

              var  tperNotOk = (this.tjumNotOk / this.tjumcount * 100).toFixed(0);

            this.tperOk = tperOk;
            this.tperNotOk = tperNotOk;
        })
           

            
  }else{
      this.dateFrom='';
      this.dateTo='';
  }
}

   
    search() {
         if (this.dateFrom == '' || this.dateTo == '' )  {
             this.dateFrom='';
             this.dateTo='';
         }else{
    this.service.search(this.dateFrom, this.dateTo)
            .then(result => {
                this.data = [];
                console.log(result);
                var counter = 1;
                var jumOk=0;
                var tjumOk=0;
                 var jumNotOk=0;
                var tjumNotOk=0;
                 var jumcount=0;
                var tjumcount=0;
                
                for (var _data of result) {
                   _data.supplier =_data._id.supplier ? _data._id.supplier : "-";
            

                    if (_data.Ok != 0 && _data.count != 0 ) {
                    _data.persen = (_data.Ok / _data.count * 100).toFixed(0);
                   
                }
                else {
                    _data.persen = 0;
          
                }


                if (_data.NotOk != 0 && _data.count != 0 ) {
                    _data.persenNot = (_data.NotOk / _data.count * 100).toFixed(0);
                   
                }
                else {
                    _data.persenNot = 0;
          
                }
                        this.data.push(_data);
                }
             
                 for (var scount of result) {
                jumOk += scount.Ok;
                jumNotOk += scount.NotOk;
                jumcount += scount.count;

            }
            this.tjumOk = jumOk;
            this.tjumNotOk = jumNotOk;
            this.tjumcount = jumcount;

  

              var  tperOk = (this.tjumOk / this.tjumcount * 100).toFixed(0);

              var  tperNotOk = (this.tjumNotOk / this.tjumcount * 100).toFixed(0);

            this.tperOk = tperOk;
            this.tperNotOk = tperNotOk;
        })
      }
    }
    reset() {
  
        this.dateFrom = "";
        this.dateTo = "";
        this.data=[];
 
    }

  view(data, dateFrom, dateTo) {
       this.router.navigateToRoute('view', { id: data.supplier,supplier: data._id.kdsupplier, dateFrom:this.dateFrom, dateTo:this.dateTo  });
        
    }

    ExportToExcel() {
     
this.service.generateExcel(this.dateFrom ? this.dateFrom : "", this.dateTo ?this.dateTo : "")

    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }

}