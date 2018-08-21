import { bindable } from 'aurelia-framework'
var StepLoader = require('../../../../../loader/step-loader');
var MachineLoader = require('../../../../../loader/machine-azure-loader');

export class StepItem {

  @bindable temp;

  activate(context) {
    // console.log(context);
    this.context = context;
    this.step = context.data;
    this.error = context.error;
    this.options = context.options;
    this.temp = Object.getOwnPropertyNames(this.step).length > 0 ? this.step : null;
    this.isShowing = false;
    this.options.disabledStepAdd = (context.context.options.disabledStepAdd) ? true : false;
    this.options.isNotDone = !this.step.isNotDone;
  }
  bind() {
    this.tdDeadline.addEventListener("click", (event) => {
      this.onItemClicked(this.step, undefined);
    });

    this.selectStep = [
      '_id', 'process',
      'stepIndicators.name', 'stepIndicators.value',
      'stepIndicators.uom', 'alias'
    ];

    this.selectMachine = [
      '_id', 'code', 'name', 'monthlyCapacity'
    ];
  }
  stepIndicatorColumns = [
    { header: "Indikator", value: "name" },
    { header: "Nilai", value: "value" },
    { header: "Satuan", value: "uom" },
  ];

  controlOptions = {
    control: {
      length: 12
    }
  };

  areaOptions = ["", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"];

  query = {};

  tempChanged(newValue, oldValue) {
    if (!newValue) {
      Object.assign(this.context.data, { process: "", stepIndicators: [] });
    }
    else {
      Object.assign(this.context.data, newValue);
    }

    this.machineVM.editorValue = "";
    this.machineVM.valueChanged();
  }

  onItemClicked(step, event) {
    if (this.context.context.selectedStep) {
      this.context.context.selectedStep.tdNumber.removeAttribute("class");
      this.context.context.selectedStep.tdStep.removeAttribute("class");
      this.context.context.selectedStep.tdMachine.removeAttribute("class");
      this.context.context.selectedStep.tdArea.removeAttribute("class");
      this.context.context.selectedStep.tdDeadline.removeAttribute("class");
      if (this.context.context.selectedStep.tdButton)
        this.context.context.selectedStep.tdButton.removeAttribute("class");
    }

    var index = this.context.context.items.indexOf(this.context);
    if (this.context.context.items) {
      for (var stepItem of this.context.context.items) {
        stepItem.data.selectedIndex = index;
      }
    }

    this.tdNumber.setAttribute("class", "active");
    this.tdStep.setAttribute("class", "active");
    this.tdMachine.setAttribute("class", "active");
    this.tdArea.setAttribute("class", "active");
    this.tdDeadline.setAttribute("class", "active");
    if (this.tdButton)
      this.tdButton.setAttribute("class", "active");

    this.context.context.selectedStep = { data: step, index: index, tdNumber: this.tdNumber, tdStep: this.tdStep, tdButton: this.tdButton, tdMachine: this.tdMachine, tdArea: this.tdArea, tdDeadline: this.tdDeadline };
    this.query = { "steps.step.process": this.context.data.process ? this.context.data.process : "" };
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  get stepLoader() {
    return StepLoader;
  }

  get machineLoader() {
    return MachineLoader;
  }

  get stepIndicatorInfo() {
    var info = "";
    if (this.step.stepIndicators && this.step.stepIndicators.length > 0) {
      for (var stepIndicator of this.step.stepIndicators) {
        info += stepIndicator.name + "=" + (stepIndicator.value ? stepIndicator.value : "0") + ",";
      }
      info = info.substring(0, info.length - 1);
    }
    else {
      info = "no step indicators available"
    }

    return info;
  }

  get isStepSelected() {
    return this.context.context.selectedStep && this.context.context.selectedStep.data === this.step;
  }
}