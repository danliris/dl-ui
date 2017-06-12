import { bindable, inject, computedFrom } from "aurelia-framework";

var FabricQualityControlLoader = require('../../../../loader/fabric-loader');
var moment = require('moment');


export class DataForm {
    @bindable readOnly = false;
    @bindable fabricQcReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable fabricQc;
    @bindable textFormatter;

    // @bindable hasFabricQc;

    @bindable title;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    itemsColumns = [
        { header: "No Pcs", value: "pcsNo" },
        { header: "Grade Defect", value: "grade" },
        { header: "Lot", value: "lot" },
        { header: "Status", value: "status" }
    ]

    get fabricQcLoader() {
        return FabricQualityControlLoader;
    }

    get orderNo() {
        if (this.data.fabricQc) {
            return `${this.data.fabricQc.productionOrderNo} - ${this.data.fabricQc.cartNo}`;
        }
    }

    get hasFabricQc() {
        return this.data && this.data.fabricQualityControlId && this.data.fabricQualityControlId !== '';
    }

    fabricQcChanged(newValue) {
        this.data.fabricQc = newValue;
        if (this.data.fabricQc) {

            if (this.data.fabricQc.fabricGradeTests) {
                this.data.fabricQc.items = this.data.fabricQc.fabricGradeTests;
            }

            var _items = [];
            this.data.fabricQualityControlId = this.data.fabricQc._id;

            this.data.fabricQc.items.map((item) => {
                var _item = {};
                _item.pcsNo = item.pcsNo;
                _item.grade = item.grade;
                _item.lot = item.lot;
                _item.status = item.status;
                _items.push(_item);
            })
            this.data.items = _items;
        }
        else {
            this.data.packing = {};
            this.data.packingId = {};
            this.data.items = [];
        }
    }
}