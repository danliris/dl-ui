import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';


var AccountLoader = require('../../../loader/account-loader');

@inject(Router, Service)
export class List {
    info = { 
        // comodityId:'', 
        // buyerId:'', 
        // orderTypeId:'', 
        // dateFrom:'', 
        // dateTo:'',
        page: 1,
        size:25
    };
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    salesContractNo = '';
    comodity=null;
    orderType = null;
    buyer = null;

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    menuList= [
        "",
        "G-PURCHASING",
        "PURCHASING",
        "G-PRODUCTION",
        "PS-INVENTORY",
        "SPINNING",
        "SALES",
        "DASHBOARD-DP",
        "MERCHANDISER",
        "WEAVING",
        "MASTER",
        "PRODUCTION",
        "G-DASHBOARD",
        "G-FINANCE",
        "INVENTORY",
        "G-SHIPPING",
        "IT-INVENTORY",
        "FINANCE",
        "G-SAMPLE",
        "AUTH",
        "ACCOUNTING",
        "CUSTOMS",
        "G-SUBCON",
        "G-MASTER-PLAN"

    ];

    activate() {
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.salesContractNo = '';
        this.orderType = null;
        this.buyer = null;
        this.comodity = null;
        this.data = [];
    }
    
    
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
    search(){
        //  this.error = {};

        // if (Object.getOwnPropertyNames(this.error).length === 0) {
            //this.flag = true;
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        
    }


    ExportToExcel() {
        // if (this.) {
        //     this.info.no = this.filter.salesContractNo ? this.filter.salesContractNo.SalesContractNo : null;
           
        // } else {
        //     this.info = {};
        // }
        console.log(this.account);
        this.info ={
            userId : this.account ? this.account._id : 0,
            menu : this.menu
        };

        console.log(this.info);
        this.service.generateExcel(this.info);
    }
    get accountLoader() {
        return AccountLoader;
    }
    

    reset() {
        this.account=null;
        this.menu=null;
        
    }


}