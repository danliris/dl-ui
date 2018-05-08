import { bindable } from 'aurelia-framework';
import numeral from 'numeral';

const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

export class Item {
    @bindable unitPaymentOrder;

    constructor() {
        this.selectUPO = [
            'division.name', 'supplier.name',
            'currency.code', 'no', 'date',
            'items.unitReceiptNote.items.product.name',
            'items.unitReceiptNote.items.deliveredQuantity',
            'items.unitReceiptNote.items.deliveredUom.unit',
            'items.unitReceiptNote.items.pricePerDealUnit',
        ];

        this.columns = ['Nama Barang', 'Jumlah', 'UOM', 'Harga'];
    }

    activate(context) {
        this.data = context.data;
        this.isShowing = false;

        if (this.data.no)
            this.unitPaymentOrder = { no: this.data.no };
    }

    unitPaymentOrderChanged(newV, oldV) {
        if (newV) {
            Object.assign(this.data, {
                no: newV.no,
                date: newV.date,
                supplierName: newV.supplier.name,
                division: newV.division.name,
                totalPrice: 0,
                currency: newV.currency.code,
                details: [],
            });

            let details = [], totalPrice = 0;
            for (let item of newV.items) {
                for (let detail of item.unitReceiptNote.items) {
                    details.push({
                        productName: detail.product.name,
                        quantity: detail.deliveredQuantity,
                        uom: detail.deliveredUom.unit,
                        price: numeral(detail.pricePerDealUnit * detail.deliveredQuantity).format('0,000.00'),
                    });

                    totalPrice += detail.pricePerDealUnit * detail.deliveredQuantity;
                }
            }

            this.data.totalPrice = numeral(totalPrice).format('0,000.00');
            this.data.details = details;
        }
        else {
            Object.assign(this.data, {
                no: undefined,
                date: undefined,
                supplierName: undefined,
                division: undefined,
                totalPrice: undefined,
                currency: undefined,
                details: []
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
