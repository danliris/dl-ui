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
    attached() {
    }

    activate() {
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    search() {
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
                // this.data = [];
                // var counter = 1;
                // for (var PO of data) {
                //     for (var item of PO.items) {
                //         var _data = {};
                //         _data.no = counter;
                //         _data.prDate = moment(new Date(PO.purchaseRequest.date)).format(dateFormat);
                //         _data.prNo = PO.purchaseRequest.no;
                //         _data.productName = item.product.name;
                //         _data.productCode = item.product.code;
                //         _data.productQty = item.dealQuantity ? item.dealQuantity : 0;
                //         _data.productUom = item.dealUom.unit ? item.dealUom.unit : "-";
                //         _data.pricePerUnit = PO.purchaseOrderExternal.currencyRate ? (item.pricePerDealUnit * PO.purchaseOrderExternal.currencyRate) : 0;
                //         _data.priceTotal = PO.purchaseOrderExternal.currencyRate ? (item.pricePerDealUnit * item.dealQuantity * PO.purchaseOrderExternal.currencyRate) : 0;
                //         _data.supplierCode = PO.supplier.code ? PO.supplier.code : "-";
                //         _data.supplierName = PO.supplier.name ? PO.supplier.name : "-";
                //         _data.poIntDate = moment(new Date(PO.purchaseRequest.date)).format(dateFormat);
                //         _data.poExtDate = PO.purchaseOrderExternal.date ? moment(new Date(PO.purchaseOrderExternal.date)).format(dateFormat) : "-";
                //         _data.poExtExpectedDate = PO.purchaseOrderExternal.expectedDeliveryDate ? moment(new Date(PO.purchaseOrderExternal.expectedDeliveryDate)).format(dateFormat) : "-";
                //         _data.poExtNo = PO.purchaseOrderExternal.no ? PO.purchaseOrderExternal.no : "-";
                //         _data.remark = PO.purchaseOrderExternal.remark ? PO.purchaseOrderExternal.remark : "-";
                //         if (item.fulfillments.length > 0) {
                //             for (var fulfillment of item.fulfillments) {
                //                 _data.supplierDoDate = fulfillment.supplierDoDate ? moment(new Date(fulfillment.supplierDoDate)).format(dateFormat) : "-";
                //                 _data.doDate = fulfillment.deliveryOderDate ? moment(new Date(fulfillment.deliveryOderDate)).format(dateFormat) : "-";
                //                 _data.doNo = fulfillment.deliveryOderNo ? fulfillment.deliveryOderNo : "-";
                //                 _data.unitReceiptNoteDate = fulfillment.unitReceiptNoteDate ? moment(new Date(fulfillment.unitReceiptNoteDate)).format(dateFormat) : "-";
                //                 _data.unitReceiptNoteNo = fulfillment.unitReceiptNoteNo ? fulfillment.unitReceiptNoteNo : "-";
                //                 _data.unitReceiptNoteDeliveredQty = fulfillment.unitReceiptNoteDeliveredQuantity ? fulfillment.unitReceiptNoteDeliveredQuantity : 0;
                //                 _data.unitReceiptNoteDeliveredUom = fulfillment.unitReceiptDeliveredUom ? fulfillment.unitReceiptDeliveredUom.unit : "-";
                //                 _data.invoiceDate = fulfillment.invoiceDate ? moment(new Date(fulfillment.invoiceDate)).format(dateFormat) : "-";
                //                 _data.invoiceNo = fulfillment.invoiceNo ? fulfillment.invoiceNo : "-";
                //                 _data.unitPaymentOrderDate = fulfillment.interNoteDate ? moment(new Date(fulfillment.interNoteDate)).format(dateFormat) : "-";
                //                 _data.unitPaymentOrderNo = fulfillment.interNoteNo ? fulfillment.interNoteNo : "-";
                //                 _data.unitPaymentOrderValue = fulfillment.interNoteValue ? fulfillment.interNoteValue : 0;
                //                 _data.unitPaymentOrderDueDays = fulfillment.interNoteDueDate ? moment(new Date(fulfillment.interNoteDueDate)).format(dateFormat) : "-";
                //                 _data.incomeTaxDate = fulfillment.ppnDate ? moment(new Date(fulfillment.ppnDate)).format(dateFormat) : "-";
                //                 _data.incomeTaxNo = fulfillment.ppnNo ? fulfillment.ppnNo : "-";
                //                 _data.incomeTaxValue = fulfillment.ppnValue ? fulfillment.ppnValue : 0;
                //                 _data.vatDate = fulfillment.pphDate ? moment(new Date(fulfillment.pphDate)).format(dateFormat) : "-";
                //                 _data.vatNo = fulfillment.pphNo ? fulfillment.pphNo : "-";
                //                 _data.vatValue = fulfillment.pphValue ? fulfillment.pphValue : 0;
                //                 counter++;
                //                 this.data.push(_data);
                //             }
                //         }
                //         else {
                //             _data.supplierDoDate = "-";
                //             _data.doDate = "-";
                //             _data.doNo = "-";
                //             _data.unitReceiptNoteDate = "-";
                //             _data.unitReceiptNoteNo = "-";
                //             _data.unitReceiptNoteDeliveredQty = 0;
                //             _data.unitReceiptNoteDeliveredUom = "-";
                //             _data.invoiceDate = "-";
                //             _data.invoiceNo = "-";
                //             _data.unitPaymentOrderDate = "-";
                //             _data.unitPaymentOrderNo = "-";
                //             _data.unitPaymentOrderValue = 0;
                //             _data.unitPaymentOrderDueDays = "-";
                //             _data.incomeTaxDate = "-";
                //             _data.incomeTaxNo = "-";
                //             _data.incomeTaxValue = 0;
                //             _data.vatDate = "-";
                //             _data.vatNo = "-";
                //             _data.vatValue = 0;
                //             counter++;
                //             this.data.push(_data);
                //         }
                //     }
                // }
            })
    }

    reset() {
        this.unit = "undefined";
        this.category = "undefined";
        this.PODLNo = "";
        this.PRNo = "";
        this.supplier = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

    exportToXls() {
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo);
    }

    dateFromChanged(e){
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if(_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}