import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data = {};
    @bindable title;
    @bindable deliveryOrder;
    @bindable correctionType;

    constructor(service) {
        this.service = service;

        this.formOptions = {
            cancelText: "Kembali"
        };

        this.controlOptions = {
            label: {
                length: 4
            },
            control: {
                length: 5
            }
        };

        this.deliveryOrderItem = {
            columns: [
                "Nomor PO Eksternal",
                "Nomor PR",
                "Nomor Ref PR",
                "Nomor RO",
                "Nama Barang",
                "Jumlah Koreksi",
                "Satuan",
                "Harga Satuan",
                "Harga Total"
            ],
            onRemove: function () {
                this.bind();
            }
        };

        this.collectionOptions = {};

        this.itemsTemp = [];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.readOnly) {
            this.deliveryOrderItem.columns.push({ header: "" });
        }
    }

    get garmentDeliveryOrderLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
            };
            return this.service.searchDeliveryOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    deliveryOrderChanged(newValue, oldValue) {
        if (newValue && newValue.Id) {
            this.service.getdeliveryOrderById(newValue.Id)
                .then(deliveryOrder => {
                    this.data.CorrectionType = "Jumlah",

                    this.data.CorrectionDate = new Date(new Date().setHours(0, 0, 0, 0));

                    this.data.DOId = deliveryOrder.Id;
                    this.data.DONo = deliveryOrder.doNo;

                    this.data.Supplier = deliveryOrder.supplier;

                    this.data.Currency = deliveryOrder.docurrency;

                    this.data.UseVat = deliveryOrder.useVat;
                    this.data.UseIncomeTax = deliveryOrder.useIncomeTax;
                    this.data.IncomeTax = deliveryOrder.incomeTax;
                    console.log(this.data.IncomeTax);
                    this.data.IncomeTax.toString = function () {
                        return [this.Name, this.Rate]
                            .filter((item, index) => {
                                return item && item.toString().trim().length > 0;
                            }).join(" - ");
                    }

                    this.data.Items = [];
                    this.itemsTemp = [];
                    for(let item of deliveryOrder.items) {
                        for (let detail of item.fulfillments) {
                            let correctionNoteItem = {};

                            correctionNoteItem.DODetailId = detail.Id;
    
                            correctionNoteItem.EPOId = item.purchaseOrderExternal.Id;
                            correctionNoteItem.EPONo = item.purchaseOrderExternal.no;
    
                            correctionNoteItem.PRId = detail.pRId;
                            correctionNoteItem.PRNo = detail.pRNo;
    
                            correctionNoteItem.POId = detail.pOId;
                            correctionNoteItem.POSerialNumber = detail.poSerialNumber;
                            correctionNoteItem.RONo = detail.rONo;
    
                            correctionNoteItem.Product = detail.product;
    
                            correctionNoteItem.Quantity = parseFloat((detail.quantityCorrection - detail.receiptQuantity).toFixed(2));
    
                            correctionNoteItem.Uom = detail.purchaseOrderUom;
    
                            correctionNoteItem.PricePerDealUnitBefore = parseFloat((detail.pricePerDealUnitCorrection).toFixed(2));
                            correctionNoteItem.PricePerDealUnitAfter = parseFloat((detail.pricePerDealUnitCorrection).toFixed(2));
                            correctionNoteItem.PriceTotalBefore = parseFloat((detail.priceTotalCorrection).toFixed(2));
                            correctionNoteItem.PriceTotalAfter = parseFloat((detail.priceTotalCorrection).toFixed(2));
    
                            this.data.Items.push(correctionNoteItem);
                        }
                    }
                    this.itemsTemp = JSON.parse(JSON.stringify(this.data.Items)); /* Clone Array */
                });
        }
    }

    @computedFrom("data.DOId")
    get hasItems() {
        return this.data.Items ? this.data.Items.length > 0 : false;
    }
}
