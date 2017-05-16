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
    dateFrom = null;
    dateTo = null;
    salesContractNo = '';
    orderNo = '';
    orderType = null;
    processType = null;
    buyer = null;
    account = null;
    filterAccount = {};
    info = { page: 1, keyword: '' };

    activate() {
        this.filterAccount = {
            "roles" : {
                "$elemMatch" : { 
                    "permissions" : {
                        "$elemMatch" : { 
                            "unit.name" : "PENJUALAN FINISHING & PRINTING"
                        }
                    }
                }
            }
        };
    }

    reset() {
        if (this.info.filter) {
            this.info.filter.dateFrom = null;
            this.info.filter.dateTo = null;
            this.info.filter.salesContractNo = '';
            this.info.filter.orderNo = '';
            this.info.filter.orderType = null;
            this.info.filter.processType = null;
            this.info.filter.buyer = null;
            this.info.filter.account = null;
            this.data = [];
    }}
    
    
    searching() {
        var data = [];
        this.filter = this.info.filter;
        this.service.getReport(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.data;
                this.info.filter=this.filter;
            })
    }

    ExportToExcel() {
        this.service.generateExcel(this.dateFrom, this.dateTo, this.salesContractNo, this.orderNo, this.orderType, this.processType, this.buyer, this.account);
    }

    buyerChanged(e){
        var selectedBuyer = e.detail || null;
        if(!selectedBuyer){
            this.buyer = null;
        }
    }

    orderTypeChanged(e){
        var selectedOrderType = e.detail || null;
        if(selectedOrderType){
            this.filterOrder = {
                "orderType.code": selectedOrderType.code
            }
        }else{
            this.orderType = null;
            this.processType = null;
            this.filterOrder = {};
        }
    }

    processTypeChanged(e){
        var selectedProcessType = e.detail || null;
        if(!selectedProcessType){
            this.processType = null;
        }
    }

    accountChanged(e){
        var selectedAccount = e.detail || null;
        if(!selectedAccount){
            this.account = null;
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}