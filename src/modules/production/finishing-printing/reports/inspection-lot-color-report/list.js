import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var ProductionOrderLoader = require("../../../../../loader/production-order-loader")
var KanbanLoader = require("../../../../../loader/kanban-loader")

@inject(Router, Service)
export class List {


    info = {
        kanban: "",
        productionOrder: "",
        dateFrom: "",
        dateTo: "",

    };

    kanban = "";
    OrderNo = "";
    dateFrom = '';
    dateTo = '';
    data = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        //this.data = this.context.data;
        this.error = this.context.error;

    }

    searching() {
        if (this.filter) {
            this.info.kanban = this.filter.kanban ? this.filter.kanban._id : "";
            this.info.productionOrder = this.filter.productionOrder ? this.filter.productionOrder._id : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                var tempData;
                this.no = 0;
                this.data = [];
                for (var i = 0; i < result.length; i++) {
                    for (var j = 0; j < result[i].items.length; j++) {
                        tempData = {};
                        this.no += 1;
                        tempData.no = this.no;
                        tempData.orderNo = result[i].kanban.productionOrder.orderNo;
                        tempData.construction = `${result[i].kanban.productionOrder.material.name} / ${result[i].kanban.productionOrder.materialConstruction.name} / ${result[i].kanban.productionOrder.yarnMaterial.name} / ${result[i].kanban.productionOrder.materialWidth}`;
                        tempData.colorRequest = result[i].kanban.selectedProductionOrderDetail.colorRequest;
                        tempData.cartNumber = result[i].kanban.cart.cartNumber;
                        tempData.orderTypeName = result[i].kanban.productionOrder.orderType.name;
                        tempData.date = result[i].date;
                        tempData.pcsNo = result[i].items[j].pcsNo;
                        tempData.lot = result[i].items[j].lot;
                        tempData.status = result[i].items[j].status;
                        this.data.push(tempData);
                    }
                }
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.kanban = this.filter.kanban ? this.filter.kanban._id : "";
            this.info.productionOrder = this.filter.productionOrder ? this.filter.productionOrder._id : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    get kanbanLoader(){
        return KanbanLoader;
    }

    get productionOrderLoader(){
        return ProductionOrderLoader;
    }

    kanbanChanged(e) {
        console.log('kanban changed')
    }

    productionOrderChanged(e) {
        console.log('production number changed')
    }

    get filterKanban(){
        var temp = {};
        if(this.filter){
            if(this.filter.productionOrder){
                temp = {
                    "productionOrder.orderNo" : this.filter.productionOrder.orderNo
                };
                return temp;
            }else
                return temp;
        }else
            return temp;
    }

    reset() {
        this.filter = {};
        this.data = [];
        // this.newData = [];
    }



}