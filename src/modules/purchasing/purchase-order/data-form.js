import {inject, bindable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var UnitLoader = require('../../../loader/unit-loader');
var CategoryLoader = require('../../../loader/category-loader');
var PurchaseRequestPostedLoader = require('../../../loader/purchase-request-posted-loader');
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable prReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable purchaseRequest;

    @bindable title;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    itemsColumns = [
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "defaultQuantity" },
        { header: "Satuan", value: "defaultUom" },
        { header: "Keterangan", value: "remark" }
    ]

    get purchaseRequestPostedLoader() {
        return PurchaseRequestPostedLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    purchaseRequestChanged(newValue) {
        this.data.purchaseRequest=newValue;
        if (this.data.purchaseRequest) {
            var _items = [];
            this.data.purchaseRequestId = this.data.purchaseRequest._id;

            this.data.purchaseRequest.unit.toString = function () {
                return [this.division.name, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }

            this.data.purchaseRequest.category.toString = function () {
                return [this.code, this.name]
                    .filter((item, index) => {
                        return item && item.toString().trim().length > 0;
                    }).join(" - ");
            }

            this.data.remark = this.data.purchaseRequest.remark;
            this.data.purchaseRequest.items.map((item) => {
                var _item = {};
                _item.product = item.product;
                _item.defaultUom = item.product.uom;
                _item.defaultQuantity = item.quantity;
                _item.remark = item.remark;
                _items.push(_item);
            })
            this.data.items = _items;

            this.data.items.forEach(item => {
                item.product.toString = function () {
                    return [this.code, this.name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
            })
        }
        else {
            this.data.purchaseRequest = {};
            this.data.purchaseRequestId = {};
            this.data.remark = "";
            this.data.items = [];
        }
    }

} 