import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { PurchasingService } from "../service";
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

@inject(PurchasingService)
export class Item {
    @bindable unitPaymentOrder;

    constructor(service) {
        this.service = service;
        this.queryUPO = { position: 1 }; // PURCHASING_DIVISION
        this.selectUPO = [
            'division.code', 'division.name',
            'supplier.code', 'supplier.name',
            'currency.code', 'no', 'date',
            'items.unitReceiptNote.date',
            'items.unitReceiptNote.items.product.name',
            'items.unitReceiptNote.items.deliveredQuantity',
            'items.unitReceiptNote.items.deliveredUom.unit',
            'items.unitReceiptNote.items.pricePerDealUnit',
            'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
        ];

        this.columns = ['Nama Barang', 'Jumlah', 'UOM', 'Harga'];
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.isShowing = false;

        if (this.data.no)
            this.unitPaymentOrder = { no: this.data.no };
    }

    unitPaymentOrderChanged(newV, oldV) {
        if (newV) {
            let details = [], noPOE = [], totalPaid = 0, dates = [];
            for (let item of newV.items) {
                for (let detail of item.unitReceiptNote.items) {
                    if (!noPOE.some(p => p === detail.purchaseOrder.purchaseOrderExternal.no))
                        noPOE.push(detail.purchaseOrder.purchaseOrderExternal.no);

                    details.push({
                        dateURN: item.unitReceiptNote.date,
                        noPOE: detail.purchaseOrder.purchaseOrderExternal.no,
                        productName: detail.product.name,
                        quantity: detail.deliveredQuantity,
                        uom: detail.deliveredUom.unit,
                        price: numeral(detail.pricePerDealUnit * detail.deliveredQuantity).format('0,000.00'),
                    });

                    totalPaid += detail.pricePerDealUnit * detail.deliveredQuantity;
                }
            }

            let argsPOE = {
                page: 1,
                size: noPOE.length,
                filter: JSON.stringify({ no: { '$in': noPOE } }),
                select: ['no', 'paymentDueDays'],
            };

            this.service.searchPOE(argsPOE)
                .then(response => {
                    let dueDaysPOE = response.data;

                    for (let detail of details) {
                        let POE = dueDaysPOE.find(p => p.no === detail.noPOE);
                        dates.push(moment(detail.dateURN).add(POE.paymentDueDays, 'days'));
                    }

                    Object.assign(this.data, {
                        no: newV.no,
                        date: newV.date,
                        dueDate: moment.min(dates),
                        supplierCode: newV.supplier.code,
                        supplierName: newV.supplier.name,
                        divisionCode: newV.division.code,
                        divisionName: newV.division.name,
                        totalPaid: numeral(totalPaid).format('0,000.00'),
                        currency: newV.currency.code,
                        details: details,
                    });
                });
        }
        else {
            Object.assign(this.data, {
                no: undefined,
                date: undefined,
                dueDate: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                divisionCode: undefined,
                divisionName: undefined,
                totalPaid: undefined,
                currency: undefined,
                details: [],
            });
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }
}
