var StepLoader = require('../../../../../loader/step-loader');

export class StepItem {
  activate(context) {
    console.log("step-Item")
    console.log(context.data);
    this.context = context;
    this.step = context.data;
    this.error = context.error;
    this.options = context.options;
  } 
  stepIndicatorColumns = [
    { header : "Name", value : "name"},
    { header : "Value", value : "value"},
  ];

  controlOptions = {
    control: {
      length: 12
    }
  };

  onStepChanged($event){
    console.log("changed");
  }
  onStepFocused($event){
    console.log("focused");
  }

  onItemClicked(step, event){
      if (this.context.context.selectedStep){
          this.context.context.selectedStep.tdStep.removeAttribute("class");
          this.context.context.selectedStep.tdButton.removeAttribute("class");
      }

      var index = this.context.context.items.indexOf(this.context);
      if (this.context.context.items){
        for (var stepItem of this.context.context.items){
          stepItem.data.selectedIndex = index;
        }
      }

      this.tdStep.setAttribute("class", "active");
      this.tdButton.setAttribute("class", "active");
      this.context.context.selectedStep = {data : step, index : index, tdStep : this.tdStep, tdButton : this.tdButton};
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