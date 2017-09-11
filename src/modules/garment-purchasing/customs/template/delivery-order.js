import {bindable} from 'aurelia-framework'

export class DeliveryOrder {
  activate(context) {
    this.data = context.data;
    this.options = context.options; 
    this.context = context;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
  
  valueChange(dataDeliveryOrder){
      console.log(this.context);
      console.log(dataDeliveryOrder);
      var selectedData = dataDeliveryOrder.srcElement.checked || false;
      if(selectedData){
        this.context.context.options += this.data.price;
        console.log(this.context.context.options);
      }else{
        this.context.context.options -= this.data.price;
        console.log(this.context.context.options);
      }
  }
}