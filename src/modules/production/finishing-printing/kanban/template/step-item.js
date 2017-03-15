import {bindable} from 'aurelia-framework'
var StepLoader = require('../../../../../loader/step-loader');

export class StepItem {

  @bindable temp;

  activate(context) {
    console.log("step-Item")
    this.context = context;
    this.step = context.data;
    this.error = context.error;
    this.options = context.options;
    this.temp = this.step;
  } 
  stepIndicatorColumns = [
    { header : "Indikator", value : "name"},
    { header : "Nilai", value : "value"},
    { header : "Satuan", value : "uom"},
  ];

  controlOptions = {
    control: {
      length: 12
    }
  };

  tempChanged(newValue, oldValue){
    console.log("temp : ");
    console.log(this.temp);
    console.log("newValue : ");
    console.log(newValue);
    Object.assign(this.context.data, newValue);
  }

  onItemClicked(step, event){
      if (this.context.context.selectedStep){
          this.context.context.selectedStep.tdStep.removeAttribute("class");
          if (this.context.context.selectedStep.tdButton)
            this.context.context.selectedStep.tdButton.removeAttribute("class");
      }

      var index = this.context.context.items.indexOf(this.context);
      if (this.context.context.items){
        for (var stepItem of this.context.context.items){
          stepItem.data.selectedIndex = index;
        }
      }

      this.tdStep.setAttribute("class", "active");
      if (this.tdButton) 
        this.tdButton.setAttribute("class", "active");

      this.context.context.selectedStep = {data : step, index : index, tdStep : this.tdStep, tdButton : this.tdButton};
      console.log("item clicked");
      console.log(this.context);
  }

  get stepLoader(){
    return StepLoader;
  }

  get stepIndicatorInfo(){
    var info = "";
    if (this.step.stepIndicators && this.step.stepIndicators.length > 0){
      for (var stepIndicator of this.step.stepIndicators){
        info += stepIndicator.name + "=" + stepIndicator.value + ",";
      }
      info = info.substring(0, info.length-1);
    }
    else{
      info = "no step indicators available"
    }

    return info;
  }

  get isStepSelected(){
    return this.context.context.selectedStep && this.context.context.selectedStep.data === this.step;
  }
}