import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var BuyersLoader = require('../../../../loader/buyers-loader');
var ComodityLoader = require('../../../../loader/comodity-loader');
var FinishingPrintingSalesContractLoader = require('../../../../loader/finishing-printing-sales-contract-loader');
var OrderTypeLoader = require('../../../../loader/order-type-loader');

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
    searching() {
        if (this.filter) {
            this.info.no = this.filter.salesContractNo ? this.filter.salesContractNo.SalesContractNo : null;
            this.info.buyerCode = this.filter.buyer ? this.filter.buyer.Code : null;
            this.info.orderTypeCode=this.filter.orderType ? this.filter.orderType.Code : null;
            this.info.comodityCode = this.filter.comodity ? this.filter.comodity.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } 
        this.service.search(this.info)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                // for(var a of this.data){
                //     a.deliverySchedule=moment(item.deliverySchedule).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.deliverySchedule).format("DD MMM YYYY");
                // }

                this.rowCount=[];
                var rowDoc=[];
                var index=0;

                for (var a of result.data){
                  var doc = a.salesContractNo;

                  if (!rowDoc[doc])
                  {
                    index++;
                    rowDoc[doc] = 1;
                  }
                  else
                  {
                    rowDoc[doc]++;
                  }
                }

                for (var _data of result.data)
                {
                  _data.salesContractNo = _data.salesContractNo == "" ? "-" : _data.salesContractNo;
                  _data.CreatedUtc = moment(_data.CreatedUtc).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.CreatedUtc).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.CreatedUtc).format("DD MMM YYYY");
                  _data.buyerName = _data.buyerName == "" ? "-" : _data.buyerName;
                  _data.buyerType = _data.buyerType == "" ? "-" : _data.buyerType;
                  _data.dispositionNo = _data.dispositionNo == "" ? "-" : _data.dispositionNo;
                  _data.orderType = _data.orderType == "" ? "-" : _data.orderType;
                  _data.comodityName = _data.comodityName == "" ? "-" : _data.comodityName;
                  _data.qualityName = _data.qualityName == "" ? "-" : _data.qualityName;
                  _data.orderQuantity = _data.orderQuantity == "" ? "-" : _data.orderQuantity;
                  _data.sppOrderNo = _data.sppOrderNo == "" ? "-" : _data.sppOrderNo;
                  _data.productionOrderQuantity = _data.productionOrderQuantity == "" ? "-" : _data.productionOrderQuantity;
                  _data.uomUnit = _data.uomUnit == "" ? "-" : _data.uomUnit;
                  _data.sppDate = moment(_data.sppDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.sppDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.sppDate).format("DD MMM YYYY");
                  _data.shippingQuantityTolerance = _data.shippingQuantityTolerance == "" ? "-" : _data.shippingQuantityTolerance;
                  _data.termOfPaymentName = _data.termOfPaymentName == "" ? "-" : _data.termOfPaymentName;
                  _data.paymentTo = _data.paymentTo == "" ? "-" : _data.paymentTo;
                  _data.deliverySchedule = moment(_data.deliverySchedule).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.deliverySchedule).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.deliverySchedule).format("DD MMM YYYY");
                  _data.agentName = _data.agentName == "" ? "-" : _data.agentName;
                  _data.comission = _data.comission == "" ? "-" : _data.comission;
                  _data.color = _data.color == "" ? "-" : _data.color;
                  _data.price = _data.price == "" ? "-" : _data.price;
                  _data.accountCurrencyCode = _data.accountCurrencyCode == "" ? "-" : _data.accountCurrencyCode;
                  _data.useIncomeTax = _data.useIncomeTax == "" ? "-" : _data.useIncomeTax;
                  _data.status = _data.status == "" ? "-" : _data.status;

                  let spp = result.data.find(o=>o.salesContractNo == _data.salesContractNo);

                  if(spp) {
                    spp.docspan = rowDoc[_data.salesContractNo];
                  }
                }
            })
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.no = this.filter.salesContractNo ? this.filter.salesContractNo.SalesContractNo : null;
            this.info.buyerCode = this.filter.buyer ? this.filter.buyer.Code : null;
            this.info.orderTypeCode=this.filter.orderType ? this.filter.orderType.Code : null;
            this.info.comodityCode = this.filter.comodity ? this.filter.comodity.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    get buyersLoader() {
        return BuyersLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get fpSalesContractLoaderLoader() {
        return FinishingPrintingSalesContractLoader;
    }

    get orderTypeLoader(){
        return OrderTypeLoader;
    }

    reset() {
        this.filter.salesContractNo=null;
        this.filter.buyer=null;
        this.filter.comodity=null;
        this.filter.dateFrom=null;
        this.filter.dateTo=null;
        this.filter.orderType=null;
        this.filter = {};
    }

buyerView = (buyer) => {
      return `${buyer.Code} - ${buyer.Name}`;
  }

}
