import {bindable} from 'aurelia-framework'
var PurchaseOrderExternalLoader = require('../../../../loader/purchase-order-external-loader');

export class DeliveryOrderItem {

    @bindable purchaseOrderExternal;

    activate(context) {
        this.context = context;
        this.item = context.data;
        this.error = context.error;
        this.options = context.options;
        if (Object.getOwnPropertyNames(this.item.purchaseOrderExternal).length > 0) {
            this.purchaseOrderExternal = this.item.purchaseOrderExternal;
        }
        this.isShowing = false;
        this.filter = context.context.options || {};
    }

    fulfillmentColumns = [
        { header: "Nomor PR", value: "purchaseOrder.purchaseRequest" },
        { header: "Barang", value: "product" },
        { header: "Dipesan", value: "purchaseOrderQuantity" },
        { header: "Satuan", value: "product.uom" },
        { header: "Diterima", value: "deliveredQuantity" },
        { header: "Keterangan", value: "remark" },
    ];

    controlOptions = {
        control: {
            length: 12
        }
    };

    purchaseOrderExternalChanged(newValue, oldValue) {
        if (newValue) {
            if (newValue._id) {

                console.log(this.purchaseOrderExternal);
                Object.assign(this.item.purchaseOrderExternal, newValue);
                this.item.purchaseOrderExternalId = this.item.purchaseOrderExternal._id;

                var doFulfillments = this.item.fulfillments || [];
                var poExternal = this.item.purchaseOrderExternal || {};
                var poCollection = poExternal.items || [];
                var fulfillments = [];

                for (var purchaseOrder of poCollection) {
                    for (var poItem of purchaseOrder.items) {
                        if ((poItem.dealQuantity - poItem.realizationQuantity) > 0) {
                            var fulfillment = {
                                purchaseOrderId: purchaseOrder._id,
                                purchaseOrder: purchaseOrder,
                                productId: poItem.product._id,
                                product: poItem.product,
                                purchaseOrderQuantity: poItem.dealQuantity,
                                purchaseOrderUom: poItem.dealUom,
                                remainingQuantity: poItem.dealQuantity - poItem.realizationQuantity,
                                deliveredQuantity: (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poItem.dealQuantity - poItem.realizationQuantity),
                                remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
                            };
                            fulfillments.push(fulfillment);
                        }
                    }
                }
                this.item.fulfillments = doFulfillments.length > 0 ? doFulfillments : fulfillments;

                if (doFulfillments.length > 0) {
                    if (!this.options.readOnly) {
                        for (var fulfillment of doFulfillments) {
                            var poItem = fulfillment.purchaseOrder.items.find((_poItem) => _poItem.product._id.toString() === fulfillment.product._id.toString());
                            var qty = 0;
                            if (poItem) {
                                qty = poItem.fulfillments
                                    .map((fulfillment) => fulfillment.deliveryOrderDeliveredQuantity)
                                    .reduce((prev, curr, index) => {
                                        if (index === (poItem.fulfillments.length - 1)) {
                                            return prev + 0
                                        } else {
                                            return prev + curr
                                        }
                                    }, 0);
                            }
                            fulfillment.remainingQuantity = poItem.dealQuantity - qty;
                        }
                    } else {
                        for (var fulfillment of doFulfillments) {
                            for (poItem of fulfillment.purchaseOrder.items) {
                                if (poItem.product._id.toString() === fulfillment.product._id.toString()) {
                                    fulfillment.remainingQuantity = poItem.dealQuantity - poItem.realizationQuantity;
                                    break;
                                }
                            }
                        }
                    }
                    this.item.fulfillments = doFulfillments;
                } else {
                    this.item.fulfillments = fulfillments;
                }
                this.isShowing = true;
            }
        }
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    get purchaseOrderExternalLoader() {
        return PurchaseOrderExternalLoader;
    }

    onItemClicked(step, event) {
        if (this.context.context.selectedItem) {
            this.context.context.selectedItem.tdItem.removeAttribute("class");
            if (this.context.context.selectedItem.tdButton)
                this.context.context.selectedItem.tdButton.removeAttribute("class");
        }

        var index = this.context.context.items.indexOf(this.context);
        if (this.context.context.items) {
            for (var stepItem of this.context.context.items) {
                stepItem.data.selectedIndex = index;
            }
        }

        this.tdItem.setAttribute("class", "active");
        if (this.tdButton)
            this.tdButton.setAttribute("class", "active");

        this.context.context.selectedItem = { data: step, index: index, tdItem: this.tdItem, tdButton: this.tdButton };
        console.log("item clicked");
        console.log(this.context);
    }

    get isItemSelected() {
        return this.context.context.selectedItem && this.context.context.selectedItem.data === this.item;
    }

}
