import { inject, bindable } from 'aurelia-framework';
import {Service,CoreService} from "./service";
import moment from 'moment';

@inject(Service, CoreService)
export class List {
    @bindable selectedUnit;

    constructor(service,coreService) {
        this.service = service;
        this.coreService = coreService;
    }

   async bind(context) {
        this.context = context;
      
    }
    searching() {
        var info = {
           
            receivedDateFrom : this.receivedDateFrom ? moment(this.receivedDateFrom).format("YYYY-MM-DD") : "",
            receivedDateTo : this.receivedDateTo ? moment(this.receivedDateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                console.log(result);
                for(var _data of result){
                    _data.quantity=_data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._sentDate = moment(_data.sentDate).format("DD-MMMM-YYYY") ;
                    _data._receivedDate = moment(_data.receivedDate).format("DD-MMMM-YYYY") ;
                    _data._sampleRequestDate =  moment(_data.sampleRequestDate).format("DD-MMMM-YYYY") ;
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
           
            receivedDateFrom : this.receivedDateFrom ? moment(this.receivedDateFrom).format("YYYY-MM-DD") : "",
            receivedDateTo : this.receivedDateTo ? moment(this.receivedDateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.generateExcel(info);
    }

     
    reset() {
        this.receivedDateFrom = null;
        this.receivedDateTo = null;
         
    }
  
    
}