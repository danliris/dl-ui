import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
import { Dialog } from '../../../../../au-components/dialog/dialog';
import { FabricGradeTestEditor } from './dialogs/fabric-grade-test-editor';

@containerless()
@inject(Service, Dialog, BindingSignaler, BindingEngine)
export class DataForm {
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    };
    layoutOptions2 = {
        label: {
            length: 6

        },
        control: {
            length: 6
        }
    }
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    kanbanFields = ["code", "cart", "productionOrder"];
    pointSystemOptions = [4, 10]
    shiftOptions = [
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"]

    constructor(service, dialog, bindingSignaler, bindingEngine) {
        this.service = service;
        this.dialog = dialog;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.colChanged = this.colChanged.bind(this);
    }

    async bind(context) {
        this.context = context;
        this.context._this = this;
        // this.data = this.context.data;
        // this.error = this.context.error;
        this.data.fabricGradeTests = this.data.fabricGradeTests || [];
        this.data.pointSystem = this.data.pointSystem || 10;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;


        this.selectedPointSystem = this.data.pointSystem;
        this.selectedFabricGradeTest = this.data.fabricGradeTests.length > 0 ? this.data.fabricGradeTests[0] : null;


        var kanbanId = this.data.kanbanId;
        // var kanbanId = "58c8f8287b915900364dd2b0";
        if (kanbanId) {
            this.selectedKanban = await this.service.getKanbanById(kanbanId, this.kanbanFields);
        }
        console.log(this.selectedKanban);
    }
    errorChanged() {
        if (this.error && this.error.fabricGradeTests) {
            var index = this.data.fabricGradeTests.indexOf(this.selectedFabricGradeTest);
            this.selectedFabricGradeTestError = this.error.fabricGradeTests[index];
        }
    }
    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() !== '';
    }

    @computedFrom("selectedKanban.productionOrder.material", "selectedKanban.productionOrder.materialConstruction", "selectedKanban.productionOrder.materialWidth")
    get construction() {
        if (!this.selectedKanban)
            return "-";
        return `${this.selectedKanban.productionOrder.material.name} / ${this.selectedKanban.productionOrder.materialConstruction.name} / ${this.selectedKanban.productionOrder.materialWidth}`
    }

    @computedFrom("selectedKanban.productionOrder.orderNo")
    get sppNo() {
        if (!this.selectedKanban)
            return "-";
        return `${this.selectedKanban.productionOrder.orderNo}`
    }

    @computedFrom("selectedKanban.productionOrder.orderQuantity", "selectedKanban.productionOrder.uom.unit")
    get orderQuantity() {
        if (!this.selectedKanban)
            return "-";
        return `${this.selectedKanban.productionOrder.orderQuantity} ${this.selectedKanban.productionOrder.uom.unit}`
    }

    @computedFrom("selectedKanban.productionOrder.packingInstruction")
    get packingInstruction() {
        if (!this.selectedKanban)
            return "-";
        return `${this.selectedKanban.productionOrder.packingInstruction}`
    }

    @computedFrom("data.pointSystem")
    get criteriaColumns() {
        if (this.data.pointSystem === 10)
            return ["Point", "1", "3", "5", "10"];
        else
            return ["Point", "1", "2", "3", "4"];
    }

    @computedFrom("selectedPointSystem")
    get fabricGradeTestMultiplier() {
        if (this.data.pointSystem === 10)
            return { A: 1, B: 3, C: 5, D: 10 };
        else
            return { A: 1, B: 2, C: 3, D: 4 };
    }

    scoreGrade(finalScore) {

        if (this.data.pointSystem === 10) {
            if (finalScore >= 2.71)
                return "BS";
            else if (finalScore >= 1.31)
                return "C";
            else if (finalScore >= 0.91)
                return "B";
            else
                return "A";
        }
        else
            return "-";
    }


    @bindable selectedPcsNo;
    @bindable selectedPcsLength;
    @bindable selectedPcsWidth;
    @bindable selectedFabricGradeTest;
    @bindable selectedFabricGradeTestError;
    @bindable selectedPointSystem;
    @bindable selectedAvalLength;
    @bindable selectedSampleLength;
    @bindable subs;
    selectedAvalLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.avalLength = this.selectedAvalLength;
        this.computeGrade(this.selectedFabricGradeTest);
    }
    selectedSampleLengthChanged() {
        if (!this.selectedFabricGradeTest)
            return;
        this.selectedFabricGradeTest.sampleLength = this.selectedSampleLength;
        this.computeGrade(this.selectedFabricGradeTest);
    }
    selectedPointSystemChanged() {
        this.data.pointSystem = this.selectedPointSystem;
        this.data.fabricGradeTests.forEach(fabricGradeTest => this.computeGrade(fabricGradeTest));
    }

    selectedFabricGradeTestChanged() {
        if (this.selectedFabricGradeTest) {
            if (this.subs) {
                this.subs.forEach(rowSub => rowSub.forEach(colSub => colSub.dispose()));
            }
            this.selectedPcsNo = this.selectedFabricGradeTest.pcsNo;
            this.selectedPcsLength = this.selectedFabricGradeTest.initLength;
            this.selectedPcsWidth = this.selectedFabricGradeTest.width;

            this.selectedAvalLength = this.selectedFabricGradeTest.avalLength;
            this.selectedSampleLength = this.selectedFabricGradeTest.sampleLength;

            this.subs = [];

            if (this.error && this.error.fabricGradeTests) {
                var index = this.data.fabricGradeTests.indexOf(this.selectedFabricGradeTest);
                this.selectedFabricGradeTestError = this.error.fabricGradeTests[index];
            }
            if (this.selectedFabricGradeTest.criteria)
                this.selectedFabricGradeTest.criteria.forEach(criterion => {
                    var rowSubs = [];
                    for (var col of Object.getOwnPropertyNames(criterion.score)) {
                        if (typeof criterion[col] === "object")
                            continue;
                        var colSub = this.bindingEngine.propertyObserver(criterion.score, col).subscribe(this.colChanged);
                        rowSubs.push(colSub);
                    }
                    this.subs.push(rowSubs);
                })
        }
    }
    computeGrade(fabricGradeTest) {
        if (!fabricGradeTest)
            return;
        var multiplier = this.fabricGradeTestMultiplier;
        var score = fabricGradeTest.criteria.reduce((p, c, i) => { return p + ((c.score.A * multiplier.A) + (c.score.B * multiplier.B) + (c.score.C * multiplier.C) + (c.score.D * multiplier.D)) }, 0);
        var finalLength = fabricGradeTest.initLength - fabricGradeTest.avalLength - fabricGradeTest.sampleLength;
        var finalScore = finalLength > 0 ? score / finalLength : 0;
        var grade = this.scoreGrade(finalScore);
        fabricGradeTest.score = score;
        fabricGradeTest.finalLength = finalLength;
        fabricGradeTest.finalScore = finalScore;
        fabricGradeTest.grade = grade;
        console.log(fabricGradeTest)
    }
    colChanged(newValue, oldValue) {
        if (!this.selectedFabricGradeTest)
            return;
        this.computeGrade(this.selectedFabricGradeTest);
    }
    selectedPcsNoChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.pcsNo = this.selectedPcsNo;
            this.fabricGradeTestTable.refresh();
        }
    }
    selectedPcsLengthChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.initLength = this.selectedPcsLength;
            this.computeGrade(this.selectedFabricGradeTest);
            this.fabricGradeTestTable.refresh();
        }
    }
    selectedPcsWidthChanged() {
        if (this.selectedFabricGradeTest) {
            this.selectedFabricGradeTest.width = this.selectedPcsWidth;
            this.fabricGradeTestTable.refresh();
        }
    }

    fabricGradeTestColumns = [
        { field: "pcsNo", title: "No Pcs" },
        { field: "initLength", title: "Panjang (Meter)" },
        { field: "width", title: "Lebar (Meter)" },
        { field: "grade", title: "Grade" }
    ];
    fabricGradeTestContextMenu = ["Hapus"];
    fabricGradeTestTable;

    __fabricGradeTestContextMenuCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Hapus":
                this.data.fabricGradeTests.splice(this.data.fabricGradeTests.indexOf(data), 1);
                this.selectedFabricGradeTest = this.data.fabricGradeTests[0];
                this.fabricGradeTestTable.refresh();
                break;
        }
    }
    __fabricGradeTestCreateCallback() {
        if (!this.selectedKanban) {
            this.error = this.error || {};
            this.error.kanbanId = "Harap isi kanban";
        }
        else {
            this.error = this.error || {};
            this.error.kanbanId = null;
            this.__fabricGradeTestShowEditorDialog();
        }
    }

    __fabricGradeTestShowEditorDialog() {
        if (this.selectedKanban)
            this.dialog.show(FabricGradeTestEditor)
                .then(response => {
                    if (!response.wasCancelled) {
                        this.selectedFabricGradeTest = new FabricGradeTest(this.selectedKanban.productionOrder.orderType.name);

                        this.selectedFabricGradeTest.pcsNo = response.output.pcsNo;
                        this.selectedFabricGradeTest.initLength = response.output.pcsLength;
                        this.selectedFabricGradeTest.width = response.output.pcsWidth;

                        this.data.fabricGradeTests.push(this.selectedFabricGradeTest);

                        this.data.fabricGradeTests.forEach(fabricGradeTest => this.computeGrade(fabricGradeTest));
                        this.fabricGradeTestTable.refresh();
                    }
                });
    }
    __fabricGradeTestRowClickCallback(event) {
        var data = event.detail;
        this.selectedFabricGradeTest = data;
        this.signaler.signal("u")
    }

    fabricGradeTestLoader = (info) => {
        var count = this.data.fabricGradeTests.count
        var data = this.data.fabricGradeTests;
        return {
            total: count,
            data: data
        };
    };



    @bindable selectedKanban;
    selectedKanbanChanged(newValue, oldValue) {
        if (this.selectedKanban && this.selectedKanban._id)
            this.data.kanbanId = this.selectedKanban._id;
        else
            this.data.kanbanId = null;
    }

    kanbanTextFormatter = (kanban) => {
        return `${kanban.code} / ${kanban.cart.cartNumber}`
    }

    get kanbanLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.kanbanFields };
            return this.service.searchKanban(info)
                .then(result => {
                    return result.data;
                });
        }
    }
    console() {
        console.log(this.data);
    }
}


class FabricGradeTest {
    constructor(type) {
        this.type = type || "PRINTING";
        this.pcsNo = 'PCSNO';
        this.grade = '';
        this.width = 0;

        this.initLength = 0;
        this.avalLength = 0;
        this.sampleLength = 0;
        this.finalLength = 0;

        this.fabricGradeTest = 0;
        this.finalGradeTest = 0;

        this.fabricGradeTest = 0;

        this.criteria = [].concat(generalCriteria(), this.type === "PRINTING" ? printingCriteria() : finishingCriteria());
    }
}



class FabricTestCriterion {
    constructor(group, code, name, score) {
        this.code = code || "";
        this.group = group || "";
        this.name = name || "";
        this.score = score || {
            A: 0,
            B: 0,
            C: 0,
            D: 0
        };
    }
}
var generalCriteria = () => [
    new FabricTestCriterion("BENANG", "B001", "Slubs"),
    new FabricTestCriterion("BENANG", "B002", "Neps"),
    new FabricTestCriterion("BENANG", "B003", "Kontaminasi Fiber"),
    new FabricTestCriterion("WEAVING", "W001", "Pakan Renggang"),
    new FabricTestCriterion("WEAVING", "W002", "Pakan Rapat"),
    new FabricTestCriterion("WEAVING", "W003", "Pakan Double"),
    new FabricTestCriterion("WEAVING", "W004", "Pakan Tebal Tipis"),
    new FabricTestCriterion("WEAVING", "W005", "Lusi Tebal Tipis"),
    new FabricTestCriterion("WEAVING", "W006", "Lusi Putus"),
    new FabricTestCriterion("WEAVING", "W007", "Lusi Double"),
    new FabricTestCriterion("WEAVING", "W008", "Madal Sumbi"),
    new FabricTestCriterion("WEAVING", "W009", "Salah Anyam / UP"),
    new FabricTestCriterion("WEAVING", "W010", "Reed Mark"),
    new FabricTestCriterion("WEAVING", "W011", "Temple Mark"),
    new FabricTestCriterion("WEAVING", "W012", "Snarl"),
    new FabricTestCriterion("PRODUKSI", "P001", "Sobek Tepi"),
    new FabricTestCriterion("PRODUKSI", "P002", "Kusut Mati"),
    new FabricTestCriterion("PRODUKSI", "P003", "Kusut / Krismak"),
    new FabricTestCriterion("PRODUKSI", "P004", "Belang Kondensat"),
    new FabricTestCriterion("PRODUKSI", "P005", "Belang Absorbsi"),
    new FabricTestCriterion("PRODUKSI", "P006", "Flek Minyak / Dyest"),
    new FabricTestCriterion("PRODUKSI", "P007", "Flek Oil Jarum"),
    new FabricTestCriterion("PRODUKSI", "P008", "Bintik Htm, Mrh, Biru"),
    new FabricTestCriterion("PRODUKSI", "P009", "Tepi Melipat"),
    new FabricTestCriterion("PRODUKSI", "P010", "Lebar Tak Sama"),
    new FabricTestCriterion("PRODUKSI", "P011", "Lubang / Pin Hole"),
    new FabricTestCriterion("PRODUKSI", "P012", "Bowing"),
    new FabricTestCriterion("PRODUKSI", "P013", "Skewing"),
];

var printingCriteria = () => [
    new FabricTestCriterion("PRODUKSI", "P201", "Meleset"),
    new FabricTestCriterion("PRODUKSI", "P202", "Flek"),
    new FabricTestCriterion("PRODUKSI", "P203", "Print Kosong / Bundas"),
    new FabricTestCriterion("PRODUKSI", "P204", "Nyetrip")
];

var finishingCriteria = () => [
    new FabricTestCriterion("PRODUKSI", "P101", "Kotor Tanah / Debu"),
    new FabricTestCriterion("PRODUKSI", "P102", "Kotor Hitam"),
    new FabricTestCriterion("PRODUKSI", "P103", "Belang Kusut")
];