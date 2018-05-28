import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

var InstructionLoader = require('../../../../loader/instruction-loader');
var KanbanLoader = require('../../../../loader/kanban-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');

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

    @bindable productionOrder;
    @bindable kanban;

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

        if (this.isReprocess) {
            var self = this;
            this.data.reprocessStatus = true;

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

        this.selectProductionOrder = [
            "_id",
            "material._id", "materialConstruction._id", "yarnMaterial._id",
            'orderNo', 'orderQuantity', 'salesContractNo', 'salesContractId',
            'buyerId', 'buyer.name', 'buyer._id', 'buyer.code', 'processTypeId', 'processType.code',
            'processType.orderTypeId', 'processType.orderType.code',
            'processType.orderType.name', 'processType.name',
            'materialId', 'material.code', 'material.name',
            'materialConstructionId', 'materialConstruction.code',
            'materialConstruction.name', 'yarnMaterialId', 'materialWidth',
            'yarnMaterial.code', 'yarnMaterial.name', 'handlingStandard',
            'finishWidth', 'orderType.name', 'orderType.code', 'orderTypeId',
            'details.code','details.colorRequest', 'details.colorTemplate',
            'details.colorType.code', 'details.colorType.name', 'details.colorType._id',
            'details.quantity', 'details.uom', 'details.uomId', 'uom.unit', 'deliveryDate'
        ];

        this.selectInstruction = [
            'code', 'name', 'steps._id', 'steps.process',
            'steps.stepIndicators.name', 'steps.stepIndicators.value',
            'steps.stepIndicators.uom', 'steps.alias', 'steps.processArea'
        ];

        this.selectKanban = [
            "productionOrder._id", 'productionOrder.buyer', 'productionOrder.deliveryDate',
            "productionOrder.materialConstruction._id", "productionOrder.yarnMaterial._id",
            '_id', 'code', 'productionOrderId', 'productionOrder.orderNo',
            'productionOrder.orderQuantity', 'productionOrder.salesContractNo',
            'productionOrder.salesContractId', 'productionOrder.buyerId',
            'productionOrder.buyer.name', 'productionOrder.processTypeId',
            "productionOrder.material._id", 'productionOrder.materialWidth',
            'productionOrder.processType.code', 'productionOrder.processType.orderTypeId',
            'productionOrder.processType.orderType.code', 'productionOrder.processType.orderType.name',
            'productionOrder.processType.name', 'productionOrder.materialId', 'productionOrder.material.code',
            'productionOrder.material.name', 'productionOrder.materialConstructionId',
            'productionOrder.materialConstruction.code', 'productionOrder.materialConstruction.name',
            'productionOrder.yarnMaterialId', 'productionOrder.yarnMaterial.code',
            'productionOrder.yarnMaterial.name', 'productionOrder.handlingStandard',
            'productionOrder.finishWidth', 'selectedProductionOrderDetail.code',
            'selectedProductionOrderDetail.colorRequest', 'selectedProductionOrderDetail.colorTemplate',
            'selectedProductionOrderDetail.colorTypeId', 'selectedProductionOrderDetail.quantity',
            'cart.cartNumber', 'cart.qty', 'cart.uomId', 'cart.uom.unit', 'cart.pcs',
            'instructionId', 'instruction.code', 'instruction.name', 'instruction.steps._id',
            'instruction.steps.process', 'instruction.steps.stepIndicators.name', 'instruction.steps.stepIndicators.value',
            'instruction.steps.stepIndicators.uom', 'instruction.steps.machine._id',
            'instruction.steps.machine.code', 'instruction.steps.machine.name',
            'instruction.steps.machine.monthlyCapacity', 'instruction.steps.processArea',
            'instruction.steps.alias', 'instruction.steps.deadline', 'instruction.steps.processArea',
            'instruction.steps.selectedIndex', 'instruction.steps.isNotDone',
            'grade', 'isComplete', 'currentStepIndex', 'currentQty', 'goodOutput',
            'badOutput', 'oldKanbanId', 'oldKanban.cart.cartNumber', 'isBadOutput',
            'isReproses', 'isInactive', 'productionOrder.orderType.name', 'productionOrder.orderType.code', 'productionOrder.orderTypeId',
            'productionOrder.details', 'productionOrder.uom', 'productionOrder.uomId',
        ];
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
            { header: "Area", value: "proccessArea" },
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

            if (this.isReprocess || this.oldKanbanStatus)
                this.data.currentIndex--;
        }.bind(this)
    };

    kanbanChanged(newValue, oldValue) {
        var kanban = newValue;

        if (kanban) {
            Object.assign(this.data, kanban);

            this.data.reprocessSteps = {
                "LanjutProses": [],
                "Reproses": []
            };

            for (var i = this.data.currentStepIndex; i < this.data.instruction.steps.length; i++) {
                this.data.reprocessSteps.LanjutProses.push(this.data.instruction.steps[i]);
            }

            this.data.reprocess = !this.data.reprocessStatus ? this.data.SEBAGIAN : true;
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

            this.instruction = this.data.instruction;

            this.service.getDurationEstimation(this.data.productionOrder.processType.code, ["areas"])
                .then((result) => {
                    if (result.data.length > 0) {
                        this.data.durationEstimation = result.data[0];
                    }
                    else {
                        delete this.data.durationEstimation;
                    }

                    this.generateDeadlineReprocess();
                });
        }
        else {
            delete this.data.durationEstimation;
        }
    }

    async productionOrderChanged(newValue, oldValue) {
        this.productionOrderDetails = [];

        var productionOrder = newValue;
        if (productionOrder) {
            this.data.productionOrder = productionOrder;
            this.productionOrderDetails = [];

            for (var detail of productionOrder.details) {
                this.productionOrderDetails.push(detail);
            }

            this._mapProductionOrderDetail();
            this.data.selectedProductionOrderDetail = {};
            this.data.selectedProductionOrderDetail = {
                code: this.productionOrderDetails[0].code,
                colorRequest: this.productionOrderDetails[0].colorRequest,
                colorTemplate: this.productionOrderDetails[0].colorTemplate,
                colorTypeId: this.productionOrderDetails[0].colorTypeId,
                quantity: this.productionOrderDetails[0].quantity,
            };

            for (var cart of this.data.carts) {
                cart.uom = "MTR";
            }

            this.service.getDurationEstimation(this.data.productionOrder.processType.code, ["areas"])
                .then((result) => {
                    if (result.data.length > 0) {
                        this.data.durationEstimation = result.data[0];
                    }
                    else {
                        delete this.data.durationEstimation;
                    }

                    this.generateDeadline();
                });
        }
        else {
            for (var cart of this.data.carts) {
                cart.uom = '';
            }
            delete this.data.productionOrder;
            delete this.data.productionOrderId;
            delete this.data.selectedProductionOrderDetail;
            delete this.data.durationEstimation;
        }
    }

    @computedFrom("data.productionOrder")
    get hasProductionOrder() {
        return this.data.productionOrder;
    }

    get hasProductionOrderDetails() {
        return this.productionOrderDetails.length > 0;
    }

    get hasColor() {
        return this.data.selectedProductionOrderDetail;
    }

    @computedFrom("data.instruction")
    get hasInstruction() {
        return this.data.instruction ? this.data.instruction.steps.length > 0 : false;
    }

    get instructionLoader() {
        return InstructionLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
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
            this.currentReprocess = undefined;
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

    instructionChanged(newValue, oldValue) {
        this.data.instruction = newValue;

        if(!this.isReprocess)
            this.generateDeadline();
    }

    changeInstruction(reprocess) {
        if (reprocess != this.currentReprocess) {
            this.options.reprocessStepsHide = false;
            this.options.disabledStepAdd = false;
            this.data.instruction.steps = this.data.reprocessSteps.Reproses;

            if (reprocess === this.data.LANJUT_PROSES) {
                setTimeout(() => {
                    this.options.disabledStepAdd = true;
                    this.data.instruction.steps = this.data.reprocessSteps.LanjutProses;
                }, 1);
            }

            this.currentReprocess = reprocess;
        }
    }

    generateDeadline() {
        if (this.hasInstruction && this.hasProductionOrder) {
            if (this.data.durationEstimation) {
                var deliveryDate = this.data.productionOrder.deliveryDate;

                this.data.instruction.steps = this.data.instruction.steps.map((step) => {
                    if (step.processArea && step.processArea != "") {
                        var d = new Date(deliveryDate);
                        var totalDay = 0;

                        for (var i = this.data.durationEstimation.areas.length - 1; i >= 0; i--) {
                            var area = this.data.durationEstimation.areas[i];
                            totalDay += area.duration;

                            if (area.name == step.processArea.toUpperCase().replace("AREA ", ""))
                                break;
                        }

                        d.setDate(d.getDate() - totalDay + 1);

                        step.deadline = new Date(d);
                    }

                    return step;
                });
            }
            else {
                this.data.instruction.steps = this.data.instruction.steps.map((step) => {
                    step.deadline = null;
                    return step;
                });
            }
        }
    }

    generateDeadlineReprocess() {
        if (this.data.durationEstimation) {
            var deliveryDate = this.data.productionOrder.deliveryDate;

            this.data.instruction.steps = this.data.instruction.steps.map((step) => {
                if (step.processArea && step.processArea != "" && !step.deadline) {
                    var d = new Date(deliveryDate);
                    var totalDay = 0;

                    for (var i = this.data.durationEstimation.areas.length - 1; i >= 0; i--) {
                        var area = this.data.durationEstimation.areas[i];
                        totalDay += area.duration;

                        if (area.name == step.processArea.toUpperCase().replace("AREA ", ""))
                            break;
                    }

                    d.setDate(d.getDate() - totalDay + 1);

                    step.deadline = new Date(d);
                }

                return step;
            });
        }
    }
}
