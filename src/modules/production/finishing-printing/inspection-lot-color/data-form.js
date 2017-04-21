import { bindable, inject, computedFrom } from "aurelia-framework";

var KanbanLoader = require('../../../../loader/kanban-loader');
var moment = require('moment');


export class DataForm {
    @bindable title;
    @bindable readOnly;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        console.log(this.data.kanban);
    }

    @computedFrom("data.kanban.productionOrder.material", "data.kanban.productionOrder.materialConstruction", "data.kanban.productionOrder.yarnMaterial", "data.kanban.productionOrder.materialWidth")
    get construction() {
        if (!this.data.kanban)
            return "-";
        return `${this.data.kanban.productionOrder.material.name} / ${this.data.kanban.productionOrder.materialConstruction.name} / ${this.data.kanban.productionOrder.yarnMaterial.name} / ${this.data.kanban.productionOrder.materialWidth}`
    }

    @computedFrom("data.kanban.productionOrder.orderNo")
    get orderNo() {
        if (!this.data.kanban)
            return "-";
        return `${this.data.kanban.productionOrder.orderNo}`
    }

    @computedFrom("data.kanban.productionOrder.orderQuantity", "data.kanban.productionOrder.uom.unit")
    get orderQuantity() {
        if (!this.data.kanban)
            return "-";
        else{
            var quantity = this.data.kanban.productionOrder.uom.unit === 'MTR' ? this.data.kanban.productionOrder.orderQuantity : (this.data.kanban.productionOrder.orderQuantity * 0.9144);
            return `${quantity} MTR`
        }
    }

    itemsColumns = [
        { header: "No Pcs", value: "pcsNo" },
        { header: "Lot", value: "lot" },
        { header: "Status", value: "status" }
    ]

    get kanbanLoader() {
        return KanbanLoader;
    }

    kanbanChanged(e) {
        if (this.data.kanban && this.data.kanban._id)
            this.data.kanbanId = this.data.kanban._id;
        else
            this.data.kanbanId = null;
    }

    get hasKanban(){
        return this.data && this.data.kanbanId && this.data.kanbanId !== '';
    }

    get addItems() {
      return (event) => {
        this.data.items.push({})
      };
    }

    get removeItem(){
        return (event) => console.log(event);
    }
}