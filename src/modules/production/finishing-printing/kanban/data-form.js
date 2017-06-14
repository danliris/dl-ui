import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
import {Service} from './service';

var InstructionLoader = require('../../../../loader/instruction-loader');
var KanbanLoader = require('../../../../loader/kanban-loader');

@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable productionOrderDetails = [];
    @bindable instruction;

    @bindable isEdit;
    @bindable isView;
    @bindable isReprocess;

    kereta = "Kereta";
    options = {};

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.element = element;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.carts = this.data.carts || [];

        if (this.data.productionOrder && this.data.productionOrder.details && this.data.productionOrder.details.length > 0) {
            this.productionOrderDetails = this.data.productionOrder.details;
            this._mapProductionOrderDetail();

            if (this.data.countDoneStep == this.data.instruction.steps.length) {
                this.options.disabledStepAdd = true;
            }
        }

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.oldKanbanStatus = this.data.oldKanban && Object.getOwnPropertyNames(this.data.oldKanban).length > 0;

        if (this.isReprocess || this.oldKanbanStatus) {
            this.kereta = "Kereta Baru";
        }

        if(this.isReprocess) {
            var self = this;
            this.data.reprocess = this.data.reprocessStatus = true;

            /* Constant */
            this.data.SEMUA = "Semua";
            this.data.SEBAGIAN = "Sebagian";
            this.data.LANJUT_PROSES = "Lanjut Proses";
            this.data.REPROSES = "Reproses";

            this.query = { "currentStepIndex": { $ne: 0 }, "isComplete": false };
            this.reprocess = [{ label: this.data.SEMUA, value: this.data.SEMUA }, { label: this.data.SEBAGIAN, value: this.data.SEBAGIAN }];
            this.options = { "isReprocess": this.isReprocess, reprocessClick: function (reprocess) { self.changeInstruction(reprocess); } };
            this.cartInfo.columns.splice(0, 0, { header: "", value: "reprocess" });
            this.options.reprocessStepsHide = true;
        }
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    cartInfo = {
        columns: [
            { header: "Nomor Kereta", value: "cartNumber" },
            { header: "Panjang", value: "qty" },
            { header: "Satuan", value: "uom" },
            { header: "Jumlah PCS", value: "pcs" },
        ],
        onAdd: function () {
            this.data.carts.push({ cartNumber: "", qty: 0, uom: this.data.cart ? this.data.cart.uom ? this.data.cart.uom.unit : 'MTR' : 'MTR', pcs: 0 });
        }.bind(this),
        onRemove: function () {
            
        }.bind(this)
    };

    stepInfo = {
        columns: [
            { header: "No.", value: "index" },
            { header: "Proses", value: "process" },
            { header: "Mesin", value: "machine" },
            { header: "Target Selesai", value: "deadline" }
        ],
        onAdd: function () {
            this.context.StepsCollection.bind();
            this.data.instruction.steps = this.data.instruction.steps || [];
            if (this.isReprocess || this.oldKanbanStatus) {
                this.data.currentIndex++;
                this.data.instruction.steps.splice(this.data.currentIndex, 0, {});
            }
            else
                this.data.instruction.steps.push({});
        }.bind(this),
        onRemove: function () {
            this.context.StepsCollection.bind();

            if(this.isReprocess || this.oldKanbanStatus)
                this.data.currentIndex--;
        }.bind(this)
    };

    kanbanChanged(kanban) {
        kanban = kanban.detail;

        if (kanban) {
            Object.assign(this.data, kanban);

            this.data.reprocessSteps = {
                "LanjutProses": [],
                "Reproses": []
            };

            for (var i = this.data.currentStepIndex; i < this.data.instruction.steps.length; i++) {
                this.data.reprocessSteps.LanjutProses.push(this.data.instruction.steps[i]);
            }

            this.data.reprocessSteps.Reproses = this.data.instruction.steps;

            this.data.oldKanban = kanban;
            this.data.oldKanbanId = kanban._id;

            delete this.data.oldKanban._active;
            delete this.data.oldKanban._type;
            delete this.data.oldKanban._updateAgent;
            delete this.data.oldKanban.updatedBy;
            delete this.data.oldKanban.code;
            delete this.data.oldKanban._version;
            delete this.data.oldKanban._deleted;
            
            delete this.data.cart;
            delete this.data._id;
            delete this.data._active;
            delete this.data._type;
            delete this.data._updateAgent;
            delete this.data.updatedBy;
            delete this.data.code;
            delete this.data._version;
            delete this.data._deleted;

            var currentStepIndex = this.data.currentStepIndex;
            var i = 1;

            this.data.instruction.steps = this.data.instruction.steps.map(function (s) {
                s.isNotDone = i <= currentStepIndex ? false : true;
                i++;
                return s;
            });

            this.data.currentIndex = this.data.currentStepIndex - 1;
        }
    }

    async productionOrderChanged(e) {
        this.productionOrderDetails = [];

        var productionOrder = e.detail;
        if (productionOrder) {
            this.productionOrderDetails = await this.service.getProductionOrderDetails(productionOrder.orderNo);

            if (!this.data.selectedProductionOrderDetail && this.hasProductionOrderDetails) {
                this._mapProductionOrderDetail();
                this.data.selectedProductionOrderDetail = {};
                this.data.selectedProductionOrderDetail = this.productionOrderDetails[0];
            }

            for (var cart of this.data.carts) {
                cart.uom = "MTR";
            }
        }
        else {
            for (var cart of this.data.carts) {
                cart.uom = '';
            }
            delete this.data.productionOrder;
            delete this.data.productionOrderId;
            delete this.data.selectedProductionOrderDetail;
        }
    }

    get hasProductionOrder() {
        return this.data.productionOrder;
    }

    get hasProductionOrderDetails() {
        return this.productionOrderDetails.length > 0;
    }

    get hasColor() {
        return this.data.selectedProductionOrderDetail;
    }

    get hasInstruction() {
        return this.data.instruction;
    }

    get instructionLoader() {
        return InstructionLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    kanbanView(kanban) {
        if (kanban.productionOrder) {
            return `${kanban.productionOrder.orderNo} - ${kanban.cart.cartNumber}`;
        }

        else
            return '';
    }

    _mapProductionOrderDetail() {
        this.productionOrderDetails.map(detail => {
            detail.toString = function () {
                return `${this.colorRequest}`;
            }
            return detail;
        });
    }

    moveItemUp(event) {
        var steps = this.data.instruction.steps;
        if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex > 0 && (this.isReprocess || this.oldKanbanStatus ? !steps[steps[0].selectedIndex].isNotDone : true)) {
            var selectedSteps = steps.splice(steps[0].selectedIndex, 1);
            steps.splice(steps[0].selectedIndex - 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].selectedIndex - 1);
        }
    }

    moveItemDown(event) {
        var steps = this.data.instruction.steps;
        var stepDoneLength = (this.isReprocess ? this.data.reprocessSteps.LanjutProses.length : this.oldKanbanStatus ? this.data.countDoneStep : 0);
        if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex < steps.length - 1 - stepDoneLength) {
            var selectedSteps = steps.splice(steps[0].selectedIndex, 1);
            steps.splice(steps[0].selectedIndex + 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].selectedIndex + 1);
        }
    }

    setCurrentIndex(currentIndex) {
        for (var step of this.data.instruction.steps) {
            step.selectedIndex = currentIndex;
        }
    }

    reprocessChanged(e) {
        if (e.detail) {
            this.data.reprocessStatus = false;

            if (e.detail == this.data.SEBAGIAN) {
                this.data.carts = [{ reprocess: this.data.LANJUT_PROSES, cartNumber: "", qty: 0, uom: 'MTR', pcs: 0 }, { reprocess: this.data.REPROSES, cartNumber: "", qty: 0, uom: 'MTR', pcs: 0 }];
                this.options.reprocessSome = true;
                this.options.reprocessStepsHide = true;
            }
            else {
                this.data.carts = [{ cartNumber: "", qty: 0, uom: 'MTR', pcs: 0 }];
                this.options.reprocessSome = false;
                this.options.reprocessStepsHide = false;
                this.data.instruction.steps = this.data.reprocessSteps.Reproses;
            }
        }
    }

    changeInstruction(reprocess) {
        if(reprocess != this.currentReprocess) {
            this.options.reprocessStepsHide = false;
            this.options.disabledStepAdd = false;
            this.data.instruction.steps = this.data.reprocessSteps.Reproses;

            if (reprocess === this.data.LANJUT_PROSES) {
                setTimeout(()=> {
                    this.options.disabledStepAdd = true;
                    this.data.instruction.steps = this.data.reprocessSteps.LanjutProses;
                }, 1);   
            }

            this.currentReprocess = reprocess;
        }
    }
}