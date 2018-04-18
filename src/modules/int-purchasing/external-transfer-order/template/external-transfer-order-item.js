import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const ProductLoader = require('../../../../loader/product-loader');
const InternalTransferOrderLoader = require('../../../../loader/internal-transfer-order-loader');

var moment = require('moment');

@inject(Service)
export class ExternalTransferOrderItem {
    @bindable selectedInternalTransferOrder;

    columns = ["Product", "DefaultQuantity", "DefaultUom", "DealQuantity", "DealUom", "Convertion", "Grade", "ProductRemark"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        if (this.data.TransferRequestNo) {
            this.selectedInternalTransferOrder = {
                TRNo: this.data.TransferRequestNo,
                ITONo: this.data.InternalTransferOrderNo
            };

            this.isShowing = this.error && this.error.ExternalTransferOrderDetails && this.error.ExternalTransferOrderDetails.length > 0;
        }
    }

    get internalTransferOrderLoader() {
        return InternalTransferOrderLoader;
    }
    selectedInternalTransferOrderView = (selectedInternalTransferOrder) => {
        return `${selectedInternalTransferOrder.TRNo} - ${selectedInternalTransferOrder.ITONo}`;
    }
    selectedInternalTransferOrderChanged(newValue) {
        if (newValue) {
            this.service.getInternalTransferOrderById(newValue.Id)
                .then(result => {
                    this.data.InternalTransferOrderId = result.Id;
                    this.data.InternalTransferOrderNo = result.ITONo;
                    this.data.TransferRequestId = result.TRId;
                    this.data.TransferRequestNo = result.TRNo;

                    this.data.ExternalTransferOrderDetails = [];
                    for (var detail of result.InternalTransferOrderDetails) {
                        var externalTransferOrderDetail = {
                            InternalTransferOrderDetailId: detail.Id,
                            TransferRequestDetailId: detail.TRDetailId,
                            Product: detail.Product || {
                                _id: detail.ProductId,
                                code: detail.ProductCode,
                                name: detail.ProductName
                            },
                            DefaultQuantity: detail.Quantity,
                            DefaultUom: detail.Uom || {
                                _id: detail.UomId,
                                unit: detail.UomUnit
                            },
                            DealQuantity: detail.Quantity,
                            DealUom: detail.Uom || {
                                _id: detail.UomId,
                                unit: detail.UomUnit
                            },
                            Convertion: 1,
                            Grade: detail.Grade || "-"
                        };
                        this.data.ExternalTransferOrderDetails.push(externalTransferOrderDetail);
                    }

                    this.isShowing = true;
                });
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

}