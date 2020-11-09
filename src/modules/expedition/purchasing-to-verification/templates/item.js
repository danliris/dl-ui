import { bindable, inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

@inject(Service)
export class Item {
    @bindable unitPaymentOrder;

    constructor(service) {
        this.service = service;
        this.queryUPO = { position: { $in: [1, 6] } }; // PURCHASING_DIVISION

        this.selectUPO = [
            'paymentMethod', 'invoceNo', 'division.code', 'division.name',
            'category.code', 'category.name', 'supplier.code', 'supplier.name',
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
            'items.unitReceiptNote.no',
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

            let unitReceiptsNo = newV.items.map(p => p.unitReceiptNote.no);

            let filter = {
                page: 1,
                size: Number.MAX_SAFE_INTEGER,
                filter: JSON.stringify({ no: { $in: unitReceiptsNo } }),
                select: ['no', 'unit._id', 'unit.code', 'unit.name']
            };

            this.service.getURN(filter)
                .then((response) => {
                    let urn = response.data;

                    for (let item of newV.items) {
                        let urnObj = urn.find(p => p.no === item.unitReceiptNote.no);
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
                                price = Number((detail.pricePerDealUnit * detail.deliveredQuantity).toFixed(4));
                                quantity = detail.deliveredQuantity;
                            }

                            items.push({
                                productId: detail.product._id,
                                productCode: detail.product.code,
                                productName: detail.product.name,
                                quantity: quantity,
                                uom: detail.deliveredUom.unit,
                                price: price,
                                unitId: urnObj.unit._id,
                                unitCode: urnObj.unit.code,
                                unitName: urnObj.unit.name
                            });

                            totalPaid += price;
                        }
                    }

                    let vat = newV.useIncomeTax ? Number((totalPaid * 0.1).toFixed(4)) : 0;
                    let incomeTax = newV.useVat ? Number(((newV.vat.rate * totalPaid) / 100).toFixed(4)) : 0;
                    var totalPaid = totalPaid + vat;
                    if (newV.incomeTaxBy && newV.incomeTaxBy.toUpperCase() == "SUPPLIER")
                        totalPaid = totalPaid - incomeTax;
                    console.log(newV)
                    Object.assign(this.data, {
                        id: newV._id,
                        no: newV.no,
                        date: newV.date,
                        dueDate: newV.dueDate,
                        invoceNo: newV.invoceNo,
                        paymentMethod: newV.paymentMethod,
                        supplierCode: newV.supplier.code,
                        supplierName: newV.supplier.name,
                        categoryCode: newV.category.code,
                        categoryName: newV.category.name,
                        divisionCode: newV.division.code,
                        divisionName: newV.division.name,
                        incomeTax: incomeTax,
                        vat: vat,
                        incomeTaxId: newV.vat._id,
                        incomeTaxName: newV.vat.name,
                        incomeTaxRate: newV.vat.rate,
                        totalPaid: Number((totalPaid + vat).toFixed(4)),
                        currency: newV.currency.code,
                        items: items,
                    });
                });
        }
        else {
            Object.assign(this.data, {
                id: undefined,
                no: undefined,
                date: undefined,
                dueDate: undefined,
                invoceNo: undefined,
                paymentMethod: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                categoryCode: undefined,
                categoryName: undefined,
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
