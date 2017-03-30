import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable isEdit;

    constructor() { }

    activate() { }

    attached() {
    }

    bind() {
        if (this.data && this.data.uom)
            this.data.uom.toString = function () {
                return this.unit;
            };
    }

    stepInfo = {
        columns: [
            { header: "No.", value: "index" },
            { header: "Step", value: "step" },
        ],
        onAdd: function () {
            debugger
            this.data.steps = this.data.steps || [];
            this.data.steps.push({ step: "", stepIndicators: [] });
        }.bind(this),
        onRemove: function () {
            console.log("step removed");
        }.bind(this)
    };

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
            this.data.uomId = selectedUom._id;
    }
    moveItemUp(event) {
        var steps = this.data.steps;
        if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex > 0) {
            var selectedSteps = steps.splice(steps[0].selectedIndex, 1);
            steps.splice(steps[0].selectedIndex - 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].selectedIndex - 1);
        }
    }

    moveItemDown(event) {
        var steps = this.data.steps;
        if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex < steps.length) {
            var selectedSteps = steps.splice(steps[0].selectedIndex, 1);
            steps.splice(steps[0].selectedIndex + 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].selectedIndex + 1);
        }
    }

    setCurrentIndex(currentIndex) {
        for (var step of this.data.steps) {
            step.selectedIndex = currentIndex;
        }
    }

}