import { bindable } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

export class Item {
    @bindable unitPaymentOrder;

    constructor() {
        this.queryUPO = { position: 1 }; // PURCHASING_DIVISION
        this.selectUPO = [
            'invoceNo', 'division.code', 'division.name',
            'supplier.code', 'supplier.name',
            'currency.code', 'no', 'date', 'dueDate',
            'useVat', 'useIncomeTax', 'vat._id', 'vat.name', 'vat.rate',
            'items.unitReceiptNote.date',
            'items.unitReceiptNote.items.product._id',
            'items.unitReceiptNote.items.product.code',
            'items.unitReceiptNote.items.product.name',
            'items.unitReceiptNote.items.deliveredQuantity',
            'items.unitReceiptNote.items.deliveredUom.unit',
            'items.unitReceiptNote.items.pricePerDealUnit',
            'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
            'items.unitReceiptNote.unit._id', 'items.unitReceiptNote.unit.code', 'items.unitReceiptNote.unit.name',
            'items.unitReceiptNote.items.correction',
        ];

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'UOM', 'Harga'];
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
            let items = [], totalPaid = 0;
            for (let item of newV.items) {
                for (let detail of item.unitReceiptNote.items) {
                    let corrections = detail.correction;
                    let price, quantity;

                    if (corrections && corrections.length !== 0) {
                        if (corrections[corrections.length - 1].correctionRemark === 'Koreksi Jumlah') {
                            let pricePerUnit = corrections[corrections.length - 1].correctionPricePerUnit;
                            let correctionQuantity = detail.deliveredQuantity;

                            for (let correction of corrections.filter(p => p.correctionRemark === 'Koreksi Jumlah')) {
                                correctionQuantity -= correction.correctionQuantity;
                            }

                            price = pricePerUnit * correctionQuantity;
                            quantity = correctionQuantity;
                        }
                        else {
                            price = corrections[corrections.length - 1].correctionPriceTotal;
                            quantity = corrections[corrections.length - 1].correctionQuantity;
                        }
                    }
                    else {
                        price = numeral(detail.pricePerDealUnit * detail.deliveredQuantity).format('0,000.00');
                        quantity = detail.deliveredQuantity;
                    }

                    items.push({
                        productId: detail.product._id,
                        productCode: detail.product.code,
                        productName: detail.product.name,
                        quantity: quantity,
                        uom: detail.deliveredUom.unit,
                        price: price,
                        unitId: item.unitReceiptNote.unit._id,
                        unitCode: item.unitReceiptNote.unit.code,
                        unitName: item.unitReceiptNote.unit.name
                    });

                    totalPaid += price;
                }
            }

            let vat = newV.useIncomeTax ? (totalPaid * 0.1) : 0;

            Object.assign(this.data, {
                id: newV._id,
                no: newV.no,
                date: newV.date,
                dueDate: newV.dueDate,
                invoceNo: newV.invoceNo,
                supplierCode: newV.supplier.code,
                supplierName: newV.supplier.name,
                divisionCode: newV.division.code,
                divisionName: newV.division.name,
                incomeTax: newV.useVat ? ((newV.vat.rate * totalPaid) / 100) : 0,
                vat: vat, /* Dari SPB terbalik (salah) */
                incomeTaxId: newV.vat._id,
                incomeTaxName: newV.vat.name,
                incomeTaxRate: newV.vat.rate,
                totalPaid: totalPaid + vat,
                currency: newV.currency.code,
                items: items,
            });
        }
        else {
            Object.assign(this.data, {
                id: undefined,
                no: undefined,
                date: undefined,
                dueDate: undefined,
                invoceNo: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                divisionCode: undefined,
                divisionName: undefined,
                incomeTax: undefined,
                vat: undefined,
                incomeTaxId: undefined,
                incomeTaxName: undefined,
                incomeTaxRate: undefined,
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
