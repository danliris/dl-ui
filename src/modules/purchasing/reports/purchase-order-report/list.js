import {inject} from 'aurelia-framework'; 
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    constructor(router, service) {
        
        this.service = service;
        this.router = router; 
        this.today = new Date();
    } 


    activate() {
        
    }

    searching(){
        var pricetotals=0;
        var percentage=[];
        var data=[];
        this.service.getByDate(this.dateFrom,this.dateTo)
            .then(data => {
                this.data = data;
                for( var price of data) { 
                    pricetotals += price.pricetotal;
                }
                this.pricetotals=pricetotals;
                for( var item of data) { 
                    var persen= Math.round((item.pricetotal*100)/this.pricetotals);
                    percentage.push(persen);
                }
                this.percentage=percentage;
            })
            
    }

}