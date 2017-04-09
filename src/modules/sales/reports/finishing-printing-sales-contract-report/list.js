import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    info = { 
        comodityId:'', 
        buyerId:'', 
        orderTypeId:'', 
        sdate:'', 
        edate:''
    };

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    sdate = null;
    edate = null;
    salesContractNo = '';
    comodity=null;
    orderType = null;
    buyer = null;

    activate() {
    }

    reset() {
        this.sdate = null;
        this.edate = null;
        this.salesContractNo = '';
        this.orderType = null;
        this.buyer = null;
        this.comodity = null;
        this.data = [];
    }
    
    
    searching() {
        this.info.comodityId = this.comodity ? this.comodity._id : "" ;
        this.info.buyerId = this.buyer ? this.buyer._id : "";
        this.info.orderTypeId= this.orderType ? this.orderType._id : "";
        this.info.salesContractNo = this.salesContractNo;
        this.info.sdate = this.sdate;
        this.info.edate = this.edate;
        this.service.search(this.info)
            .then(result => {
                this.data = result.info;
                for(var a of this.data){
                    if(a.tax){
                        if(a.ppn){
                            a.sctax="Including PPN";
                        }
                        else{
                            a.sctax="Excluding PPN";
                        }
                    }
                    else{
                        a.sctax="Tanpa PPN";
                    }
                    a.accountData= a.bank.accountName + " - " + a.bank.bankName + ' - ' + a.bank.accountNumber;
                }
                
            })
    }

    ExportToExcel() {
        this.info.comodityId = this.comodity ? this.comodity._id : "" ;
        this.info.buyerId = this.buyer ? this.buyer._id : "";
        this.info.orderTypeId= this.orderType ? this.orderType._id : "";
        this.info.salesContractNo = this.salesContractNo;
        this.info.sdate = this.sdate;
        this.info.edate = this.edate;
        this.service.generateExcel(this.info);
    }

    buyerChanged(e){
        var selectedBuyer = e.detail || null;
        if(!selectedBuyer){
            this.buyer = null;
        }
    }

    orderTypeChanged(e){
        var selectedOrderType = e.detail || null;
        if(!selectedOrderType){
            this.orderType = null;
        }
    }

    comodityChanged(e){
        var selectedComodity = e.detail || null;
        if(!selectedComodity){
            this.comodity = null;
        }
    }

}