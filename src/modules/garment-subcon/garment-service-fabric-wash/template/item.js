import { inject, bindable, computedFrom } from 'aurelia-framework';
import { item } from '../../../garment-shipping/payment-disposition-recap/template/item';
import { Service, PurchasingService } from "../service";
var moment = require("moment");

const UENLoader = require('../../../../loader/garment-unit-expenditure-note-loader');

@inject(Service, PurchasingService)
export class Item {
    @bindable selectedUEN;

    constructor(service, purchasingService) {
        this.service = service;
        this.purchasingService = purchasingService;
    }

    get UENFilter() {
        var UENFilter = {};
        return UENFilter = {
            ExpenditureType: "SUBCON"
        };
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = context.context.options;
        if (this.data) {
            this.selectedUEN = {
                UENNo: this.data.UnitExpenditureNo
            }
        }
        this.isShowing = true;
        if (this.data.Details) {
            if (this.data.Details.length > 0) {
                this.isShowing = true;
            }
        }
    }
    itemsColumnsCreate = [
        "Kode Barang",
        "Nama Barang",
        "Keterangan Barang",
        "Design/Color",
        "Jumlah",
        "Satuan"
    ];

    itemsColumns = [
        "Kode Barang",
        "Nama Barang",
        "Keterangan Barang",
        "Design/Color",
        "Jumlah",
        "Satuan"
    ];

    uenView = (uen) => {
        return `${uen.UENNo}`
    }

    get uenLoader() {
        return UENLoader;
    }

    async selectedUENChanged(newValue, oldValue) {
        if (this.isCreate) {
            if (newValue) {
                if (this.data.Details.length > 0) {
                    this.data.Details.splice(0);
                }
                this.data.UnitExpenditureNo = newValue.UENNo;
                this.data.UnitSender = {
                    Id: newValue.UnitSenderId,
                    Code: newValue.UnitSenderCode,
                    Name: newValue.UnitSenderName

                };

                this.data.UnitRequest = {
                    Id: newValue.UnitRequestId,
                    Code: newValue.UnitRequestCode,
                    Name: newValue.UnitRequestName

                };

                this.data.ExpenditureDate = moment(newValue.ExpenditureDate).format("DD MMM YYYY");
                this.purchasingService.getUnitDeliveryOrderById(newValue.UnitDOId)
                    .then((deliveryOrder) => {
                        var listDesignColor = [];
                        for (var item of deliveryOrder.Items) {
                            listDesignColor.push(item.DesignColor);
                        }

                        var desginColor = listDesignColor.toString();

                        for (var item of newValue.Items) {
                            var detail = {};
                            detail.Product = {
                                Id: item.ProductId,
                                Name: item.ProductName,
                                Code: item.ProductCode,
                                Remark: item.ProductRemark
                            }

                            detail.DesignColor = desginColor;
                            detail.Quantity = item.Quantity;
                            detail.Uom = {
                                Id: item.UomId,
                                Unit: item.UomUnit
                            }

                            this.data.Details.push(detail);
                        }
                    });
            }
            else {
                this.context.selectedUENViewModel.editorValue = "";
                this.data.UnitExpenditureNo = null;
                this.data.UnitRequest.Name = null;
                this.data.UnitSender.Code = null;
                this.data.ExpenditureDate = null;
                this.data.Details.splice(0);
            }
        }
    }

}