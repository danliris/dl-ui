import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, MongoService } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

var moment = require("moment");

@inject(Router, Service, MongoService, Dialog)
export class View {

    constructor(router, service, mongoService, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.mongoService = mongoService;

        this.submitContext = { verifiedAlert: false };
    }

    context = ["Rincian Purchase Request"];

    selectSPB = [
        'division.name', 'division.code',
        'supplier.name', 'supplier.code',
        'currency.code',
        'category.code', 'category.name',
        'paymentMethod',
        'invoceNo',
        'invoceDate',
        'pibNo',
        'useVat', //pph
        'useIncomeTax', //ppn
        'no',
        'date',
        'remark',
        'items.unitReceiptNote.no',
        'items.unitReceiptNote.items.product.name',
        'items.unitReceiptNote.items.deliveredQuantity',
        'items.unitReceiptNote.items.deliveredUom.unit',
        'items.unitReceiptNote.items.pricePerDealUnit',
        'items.unitReceiptNote.items.correction.correctionNo',
        'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
        'items.unitReceiptNote.items.purchaseOrder.purchaseRequest.no',
    ];

    async activate(params) {
        var id = params.id;
        this.dataExpedition = await this.service.getById(id);

        var arg = {
            filter: JSON.stringify({ no: this.dataExpedition.UnitPaymentOrderNo }),
            select: this.selectSPB,
        }

        var UnitPaymentOrder = await this.mongoService.searchByCode(arg);

        this.data = UnitPaymentOrder.data;
        this.data.VerificationDate = this.dataExpedition.VerifyDate;
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.dataExpedition.Id });
    }

    Submit(context) {

        var Data = this.data;
        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;
        this.dialog.show(AlertView, this.submitContext)
            .then(response => {

                if (!response.wasCancelled) {
                    if (response.output.context == "Finance") {
                        Data.SubmitPosition = 5;
                    } else if (response.output.context == "Cashier") {
                        Data.SubmitPosition = 4;
                    } else {
                        Data.SubmitPosition = 6;
                        Data.Remark = response.output.Remark;
                    }
                    this.service.create(Data).then(result => {
                        alert("Data berhasil diubah");
                        this.cancel();
                    });
                }
            });
    }

    async contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        var PrFilter = {
            filter: JSON.stringify({ no: data.purchaseRequestNo }),
            select: ["_id"],
        }
        var Pr = await this.mongoService.searchPrByCode(PrFilter);
        var _id = Pr.data[0]._id;
        switch (arg.name) {
            case "Rincian Purchase Request":
                window.open(`${window.location.origin}/#/pr/view/${encodeURIComponent(_id)}`);
                break;
        }
    }

}