import {inject} from 'aurelia-framework'; 
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    sum=0;
    datas=[];


    constructor(router, service) {
        
        this.service = service;
        this.router = router; 
        this.today = new Date();
        this.sum=0;
    } 

       getdetails(data)
       {
            for(var i=0;i<this.data.length; ++i)
        {    
            for( var j=0;j<this.data.items.length; ++j)
            {
                this.sum += this.data.items.price;
            }
            this.datas.push([{
                unit:this.data.unit,
                rp:this.sum
            }]);
        }
       }

    activate() {
        this.service.search('')
            .then(data => {
                this.data = datas;
            })
       
    }

    searching(){
        this.service.search('')
            .then(data => {
                this.data = data;
            })

            //     this.data.aggregate([
            //     { "$match": {
            //         "$gte": "2016-09-09T03:30:10.105Z",
            //         "$lt": "2016-09-10T03:30:10.105Z"
            //     }},
            //     { "$group": {
            //         "_id": { "$dayOfYear": "$createdDate" },
            //         "totalValue": { "$sum": "$orderTotal" }
            //     }}
            // ], function(err, result){
            //     console.log(result)
            // }
            // )
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    create() {
        this.router.navigateToRoute('create');
    }
}