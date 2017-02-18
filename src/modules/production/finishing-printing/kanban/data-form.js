import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
  @bindable readOnly = false;
  @bindable data;
  @bindable error;

  @bindable title;

  @bindable cancel;
  @bindable delete;
  @bindable save;
  @bindable edit;
  steps = {
    columns: [
      { header: "Name", value: "name" },
    ],
    onAdd: function () {
      this.data.steps.push({stepIndicators: [
        { name : "indicator1", value : ""},
        { name : "indicator2", value : ""},
        { name : "indicator3", value : ""},
        { name : "indicator4", value : ""}]
      });
      console.log("add");
    }.bind(this), onRemove: function () {
      console.log("remove");
    }
  };

  stepColumns = [
    { header: "Name", value: "name" },
  ]

  bind() {
    this.data = this.data || {};
    this.data.steps = this.data.steps || [];
  }
  get addSteps() {
    return (event) => {
      this.data.machineEvents.push({stepIndicators: [
        { name : "indicator1", value : ""},
        { name : "indicator2", value : ""},
        { name : "indicator3", value : ""},
        { name : "indicator4", value : ""}]
      })
    };
  }

  unitSelected(e) {
    console.log('selected')
  }

  unitChanged(e) {
    console.log('unit changed')
  }

  stepChanged(e) {
    console.log('step changed')
  }

  machineTypeChanged(e) {
    console.log('machineType changed')
  }

  get unitLoader() {
    return UnitLoader;
  }
  get stepLoader() {
    return StepLoader;
  }
  get machineTypeLoader() {
    return MachineTypeLoader;
  }

} 
